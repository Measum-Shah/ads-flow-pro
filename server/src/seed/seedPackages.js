import mongoose from "mongoose";
import Package from "../models/Package.js";
import connectDB from "../config/db.js";

const packages = [
  {
    name: "basic",
    label: "Basic",
    durationDays: 7,
    weight: 1,
    isFeatured: false,
    homepageVisibility: false,
    autoRefreshDays: null,
    price: 500,
    description: "7-day listing. Best for quick sells.",
    isActive: true
  },
  {
    name: "standard",
    label: "Standard",
    durationDays: 15,
    weight: 2,
    isFeatured: false,
    homepageVisibility: true,
    autoRefreshDays: null,
    price: 1000,
    description: "15-day listing with category priority. Manual refresh available.",
    isActive: true
  },
  {
    name: "premium",
    label: "Premium",
    durationDays: 30,
    weight: 3,
    isFeatured: true,
    homepageVisibility: true,
    autoRefreshDays: 3,
    price: 2000,
    description: "30-day featured listing. Auto-refreshed every 3 days for maximum visibility.",
    isActive: true
  }
];

const seedPackages = async () => {
  await connectDB();
  await Package.deleteMany({});
  const inserted = await Package.insertMany(packages);
  console.log(`✅ Seeded ${inserted.length} packages`);
  await mongoose.disconnect();
};

seedPackages().catch((err) => {
  console.error("❌ Package seed failed:", err.message);
  process.exit(1);
});