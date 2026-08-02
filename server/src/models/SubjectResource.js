const mongoose =
  require("mongoose");

const resourceSchema =
  new mongoose.Schema(
    {
      subject: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },

      title: String,

      description: String,

      fileUrl: String,

      uploadedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "SubjectResource",
    resourceSchema
  );