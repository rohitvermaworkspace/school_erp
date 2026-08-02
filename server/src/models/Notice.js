const mongoose = require("mongoose");

const noticeSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      audience: {
        type: String,
        enum: [
          "all",
          "students",
          "teachers",
        ],
        default: "all",
      },

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Notice",
  noticeSchema
);