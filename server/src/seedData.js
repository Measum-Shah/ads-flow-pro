


import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "./models/User.js";
import Category from "./models/Category.js";
import City from "./models/City.js";
import Package from "./models/Package.js";
import Ad from "./models/Ad.js";
import AdMedia from "./models/AdMedia.js";
import Payment from "./models/Payment.js";
import AdStatusHistory from "./models/AdStatusHistory.js";
import LearningQuestion from "./models/LearningQuestion.js";

import roles from "./constants/roles.js";
import adStatus from "./constants/adstatus.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://shahmeasum007:measumshah123@cluster0.b4cqt.mongodb.net/adflow?retryWrites=true&w=majority&appName=Cluster0`);

  console.log("MongoDB connected");
};

const seedData = async () => {
  try {
    await connectDB();

    await AdStatusHistory.deleteMany();
    await Payment.deleteMany();
    await AdMedia.deleteMany();
    await Ad.deleteMany();
    await LearningQuestion.deleteMany();
    await Package.deleteMany();
    await City.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    const admin = await User.create({
      fullName: "Admin User",
      email: "admin@adflow.com",
      password: "123456",
      role: roles.ADMIN || "admin",
    });

    const moderator = await User.create({
      fullName: "Moderator User",
      email: "moderator@adflow.com",
      password: "123456",
      role: roles.MODERATOR || "moderator",
    });

    const client = await User.create({
      fullName: "Ali Raza",
      email: "ali@example.com",
      password: "123456",
      role: roles.CLIENT || "client",
    });

    const categories = await Category.insertMany([
      {
        name: "Real Estate",
        slug: "real-estate",
        description: "Plots houses shops and property ads",
      },
      {
        name: "Vehicles",
        slug: "vehicles",
        description: "Cars bikes and vehicle related ads",
      },
      {
        name: "Electronics",
        slug: "electronics",
        description: "Mobiles laptops computers and gadgets",
      },
      {
        name: "Jobs",
        slug: "jobs",
        description: "Job posts and hiring ads",
      },
    ]);

    const cities = await City.insertMany([
      {
        name: "Vehari",
        slug: "vehari",
      },
      {
        name: "Burewala",
        slug: "burewala",
      },
      {
        name: "Multan",
        slug: "multan",
      },
      {
        name: "Lahore",
        slug: "lahore",
      },
    ]);

    const packages = await Package.insertMany([
      {
        name: "basic",
        label: "Basic Ad",
        durationDays: 7,
        weight: 1,
        price: 500,
        description: "Normal listing for 7 days",
      },
      {
        name: "standard",
        label: "Standard Ad",
        durationDays: 15,
        weight: 2,
        isFeatured: true,
        price: 1500,
        description: "Featured listing for 15 days",
      },
      {
        name: "premium",
        label: "Premium Ad",
        durationDays: 30,
        weight: 3,
        isFeatured: true,
        homepageVisibility: true,
        autoRefreshDays: 3,
        price: 3000,
        description: "Homepage featured listing for 30 days",
      },
    ]);

    const ads = await Ad.create([
      {
        user: client._id,
        package: packages[2]._id,
        category: categories[2]._id,
        city: cities[0]._id,
        title: "Gaming Laptop Core i7 For Sale",
        description:
          "Core i7 gaming laptop with 16GB RAM 512GB SSD and RTX graphics card",
        price: 145000,
        contactPhone: "03001234567",
        status: adStatus.PUBLISHED,
        isFeatured: true,
        rankScore: 90,
        publishAt: new Date(),
        expireAt: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
      },

      {
        user: client._id,
        package: packages[1]._id,
        category: categories[1]._id,
        city: cities[2]._id,
        title: "Honda Civic 2018 Model",
        description:
          "Clean condition Honda Civic 2018 token paid family used car",
        price: 5200000,
        contactPhone: "03011234567",
        status: adStatus.PUBLISHED,
        isFeatured: true,
        rankScore: 70,
        publishAt: new Date(),
        expireAt: new Date(
          Date.now() + 15 * 24 * 60 * 60 * 1000
        ),
      },

      {
        user: client._id,
        package: packages[0]._id,
        category: categories[0]._id,
        city: cities[3]._id,
        title: "5 Marla Plot For Sale",
        description:
          "Ideal location 5 marla residential plot available in Lahore",
        price: 3500000,
        contactPhone: "03021234567",
        status: adStatus.SUBMITTED,
        rankScore: 30,
      },

      {
        user: client._id,
        package: packages[0]._id,
        category: categories[3]._id,
        city: cities[2]._id,
        title: "Frontend Developer Internship",
        description:
          "Software house looking for React frontend developer intern in Multan",
        price: null,
        contactPhone: "03031234567",
        status: adStatus.PUBLISHED,
        rankScore: 45,
        publishAt: new Date(),
        expireAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    ]);

    await AdMedia.insertMany([
      {
        ad: ads[0]._id,
        sourceType: "image",
        originalUrl:
          "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
        validationStatus: "valid",
        order: 1,
      },

      {
        ad: ads[0]._id,
        sourceType: "image",
        originalUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        validationStatus: "valid",
        order: 2,
      },

      {
        ad: ads[1]._id,
        sourceType: "image",
        originalUrl:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
        validationStatus: "valid",
        order: 1,
      },

      {
        ad: ads[2]._id,
        sourceType: "image",
        originalUrl:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
        validationStatus: "valid",
        order: 1,
      },

      {
        ad: ads[3]._id,
        sourceType: "image",
        originalUrl:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
        validationStatus: "valid",
        order: 1,
      },
    ]);

    await Payment.insertMany([
      {
        ad: ads[0]._id,
        user: client._id,
        amount: 3000,
        method: "easypaisa",
        transactionRef: "EP-ADF-1001",
        senderName: "Ali Raza",
        screenshotUrl:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
        status: "verified",
        verifiedBy: admin._id,
        verifiedAt: new Date(),
      },

      {
        ad: ads[1]._id,
        user: client._id,
        amount: 1500,
        method: "jazzcash",
        transactionRef: "JC-ADF-1002",
        senderName: "Ali Raza",
        screenshotUrl:
          "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200",
        status: "pending",
      },
    ]);

    await AdStatusHistory.insertMany([
      {
        ad: ads[0]._id,
        previousStatus: adStatus.SUBMITTED,
        newStatus: adStatus.PUBLISHED,
        changedBy: moderator._id,
        note: "Ad published successfully",
      },

      {
        ad: ads[1]._id,
        previousStatus: adStatus.SUBMITTED,
        newStatus: adStatus.PUBLISHED,
        changedBy: moderator._id,
        note: "Vehicle ad approved and published",
      },

      {
        ad: ads[2]._id,
        previousStatus: adStatus.DRAFT,
        newStatus: adStatus.SUBMITTED,
        changedBy: client._id,
        note: "Ad submitted for review",
      },

      {
        ad: ads[3]._id,
        previousStatus: adStatus.SUBMITTED,
        newStatus: adStatus.PUBLISHED,
        changedBy: moderator._id,
        note: "Job ad approved and published",
      },
    ]);

    await LearningQuestion.insertMany([
      {
        question: "How can I create a good ad title?",
        answer:
          "Use clear words mention the main product model location or key feature",
        topic: "ad-writing",
        difficulty: "easy",
      },

      {
        question: "Why should I use images in my ad?",
        answer:
          "Images increase trust and help users understand the product faster",
        topic: "media",
        difficulty: "easy",
      },

      {
        question: "What makes a premium ad better?",
        answer:
          "Premium ads usually get more visibility better ranking and homepage placement",
        topic: "premium-ads",
        difficulty: "medium",
      },
    ]);

    console.log("Seed data inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    process.exit(1);
  }
};

seedData();