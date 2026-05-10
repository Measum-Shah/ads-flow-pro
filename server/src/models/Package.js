import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: true,
      unique: true
    },
    label: {
      type: String,
      required: true
    },
    durationDays: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      default: 1 // basic=1, standard=2, premium=3 — used in rankScore
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    homepageVisibility: {
      type: Boolean,
      default: false
    },
    autoRefreshDays: {
      type: Number,
      default: null // null = no auto-refresh
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;