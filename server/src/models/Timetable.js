const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },

  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

const timetableSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },

    day: {
      type: String,
      required: true,
    },

    periods: [periodSchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Timetable",
  timetableSchema
);