const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["admission"],
  },

  year: {
    type: String,
    required: true,
  },

  seq: {
    type: Number,
    default: 0,
  },
});

counterSchema.index({ schoolId: 1, type: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("Counter", counterSchema);
