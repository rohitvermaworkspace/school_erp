const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    subjectCode: {
      type: String,
      required: true,
      trim: true,
    },

    className: {
      type: String,
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
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

// Codes and class assignments are unique PER SCHOOL (multi-tenant safe),
// not globally. Replaces the legacy global unique index on subjectCode.
subjectSchema.index({ schoolId: 1, subjectCode: 1 }, { unique: true });
subjectSchema.index({ schoolId: 1, className: 1, subjectName: 1 }, { unique: true });

module.exports = mongoose.model(
  "Subject",
  subjectSchema
);
