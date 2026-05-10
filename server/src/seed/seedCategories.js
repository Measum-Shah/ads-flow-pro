import mongoose from "mongoose";
import Category from "../models/Category.js";
import connectDB from "../config/db.js";

const categories = [
  { name: "Electronics",        slug: "electronics",        isActive: true },
  { name: "Vehicles",           slug: "vehicles",           isActive: true },
  { name: "Property",           slug: "property",           isActive: true },
  { name: "Furniture",          slug: "furniture",          isActive: true },
  { name: "Fashion & Clothing", slug: "fashion-clothing",   isActive: true },
  { name: "Mobile Phones",      slug: "mobile-phones",      isActive: true },
  { name: "Books & Education",  slug: "books-education",    isActive: true },
  { name: "Jobs",               slug: "jobs",               isActive: true },
  { name: "Services",           slug: "services",           isActive: true },
  { name: "Pets",               slug: "pets",               isActive: true }
];

const seedCategories = async () => {
  await connectDB();
  await Category.deleteMany({});
  const inserted = await Category.insertMany(categories);
  console.log(`✅ Seeded ${inserted.length} categories`);
  await mongoose.disconnect();
};

seedCategories().catch((err) => {
  console.error("❌ Category seed failed:", err.message);
  process.exit(1);
});