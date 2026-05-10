import Ad from "../models/Ad.js";
import AdMedia from "../models/AdMedia.js";
import Package from "../models/Package.js";
import Category from "../models/Category.js";
import City from "../models/City.js";
import LearningQuestion from "../models/LearningQuestion.js";
import adStatus from "../constants/adstatus.js";

// ─── Packages ────────────────────────────────────────────────────────────────

/**
 * GET /api/packages
 * Returns all active packages
 */
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ price: 1 });

    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Ads ─────────────────────────────────────────────────────────────────────

/**
 * GET /api/ads
 * Browse active ads with search, category, city filters, sorting, and pagination.
 * Only PUBLISHED and non-expired ads are returned.
 */
export const getAds = async (req, res) => {
  try {
    const {
      search,
      category,
      city,
      sort = "rank",  // rank | newest | price_asc | price_desc
      page = 1,
      limit = 12
    } = req.query;

    // Base filter — only live ads
    const filter = {
      status: adStatus.PUBLISHED,
      expireAt: { $gt: new Date() }
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (category) filter.category = category;
    if (city) filter.city = city;

    // Sort strategy
    const sortMap = {
      rank: { rankScore: -1, createdAt: -1 },
      newest: { publishAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 }
    };
    const sortOption = sortMap[sort] || sortMap.rank;

    const skip = (Number(page) - 1) * Number(limit);

    const [ads, total] = await Promise.all([
      Ad.find(filter)
        .populate("category", "name slug")
        .populate("city", "name slug")
        .populate("package", "name label weight isFeatured")
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Ad.countDocuments(filter)
    ]);

    // Attach first media thumbnail to each ad
    const adIds = ads.map((a) => a._id);
    const mediaList = await AdMedia.find({
      ad: { $in: adIds },
      order: 0,
      validationStatus: "valid"
    }).lean();

    const mediaMap = {};
    mediaList.forEach((m) => {
      mediaMap[m.ad.toString()] = m.thumbnailUrl;
    });

    const result = ads.map((ad) => ({
      ...ad,
      thumbnail: mediaMap[ad._id.toString()] || null
    }));

    res.json({
      success: true,
      data: result,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/ads/:slug
 * Full ad detail — published only
 */
export const getAdBySlug = async (req, res) => {
  try {
    const ad = await Ad.findOne({
      slug: req.params.slug,
      status: adStatus.PUBLISHED,
      expireAt: { $gt: new Date() }
    })
      .populate("category", "name slug")
      .populate("city", "name slug")
      .populate("package", "name label isFeatured durationDays")
      .populate("user", "fullName createdAt")
      .lean();

    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    // Attach all media for this ad
    const media = await AdMedia.find({ ad: ad._id, validationStatus: "valid" })
      .sort({ order: 1 })
      .lean();

    res.json({ success: true, data: { ...ad, media } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Taxonomy ─────────────────────────────────────────────────────────────────

/**
 * GET /api/categories
 * All active categories
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/cities
 * All active cities
 */
export const getCities = async (req, res) => {
  try {
    const cities = await City.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Learning Question Widget ─────────────────────────────────────────────────

/**
 * GET /api/questions/random
 * Returns one random active learning question
 */
export const getRandomQuestion = async (req, res) => {
  try {
    const count = await LearningQuestion.countDocuments({ isActive: true });

    if (count === 0) {
      return res.status(404).json({ success: false, message: "No questions available" });
    }

    const random = Math.floor(Math.random() * count);
    const question = await LearningQuestion.findOne({ isActive: true }).skip(random);

    res.json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};