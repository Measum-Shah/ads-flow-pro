import Ad from "../models/Ad.js";
import AdMedia from "../models/AdMedia.js";
import AdStatusHistory from "../models/AdStatusHistory.js";
import Payment from "../models/Payment.js";
import Package from "../models/Package.js";
import adStatus from "../constants/adstatus.js";
import { normalizeMediaUrls } from "../services/media.service.js";

// ─── Helper — log every status change ────────────────────────────────────────
const logStatusChange = async (adId, previousStatus, newStatus, userId, note = null) => {
  await AdStatusHistory.create({
    ad: adId,
    previousStatus,
    newStatus,
    changedBy: userId,
    note
  });
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

/**
 * GET /api/client/dashboard
 * Returns all of the logged-in client's ads with status + media
 */
export const getDashboard = async (req, res) => {
  try {
    const ads = await Ad.find({ user: req.user._id })
      .populate("category", "name slug")
      .populate("city", "name slug")
      .populate("package", "name label price durationDays")
      .sort({ createdAt: -1 })
      .lean();

    // Attach first thumbnail to each ad
    const adIds = ads.map((a) => a._id);
    const mediaList = await AdMedia.find({ ad: { $in: adIds }, order: 0 }).lean();
    const mediaMap = {};
    mediaList.forEach((m) => { mediaMap[m.ad.toString()] = m.thumbnailUrl; });

    const result = ads.map((ad) => ({
      ...ad,
      thumbnail: mediaMap[ad._id.toString()] || null
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Single Ad Details (NEWLY ADDED) ──────────────────────────────────────

/**
 * GET /api/client/ads/:id
 * Fetches data for a single client-owned ad along with its media records
 */
export const getAdDetails = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id, user: req.user._id })
      .populate("category", "name slug")
      .populate("city", "name slug")
      .populate("package", "name label price durationDays")
      .lean();

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    // Fetch all media items associated with this ad
    const media = await AdMedia.find({ ad: ad._id }).sort({ order: 1 }).lean();

    // Combine them to construct the exact data payload expected by the frontend
    const result = {
      ...ad,
      media: media // This gives frontend access to adData.media[0].originalUrl
    };

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Create Ad Draft ──────────────────────────────────────────────────────────

/**
 * POST /api/client/ads
 * Creates a new ad in DRAFT status
 * Body: { title, description, category, city, price?, contactPhone?, mediaUrls? }
 */
export const createAd = async (req, res) => {
  try {
    const { title, description, category, city, price, contactPhone, mediaUrls = [] } = req.body;

    const ad = await Ad.create({
      user: req.user._id,
      title,
      description,
      category,
      city,
      price: price || null,
      contactPhone: contactPhone || null,
      status: adStatus.DRAFT
    });

    // Normalize and save media URLs
    if (mediaUrls.length > 0) {
      const normalizedMedia = normalizeMediaUrls(mediaUrls);
      const mediaDocs = normalizedMedia.map((m) => ({ ...m, ad: ad._id }));
      await AdMedia.insertMany(mediaDocs);
    }

    await logStatusChange(ad._id, null, adStatus.DRAFT, req.user._id, "Ad draft created");

    res.status(201).json({ success: true, message: "Ad draft created", data: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Edit Draft ───────────────────────────────────────────────────────────────

/**
 * PATCH /api/client/ads/:id
 * Edit an ad — only allowed when status is DRAFT
 * Body: any of { title, description, category, city, price, contactPhone, mediaUrls }
 */
export const editAd = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id, user: req.user._id });

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad.status !== adStatus.DRAFT) {
      return res.status(400).json({
        success: false,
        message: `Only draft ads can be edited. Current status: ${ad.status}`
      });
    }

    const { title, description, category, city, price, contactPhone, mediaUrls } = req.body;

    if (title)        ad.title = title;
    if (description)  ad.description = description;
    if (category)     ad.category = category;
    if (city)         ad.city = city;
    if (price !== undefined)        ad.price = price;
    if (contactPhone !== undefined) ad.contactPhone = contactPhone;

    await ad.save();

    // Replace media if new URLs provided
    if (mediaUrls && mediaUrls.length > 0) {
      await AdMedia.deleteMany({ ad: ad._id });
      const normalizedMedia = normalizeMediaUrls(mediaUrls);
      const mediaDocs = normalizedMedia.map((m) => ({ ...m, ad: ad._id }));
      await AdMedia.insertMany(mediaDocs);
    }

    res.json({ success: true, message: "Ad updated", data: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Submit for Review ────────────────────────────────────────────────────────

/**
 * PATCH /api/client/ads/:id/submit
 * Moves ad from DRAFT → SUBMITTED for moderator review
 */
export const submitAd = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id, user: req.user._id });

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad.status !== adStatus.DRAFT) {
      return res.status(400).json({
        success: false,
        message: `Only draft ads can be submitted. Current status: ${ad.status}`
      });
    }

    const prev = ad.status;
    ad.status = adStatus.SUBMITTED;
    await ad.save();

    await logStatusChange(ad._id, prev, adStatus.SUBMITTED, req.user._id, "Submitted for moderation");

    res.json({ success: true, message: "Ad submitted for review", data: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Select Package ───────────────────────────────────────────────────────────

/**
 * PATCH /api/client/ads/:id/package
 * Client selects a package after moderator approval
 * Body: { packageId }
 */
export const selectPackage = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id, user: req.user._id });

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad.status !== adStatus.MODERATOR_APPROVED) {
      return res.status(400).json({
        success: false,
        message: "Package can only be selected after moderator approval"
      });
    }

    const pkg = await Package.findById(req.body.packageId);
    if (!pkg || !pkg.isActive) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    const prev = ad.status;
    ad.package = pkg._id;
    ad.status = adStatus.PAYMENT_PENDING;
    await ad.save();

    await logStatusChange(ad._id, prev, adStatus.PAYMENT_PENDING, req.user._id, `Package selected: ${pkg.name}`);

    res.json({ success: true, message: "Package selected. Please submit payment.", data: ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Submit Payment ───────────────────────────────────────────────────────────

/**
 * POST /api/client/payments
 * Client submits payment proof after selecting a package
 * Body: { adId, amount, method, transactionRef, senderName, screenshotUrl? }
 */
export const submitPayment = async (req, res) => {
  try {
    const { adId, amount, method, transactionRef, senderName, screenshotUrl } = req.body;

    const ad = await Ad.findOne({ _id: adId, user: req.user._id });

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (ad.status !== adStatus.PAYMENT_PENDING) {
      return res.status(400).json({
        success: false,
        message: "Payment can only be submitted when ad is in payment_pending status"
      });
    }

    // Block duplicate transaction references
    const duplicate = await Payment.findOne({ transactionRef });
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Duplicate transaction reference. This payment has already been submitted."
      });
    }

    const payment = await Payment.create({
      ad: adId,
      user: req.user._id,
      amount,
      method,
      transactionRef,
      senderName,
      screenshotUrl: screenshotUrl || null
    });

    const prev = ad.status;
    ad.status = adStatus.PAYMENT_SUBMITTED;
    await ad.save();

    await logStatusChange(ad._id, prev, adStatus.PAYMENT_SUBMITTED, req.user._id, `Payment submitted. Ref: ${transactionRef}`);

    res.status(201).json({ success: true, message: "Payment submitted. Awaiting admin verification.", data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Status History ───────────────────────────────────────────────────────────

/**
 * GET /api/client/ads/:id/history
 * Returns full status history for one of the client's ads
 */
export const getAdHistory = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id, user: req.user._id });

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    const history = await AdStatusHistory.find({ ad: ad._id })
      .populate("changedBy", "fullName role")
      .sort({ createdAt: 1 });

    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};