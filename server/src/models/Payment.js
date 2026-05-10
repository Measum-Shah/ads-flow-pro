import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
      unique: true // one payment record per ad
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    method: {
      type: String,
      enum: ["bank_transfer", "easypaisa", "jazzcash", "other"],
      required: true
    },
    transactionRef: {
      type: String,
      required: true,
      trim: true
    },
    senderName: {
      type: String,
      required: true
    },
    screenshotUrl: {
      type: String,
      default: null // optional external screenshot URL
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending"
    },
    adminNote: {
      type: String,
      default: null
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    verifiedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;