const mongoose = require("mongoose");

const auditLogSchema =
  new mongoose.Schema(
    {
      schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        default: null,
      },

      module: {
        type: String,
        required: true,
      },

      action: {
        type: String,
        required: true,
      },

      details: {
        type: String,
      },

      performedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "AuditLog",
    auditLogSchema
  );