import mongoose from "mongoose";

const adMediaSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true
    },
    sourceType: {
      type: String,
      enum: ["youtube", "image", "cloudinary", "unknown"],
      required: true
    },
    originalUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      default: null
    },
    validationStatus: {
      type: String,
      enum: ["pending", "valid", "invalid"],
      default: "pending"
    },
    order: {
      type: Number,
      default: 0 // display order
    }
  },
  { timestamps: true }
);

const AdMedia = mongoose.model("AdMedia", adMediaSchema);
export default AdMedia;