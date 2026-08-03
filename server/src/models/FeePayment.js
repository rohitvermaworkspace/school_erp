const mongoose = require("mongoose");

const feePaymentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    totalFee: {
      type: Number,
      required: true,
    },

    remainingFee: {
      type: Number,
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "partial", "pending"],
      default: "pending",
    },

    paymentMode: {
      type: String,
      enum: ["cash", "online", "upi", "card"],
      default: "cash",
    },

    transactionId: {
      type: String,
    },

    paidAt: {
      type: Date,
      default: Date.now,
    },

    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeePayment", feePaymentSchema);