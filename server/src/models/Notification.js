const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "GENERAL",
        "HOLIDAY",
        "EXAM",
        "EVENT",
        "EMERGENCY",
      ],
      default: "GENERAL",
    },

    audience: {
      type: String,
      enum: [
        "ALL",
        "STUDENTS",
        "TEACHERS",
        "PARENTS",
      ],
      default: "ALL",
    },

    priority: {
      type: String,
      enum: [
        "LOW",
        "MEDIUM",
        "HIGH",
      ],
      default: "MEDIUM",
    },

    publishDate: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);