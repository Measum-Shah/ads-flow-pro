import mongoose from "mongoose";
import adStatus from "../constants/adstatus.js";

const adSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: null
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: null
    },
    contactPhone: {
      type: String
    },
    status: {
      type: String,
      enum: Object.values(adStatus),
      default: adStatus.DRAFT
    },
    moderationNote: {
      type: String,
      default: null
    },
    adminNote: {
      type: String,
      default: null
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    adminBoost: {
      type: Number,
      default: 0 // manual boost points added by admin
    },
    rankScore: {
      type: Number,
      default: 0
    },
    publishAt: {
      type: Date,
      default: null
    },
    expireAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Auto-generate slug from title + timestamp
adSchema.pre("save", async function () {
  if (this.isModified("title") || !this.slug) {
    this.slug =
      this.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") +
      "-" +
      Date.now();
  }
});

const Ad = mongoose.model("Ad", adSchema);
export default Ad;