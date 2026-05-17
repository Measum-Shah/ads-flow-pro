import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "admin@adflow.com" });
  if (existing) {
    console.log("ℹ  Admin already exists");
    await mongoose.disconnect();
    return;
  }

  await User.create({
    fullName: "Test Admin",
    email: "admin@adflow.com",
    password: "password123",
    role: "admin"
  });

  console.log(" Admin created  →  admin@adflow.com / password123");
  await mongoose.disconnect();
};

seedAdmin().catch((err) => {
  console.error(" Failed:", err.message);
  process.exit(1);
})