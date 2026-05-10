import mongoose from "mongoose";

const adStatusHistorySchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true
    },
    previousStatus: {
      type: String,
      default: null
    },
    newStatus: {
      type: String,
      required: true
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    note: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

const AdStatusHistory = mongoose.model("AdStatusHistory", adStatusHistorySchema);
export default AdStatusHistory;