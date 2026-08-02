const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    examName: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    subjects: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },

        marksObtained: Number,

        maxMarks: Number,
      },
    ],

    totalMarks: Number,

    obtainedMarks: Number,

    percentage: Number,

    grade: String,

    status: {
      type: String,
      enum: ["Pass", "Fail"],
      default: "Pass",
    },
    published: {
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

module.exports =
  mongoose.model(
    "Result",
    resultSchema
  );