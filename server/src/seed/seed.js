import mongoose from "mongoose";
import connectDB from "../config/db.js";

import Package from "../models/Package.js";
import Category from "../models/Category.js";
import City from "../models/City.js";
import LearningQuestion from "../models/LearningQuestion.js";

// ── Data ──────────────────────────────────────────────────────────────────────

const packages = [
  { name: "basic",    label: "Basic",    durationDays: 7,  weight: 1, isFeatured: false, homepageVisibility: false, autoRefreshDays: null, price: 500,  description: "7-day listing. Best for quick sells.", isActive: true },
  { name: "standard", label: "Standard", durationDays: 15, weight: 2, isFeatured: false, homepageVisibility: true,  autoRefreshDays: null, price: 1000, description: "15-day listing with category priority.", isActive: true },
  { name: "premium",  label: "Premium",  durationDays: 30, weight: 3, isFeatured: true,  homepageVisibility: true,  autoRefreshDays: 3,   price: 2000, description: "30-day featured listing. Auto-refreshed every 3 days.", isActive: true }
];

const categories = [
  { name: "Electronics",        slug: "electronics"      },
  { name: "Vehicles",           slug: "vehicles"         },
  { name: "Property",           slug: "property"         },
  { name: "Furniture",          slug: "furniture"        },
  { name: "Fashion & Clothing", slug: "fashion-clothing" },
  { name: "Mobile Phones",      slug: "mobile-phones"    },
  { name: "Books & Education",  slug: "books-education"  },
  { name: "Jobs",               slug: "jobs"             },
  { name: "Services",           slug: "services"         },
  { name: "Pets",               slug: "pets"             }
];

const cities = [
  { name: "Karachi",    slug: "karachi"    },
  { name: "Lahore",     slug: "lahore"     },
  { name: "Islamabad",  slug: "islamabad"  },
  { name: "Rawalpindi", slug: "rawalpindi" },
  { name: "Faisalabad", slug: "faisalabad" },
  { name: "Multan",     slug: "multan"     },
  { name: "Peshawar",   slug: "peshawar"   },
  { name: "Quetta",     slug: "quetta"     },
  { name: "Sialkot",    slug: "sialkot"    },
  { name: "Hyderabad",  slug: "hyderabad"  }
];

const questions = [
  { question: "What does JWT stand for?",                             answer: "JSON Web Token — a compact token for securely transmitting information.",          topic: "Authentication",  difficulty: "easy",   isActive: true },
  { question: "What is RBAC?",                                        answer: "Role-Based Access Control — restricts access based on user roles.",                topic: "Security",        difficulty: "easy",   isActive: true },
  { question: "Difference between authentication and authorization?", answer: "Authentication verifies identity. Authorization determines access rights.",        topic: "Security",        difficulty: "easy",   isActive: true },
  { question: "What is a Mongoose pre() hook?",                       answer: "A middleware that runs before a Mongoose operation like save or find.",             topic: "MongoDB",         difficulty: "medium", isActive: true },
  { question: "What is a slug in a URL?",                             answer: "A human-readable, URL-friendly identifier for a resource.",                        topic: "Web Development", difficulty: "easy",   isActive: true },
  { question: "What is a cron job?",                                  answer: "A scheduled task that runs automatically at defined time intervals.",               topic: "Backend",         difficulty: "easy",   isActive: true },
  { question: "What does HTTP 403 mean?",                             answer: "Forbidden — server understood the request but refuses to authorize it.",            topic: "HTTP",            difficulty: "easy",   isActive: true },
  { question: "What is pagination in APIs?",                          answer: "Breaking large datasets into smaller pages using page and limit parameters.",       topic: "API Design",      difficulty: "easy",   isActive: true },
  { question: "What is bcrypt used for?",                             answer: "Hashing passwords securely with salt and multiple rounds of hashing.",             topic: "Security",        difficulty: "medium", isActive: true },
  { question: "Difference between PUT and PATCH?",                    answer: "PUT replaces the full resource. PATCH updates only the provided fields.",          topic: "HTTP",            difficulty: "medium", isActive: true }
];

// ── Runner ────────────────────────────────────────────────────────────────────

const runAllSeeds = async () => {
  await connectDB();
  console.log("🌱 Starting seed...\n");

  await Package.deleteMany({});
  const pkgs = await Package.insertMany(packages);
  console.log(`✅ Packages:  ${pkgs.length} inserted`);

  await Category.deleteMany({});
  const cats = await Category.insertMany(categories);
  console.log(`✅ Categories: ${cats.length} inserted`);

  await City.deleteMany({});
  const cts = await City.insertMany(cities);
  console.log(`✅ Cities:     ${cts.length} inserted`);

  await LearningQuestion.deleteMany({});
  const qs = await LearningQuestion.insertMany(questions);
  console.log(`✅ Questions:  ${qs.length} inserted`);

  console.log("\n🎉 All seeds complete!");
  await mongoose.disconnect();
};

runAllSeeds().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});