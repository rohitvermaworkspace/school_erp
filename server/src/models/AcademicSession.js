const mongoose = require("mongoose");

const academicSessionSchema = new mongoose.Schema(
{
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },

  sessionName: {
    type: String,
    required: true,
    trim: true,
  },

  sessionCode: {
    type: String,
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

academicSessionSchema.index({ schoolId: 1, sessionName: 1 }, { unique: true });
academicSessionSchema.index({ schoolId: 1, sessionCode: 1 }, { unique: true });

academicSessionSchema.pre("save", function () {
  if (!this.sessionCode) {
    this.sessionCode = this.sessionName.replace(/-/g, "");
  }
});

module.exports = mongoose.model(
  "AcademicSession",
  academicSessionSchema
);