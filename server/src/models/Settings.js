const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      default: "",
    },

    principalName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    academicYear: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);