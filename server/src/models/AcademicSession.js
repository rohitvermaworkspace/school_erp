const mongoose = require("mongoose");

const academicSessionSchema = new mongoose.Schema(
{
  sessionName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  sessionCode: {
    type: String,
    unique: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["Active", "Archived"],
    default: "Active",
  },
},
{
  timestamps: true,
}
);

academicSessionSchema.pre("save", function () {
  if (!this.sessionCode) {
    this.sessionCode = this.sessionName.replace(/-/g, "");
  }
});

module.exports = mongoose.model(
  "AcademicSession",
  academicSessionSchema
);