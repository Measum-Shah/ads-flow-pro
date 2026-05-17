import Ad from "../models/Ad.js";
import AdMedia from "../models/AdMedia.js";
import AdStatusHistory from "../models/AdStatusHistory.js";
import adStatus from "../constants/adstatus.js";

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

// ─── Review Queue ─────────────────────────────────────────────────────────────

/**
 * GET /api/moderator/review-queue
 * Returns all ads with status = submitted, oldest first, along with dashboard summary counts
 */
export const getReviewQueue = async (req, res) => {
  try {
    // 1. Fetch all ads currently in the submission review queue
    const ads = await Ad.find({ status: adStatus.SUBMITTED })
      .populate("user", "fullName email")
      .populate("category", "name slug")
      .populate("city", "name slug")
      .sort({ createdAt: 1 }) // oldest first — review in order
      .lean();

    // 2. Aggregate metrics dynamically for the main dashboard statistics cards
    const approvedCount = await Ad.countDocuments({ status: adStatus.MODERATOR_APPROVED });
    const rejectedCount = await Ad.countDocuments({ status: adStatus.MODERATOR_REJECTED });

    // Attach media to each ad
    const adIds = ads.map((a) => a._id);
    const mediaList = await AdMedia.find({ ad: { $in: adIds } })
      .sort({ order: 1 })
      .lean();

    const mediaMap = {};
    mediaList.forEach((m) => {
      if (!mediaMap[m.ad.toString()]) mediaMap[m.ad.toString()] = [];
      mediaMap[m.ad.toString()].push(m);
    });

    const result = ads.map((ad) => ({
      ...ad,
      media: mediaMap[ad._id.toString()] || []
    }));

    // Send the structured array alongside live total metric snapshots
    res.json({
      success: true,
      total: result.length,
      approvedCount,
      rejectedCount,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Single Ad Detail ─────────────────────────────────────────────────────────

/**
 * GET /api/moderator/ads/:id
 * Full detail of a single submitted ad for review
 */
export const getAdForReview = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id)
      .populate("user", "fullName email createdAt")
      .populate("category", "name slug")
      .populate("city", "name slug")
      .lean();

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad.status !== adStatus.SUBMITTED) {
      return res.status(400).json({
        success: false,
        message: `Ad is not in review queue. Current status: ${ad.status}`
      });
    }

    const media = await AdMedia.find({ ad: ad._id }).sort({ order: 1 }).lean();
    const history = await AdStatusHistory.find({ ad: ad._id })
      .populate("changedBy", "fullName role")
      .sort({ createdAt: 1 })
      .lean();

    res.json({ success: true, data: { ...ad, media, history } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Review Action ────────────────────────────────────────────────────────────

/**
 * PATCH /api/moderator/ads/:id/review
 * Approve or reject a submitted ad
 *
 * Body:
 * { action: "approve", note?: string }
 * { action: "reject",  note: string  }  ← note required on reject
 *
 * approve → status: moderator_approved
 * reject  → status: moderator_rejected
 */
export const reviewAd = async (req, res) => {
  try {
    const { action, note } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'action must be either "approve" or "reject"'
      });
    }

    if (action === "reject" && !note) {
      return res.status(400).json({
        success: false,
        message: "A rejection reason is required"
      });
    }

    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad.status !== adStatus.SUBMITTED) {
      return res.status(400).json({
        success: false,
        message: `Only submitted ads can be reviewed. Current status: ${ad.status}`
      });
    }

    const prev = ad.status;
    const newStatus =
      action === "approve"
        ? adStatus.MODERATOR_APPROVED
        : adStatus.MODERATOR_REJECTED;

    ad.status = newStatus;
    ad.moderationNote = note || null;
    await ad.save();

    await logStatusChange(ad._id, prev, newStatus, req.user._id, note || null);

    const message =
      action === "approve"
        ? "Ad approved. Client can now select a package."
        : "Ad rejected. Client has been notified.";

    res.json({ success: true, message, data: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};