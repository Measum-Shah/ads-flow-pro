import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const seedModerator = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "moderator@adflow.com" });
  if (existing) {
    console.log("ℹ️  Moderator already exists");
    await mongoose.disconnect();
    return;
  }

  await User.create({
    fullName: "Test Moderator",
    email: "moderator@adflow.com",
    password: "password123",
    role: "moderator"
  });

  console.log("✅ Moderator created  →  moderator@adflow.com / password123");
  await mongoose.disconnect();
};

seedModerator().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});