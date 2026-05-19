import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import roles from "../constants/roles.js";

dotenv.config();

const seedUsers = [
  {
    fullName: "Admin User",
    email: "admin@adsflow.com",
    password: "admin123",
    role: roles.ADMIN,
  },
  {
    fullName: "Moderator User",
    email: "moderator@adsflow.com",
    password: "moderator123",
    role: roles.MODERATOR,
  },
  {
    fullName: "Client User",
    email: "client@adsflow.com",
    password: "client123",
    role: roles.CLIENT,
  },
];

const seed = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/adflowpro");
    console.log("✅ Connected to MongoDB");

    await User.deleteMany({});
    console.log("🗑️  Deleted all users");

    // ✅ Save one by one so pre-save hook hashes each password
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`   - [${user.role}] ${user.email} / password: ${userData.password}`);
    }

    console.log("\n✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
};

seed();