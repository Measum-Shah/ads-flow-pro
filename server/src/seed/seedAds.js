import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Ad from "../models/Ad.js";
import AdMedia from "../models/AdMedia.js";
import Package from "../models/Package.js";
import Category from "../models/Category.js";
import City from "../models/City.js";
import adStatus from "../constants/adstatus.js";

const seedAds = async () => {
  await connectDB();

  // ── Fetch seeded reference data ──────────────────────────────────────────
  const packages    = await Package.find({});
  const categories  = await Category.find({});
  const cities      = await City.find({});

  if (!packages.length || !categories.length || !cities.length) {
    console.error("❌ Run npm run seed first (packages, categories, cities missing)");
    process.exit(1);
  }

  const pkg = (name) => packages.find((p) => p.name === name);
  const cat = (slug) => categories.find((c) => c.slug === slug);
  const cty = (slug) => cities.find((c) => c.slug === slug);

  // ── Create a test client user if not exists ──────────────────────────────
  let client = await User.findOne({ email: "client@adflow.com" });
  if (!client) {
    client = await User.create({
      fullName: "Test Client",
      email: "client@adflow.com",
      password: "password123",
      role: "client"
    });
    console.log("✅ Test client user created  →  client@adflow.com / password123");
  }

  // ── Clear old ads + media ────────────────────────────────────────────────
  await Ad.deleteMany({});
  await AdMedia.deleteMany({});

  // ── Ad data ──────────────────────────────────────────────────────────────
  const now = new Date();
  const future = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  const past   = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const adsData = [
    {
      title: "iPhone 14 Pro Max 256GB Deep Purple",
      description: "Used for 6 months only. Excellent condition, no scratches. Comes with original box, charger, and two cases. Battery health 97%.",
      price: 280000,
      contactPhone: "03001234567",
      category: cat("mobile-phones"),
      city: cty("karachi"),
      package: pkg("premium"),
      isFeatured: true,
      adminBoost: 10,
      publishAt: past(1),
      expireAt: future(29),
      mediaUrls: [
        "https://raw.githubusercontent.com/github/explore/main/topics/iphone/iphone.png",
        "https://img.youtube.com/vi/ux6zXguiqxM/hqdefault.jpg"
      ]
    },
    {
      title: "Honda City 2020 Aspire Automatic",
      description: "First owner. Total genuine. 45,000 km driven. All documents clear. New tyres. AC chilled. Available for test drive in Lahore.",
      price: 3800000,
      contactPhone: "03211234567",
      category: cat("vehicles"),
      city: cty("lahore"),
      package: pkg("premium"),
      isFeatured: true,
      adminBoost: 5,
      publishAt: past(2),
      expireAt: future(28),
      mediaUrls: [
        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800"
      ]
    },
    {
      title: "2 Bedroom Flat for Rent in F-10 Islamabad",
      description: "Fully furnished 2-bed flat on 3rd floor. 24/7 electricity backup, parking available. Near Jinnah Super Market. Ideal for small families.",
      price: 55000,
      contactPhone: "03451234567",
      category: cat("property"),
      city: cty("islamabad"),
      package: pkg("standard"),
      isFeatured: false,
      adminBoost: 0,
      publishAt: past(3),
      expireAt: future(12),
      mediaUrls: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
      ]
    },
    {
      title: "Samsung 55 Inch 4K Smart TV",
      description: "Samsung Crystal UHD 4K TV. Only 3 months old. Remote and stand included. Reason for sale: upgrading to QLED. No delivery, self-pickup only.",
      price: 95000,
      contactPhone: "03111234567",
      category: cat("electronics"),
      city: cty("rawalpindi"),
      package: pkg("basic"),
      isFeatured: false,
      adminBoost: 0,
      publishAt: past(4),
      expireAt: future(3),
      mediaUrls: [
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800"
      ]
    },
    {
      title: "Wooden 6-Seater Dining Table Set",
      description: "Pure sheesham wood dining table with 6 cushioned chairs. Barely used. Minor surface scratches only. Available in Faisalabad, buyer arranges transport.",
      price: 45000,
      contactPhone: "03041234567",
      category: cat("furniture"),
      city: cty("faisalabad"),
      package: pkg("basic"),
      isFeatured: false,
      adminBoost: 0,
      publishAt: past(5),
      expireAt: future(2),
      mediaUrls: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
      ]
    },
    {
      title: "Full Stack Web Development Course — Live Classes",
      description: "Learn MERN Stack from scratch. 3 months course, 5 days a week. Includes projects, CV building, and job referrals. Both online and onsite batches.",
      price: 25000,
      contactPhone: "03331234567",
      category: cat("books-education"),
      city: cty("lahore"),
      package: pkg("standard"),
      isFeatured: false,
      adminBoost: 0,
      publishAt: past(1),
      expireAt: future(14),
      mediaUrls: [
        "https://www.youtube.com/watch?v=nu_pCVPKzTk"
      ]
    },
    {
      title: "German Shepherd Puppies for Sale",
      description: "Pure breed German Shepherd puppies. 45 days old. Vaccinated and dewormed. Both male and female available. Parents on site.",
      price: 20000,
      contactPhone: "03211234599",
      category: cat("pets"),
      city: cty("multan"),
      package: pkg("premium"),
      isFeatured: true,
      adminBoost: 0,
      publishAt: past(2),
      expireAt: future(28),
      mediaUrls: [
        "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800"
      ]
    },
    {
      title: "Graphic Designer Available for Freelance Work",
      description: "5 years experience in branding, logo design, social media posts, and UI mockups. Adobe Illustrator & Figma expert. Portfolio available on request.",
      price: null,
      contactPhone: "03051234567",
      category: cat("services"),
      city: cty("karachi"),
      package: pkg("standard"),
      isFeatured: false,
      adminBoost: 0,
      publishAt: past(3),
      expireAt: future(12),
      mediaUrls: []
    },
    {
      title: "Linen Co-ord Set — Women Small/Medium",
      description: "Brand new, never worn. Bought from Khaadi, price tag still on. Sage green colour. Small/medium size. Will not negotiate price.",
      price: 3500,
      contactPhone: "03161234567",
      category: cat("fashion-clothing"),
      city: cty("islamabad"),
      package: pkg("basic"),
      isFeatured: false,
      adminBoost: 0,
      publishAt: past(6),
      expireAt: future(1),
      mediaUrls: [
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800"
      ]
    },
    {
      title: "Senior React Developer — Remote Job Opening",
      description: "Hiring a senior React developer for a UK-based startup. 3+ years experience required. Must know TypeScript and REST APIs. Competitive salary in USD.",
      price: null,
      contactPhone: "03001234599",
      category: cat("jobs"),
      city: cty("lahore"),
      package: pkg("premium"),
      isFeatured: true,
      adminBoost: 15,
      publishAt: past(1),
      expireAt: future(29),
      mediaUrls: []
    }
  ];

  // ── Insert ads + media ───────────────────────────────────────────────────
  for (const data of adsData) {
    const { mediaUrls, ...adFields } = data;

    const ad = await Ad.create({
      ...adFields,
      user: client._id,
      status: adStatus.PUBLISHED,
      rankScore: 0 // will calculate below
    });

    // Calculate rankScore
    const packageWeight = adFields.package?.weight || 1;
    const featuredPts   = adFields.isFeatured ? 50 : 0;
    const packagePts    = packageWeight * 10;
    const hoursOld      = (now - adFields.publishAt) / (1000 * 60 * 60);
    const freshnessPts  = hoursOld <= 24 ? 20 : hoursOld <= 72 ? 10 : 5;
    ad.rankScore = featuredPts + packagePts + freshnessPts + (adFields.adminBoost || 0);
    await ad.save();

    // Insert media
    for (let i = 0; i < mediaUrls.length; i++) {
      const url = mediaUrls[i];
      let sourceType = "image";
      let thumbnailUrl = url;

      const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (ytMatch) {
        sourceType   = "youtube";
        thumbnailUrl = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
      }

      await AdMedia.create({
        ad: ad._id,
        sourceType,
        originalUrl: url,
        thumbnailUrl,
        validationStatus: "valid",
        order: i
      });
    }

    console.log(`✅ "${ad.title.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 ${adsData.length} ads seeded and published!`);
  await mongoose.disconnect();
};

seedAds().catch((err) => {
  console.error("❌ Ads seed failed:", err.message);
  process.exit(1);
});