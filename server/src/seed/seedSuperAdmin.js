import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
 
const seedSuperAdmin = async () => {
  await connectDB();
 
  const existing = await User.findOne({ email: "superadmin@adflow.com" });
  if (existing) {
    console.log("ℹ️  Super Admin already exists");
    await mongoose.disconnect();
    return;
  }
 
  await User.create({
    fullName: "Super Admin",
    email: "superadmin@adflow.com",
    password: "password123",
    role: "super_admin"
  });
 
  console.log("✅ Super Admin created  →  superadmin@adflow.com / password123");
  await mongoose.disconnect();
};
 
seedSuperAdmin().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
 