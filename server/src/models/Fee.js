const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    feeType: {
      type: String,
      enum: ["Admission", "Tuition", "Transport", "Exam", "Library", "Sports", "Other"],
      required: true,
    },

    month: String,
    year: Number,

    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Online", "Card", "UPI"],
      default: null,
    },

    receiptNo: {
      type: String,
      unique: true,
      sparse: true,
    },

    transactionId: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);