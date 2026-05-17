import Ad from "../models/Ad.js";
import Payment from "../models/Payment.js";
import AdStatusHistory from "../models/AdStatusHistory.js";
import User from "../models/User.js";
import Package from "../models/Package.js";
import Category from "../models/Category.js";
import City from "../models/City.js";
import adStatus from "../constants/adstatus.js";
import { updateAdRankScore } from "../services/ranking.service.js";

// ─── Helper ───────────────────────────────────────────────────────────────────
const logStatusChange = async (adId, previousStatus, newStatus, userId, note = null) => {
  await AdStatusHistory.create({
    ad: adId,
    previousStatus,
    newStatus,
    changedBy: userId,
    note
  });
};

// ─── Payment Queue ────────────────────────────────────────────────────────────

/**
 * GET /api/admin/payment-queue
 * Returns all payments with status = pending, oldest first
 */
export const getPaymentQueue = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "pending" })
      .populate("user", "fullName email")
      .populate({
        path: "ad",
        populate: [
          { path: "category", select: "name" },
          { path: "city", select: "name" },
          { path: "package", select: "name label price" }
        ]
      })
      .sort({ createdAt: 1 })
      .lean();

    res.json({ success: true, total: payments.length, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Verify / Reject Payment ──────────────────────────────────────────────────

/**
 * PATCH /api/admin/payments/:id/verify
 * Verify or reject a payment proof
 *
 * Body:
 *   { action: "verify", note?: string }
 *   { action: "reject", note: string  }  ← note required on reject
 *
 * verify → payment.status: verified  | ad.status: payment_verified
 * reject → payment.status: rejected  | ad.status: payment_rejected
 */
export const verifyPayment = async (req, res) => {
  try {
    const { action, note } = req.body;

    if (!["verify", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'action must be "verify" or "reject"'
      });
    }

    if (action === "reject" && !note) {
      return res.status(400).json({
        success: false,
        message: "A rejection reason is required"
      });
    }

    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    if (payment.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Payment already ${payment.status}`
      });
    }

    const ad = await Ad.findById(payment.ad);
    if (!ad) {
      return res.status(404).json({ success: false, message: "Associated ad not found" });
    }

    const prevAdStatus = ad.status;

    if (action === "verify") {
      payment.status    = "verified";
      payment.verifiedBy  = req.user._id;
      payment.verifiedAt  = new Date();
      payment.adminNote   = note || null;
      await payment.save();

      ad.status = adStatus.PAYMENT_VERIFIED;
      await ad.save();

      await logStatusChange(ad._id, prevAdStatus, adStatus.PAYMENT_VERIFIED, req.user._id, note || "Payment verified");

      return res.json({
        success: true,
        message: "Payment verified. Ad is ready to be published.",
        data: payment
      });
    }

    // reject
    payment.status    = "rejected";
    payment.adminNote = note;
    await payment.save();

    ad.status    = adStatus.PAYMENT_REJECTED;
    ad.adminNote = note;
    await ad.save();

    await logStatusChange(ad._id, prevAdStatus, adStatus.PAYMENT_REJECTED, req.user._id, note);

    res.json({
      success: true,
      message: "Payment rejected. Client has been notified.",
      data: payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Publish / Schedule Ad ────────────────────────────────────────────────────

/**
 * PATCH /api/admin/ads/:id/publish
 * Publish immediately or schedule for a future date
 * Ad must be in payment_verified status
 *
 * Body:
 *   { publishNow: true }                        ← publish immediately
 *   { publishNow: false, publishAt: "ISO date" } ← schedule
 */
export const publishAd = async (req, res) => {
  try {
    const { publishNow, publishAt: publishAtInput, isFeatured, adminBoost } = req.body;

    const ad = await Ad.findById(req.params.id).populate("package");
    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad.status !== adStatus.PAYMENT_VERIFIED) {
      return res.status(400).json({
        success: false,
        message: `Ad must be payment_verified to publish. Current status: ${ad.status}`
      });
    }

    const pkg = ad.package;
    if (!pkg) {
      return res.status(400).json({ success: false, message: "Ad has no package selected" });
    }

    const prevStatus = ad.status;

    // Optional admin controls
    if (isFeatured !== undefined) ad.isFeatured = isFeatured;
    if (adminBoost !== undefined) ad.adminBoost = adminBoost;

    if (publishNow) {
      const now = new Date();
      ad.publishAt = now;
      ad.expireAt  = new Date(now.getTime() + pkg.durationDays * 24 * 60 * 60 * 1000);
      ad.status    = adStatus.PUBLISHED;

      await ad.save();
      await updateAdRankScore(ad);
      await logStatusChange(ad._id, prevStatus, adStatus.PUBLISHED, req.user._id, "Published immediately by admin");

      return res.json({ success: true, message: "Ad is now live!", data: ad });
    }

    // Schedule for future
    if (!publishAtInput) {
      return res.status(400).json({
        success: false,
        message: "publishAt date is required when publishNow is false"
      });
    }

    const scheduledDate = new Date(publishAtInput);
    if (isNaN(scheduledDate) || scheduledDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "publishAt must be a valid future date"
      });
    }

    ad.publishAt = scheduledDate;
    ad.expireAt  = new Date(scheduledDate.getTime() + pkg.durationDays * 24 * 60 * 60 * 1000);
    ad.status    = adStatus.SCHEDULED;

    await ad.save();
    await logStatusChange(ad._id, prevStatus, adStatus.SCHEDULED, req.user._id, `Scheduled for ${scheduledDate.toISOString()}`);

    res.json({ success: true, message: "Ad scheduled successfully", data: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Analytics Summary ────────────────────────────────────────────────────────

/**
 * GET /api/admin/analytics/summary
 * Dashboard KPIs — listings, revenue, moderation, taxonomy
 */
export const getAnalyticsSummary = async (req, res) => {
  try {
    // ── Listings ──────────────────────────────────────────────────────────
    const [
      totalAds,
      activeAds,
      pendingReview,
      expiredAds,
      scheduledAds,
      draftAds
    ] = await Promise.all([
      Ad.countDocuments(),
      Ad.countDocuments({ status: adStatus.PUBLISHED, expireAt: { $gt: new Date() } }),
      Ad.countDocuments({ status: adStatus.SUBMITTED }),
      Ad.countDocuments({ status: adStatus.EXPIRED }),
      Ad.countDocuments({ status: adStatus.SCHEDULED }),
      Ad.countDocuments({ status: adStatus.DRAFT })
    ]);

    // ── Revenue ───────────────────────────────────────────────────────────
    const verifiedPayments = await Payment.find({ status: "verified" })
      .populate("ad", "package")
      .lean();

    const totalRevenue = verifiedPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

    // Revenue by package
    const packageRevenue = {};
    for (const p of verifiedPayments) {
      const pkgId = p.ad?.package?.toString();
      if (!pkgId) continue;
      packageRevenue[pkgId] = (packageRevenue[pkgId] || 0) + p.amount;
    }

    // ── Moderation ────────────────────────────────────────────────────────
    const [totalReviewed, totalRejected] = await Promise.all([
      Ad.countDocuments({ status: { $in: [adStatus.MODERATOR_APPROVED, adStatus.MODERATOR_REJECTED, adStatus.PAYMENT_PENDING, adStatus.PAYMENT_SUBMITTED, adStatus.PAYMENT_VERIFIED, adStatus.SCHEDULED, adStatus.PUBLISHED, adStatus.EXPIRED] } }),
      Ad.countDocuments({ status: adStatus.MODERATOR_REJECTED })
    ]);

    const approvalRate = totalReviewed > 0
      ? (((totalReviewed - totalRejected) / totalReviewed) * 100).toFixed(1)
      : 0;

    // ── Taxonomy ──────────────────────────────────────────────────────────
    const adsByCategory = await Ad.aggregate([
      { $match: { status: adStatus.PUBLISHED } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
      { $unwind: "$category" },
      { $project: { name: "$category.name", count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    const adsByCity = await Ad.aggregate([
      { $match: { status: adStatus.PUBLISHED } },
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $lookup: { from: "cities", localField: "_id", foreignField: "_id", as: "city" } },
      { $unwind: "$city" },
      { $project: { name: "$city.name", count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    // ── Users ─────────────────────────────────────────────────────────────
    const totalUsers = await User.countDocuments({ role: "client" });

    res.json({
      success: true,
      data: {
        listings: {
          total: totalAds,
          active: activeAds,
          draft: draftAds,
          pendingReview,
          scheduled: scheduledAds,
          expired: expiredAds
        },
        revenue: {
          total: totalRevenue,
          verifiedPaymentsCount: verifiedPayments.length
        },
        moderation: {
          totalReviewed,
          totalRejected,
          approvalRate: `${approvalRate}%`
        },
        taxonomy: {
          adsByCategory,
          adsByCity
        },
        users: {
          totalClients: totalUsers
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublishAds = async (req, res) => {
  try {
    const ads = await Ad.find({
      status: adStatus.PAYMENT_VERIFIED,
    })
      .populate("category", "name")
      .populate("city", "name")
      .populate("package", "name label price")
      .populate("user", "fullName email")
      .sort({ updatedAt: 1 });

    res.json({
      success: true,
      data: ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};