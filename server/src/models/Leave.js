const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
{
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  role: {
    type: String,
    enum: ["teacher", "student"],
    required: true,
  },

  leaveType: {
    type: String,
    required: true,
    enum: [
      "Sick Leave",
      "Casual Leave",
      "Emergency",
      "Other",
    ],
  },

  reason: {
    type: String,
    required: true,
  },

  fromDate: {
    type: String,
    required: true,
  },

  toDate: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected",
    ],
    default: "pending",
  },
},
{ timestamps: true }
);

module.exports = mongoose.model(
  "Leave",
  leaveSchema
);