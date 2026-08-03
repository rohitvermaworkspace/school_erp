const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
{
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  classes: [String],

  phone: String,

  profileImage: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: "",
  },

  qualification: String,

  experience: String,
  status: {
    type: String,
    enum: ["Active", "Leave"],
    default: "Active"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);