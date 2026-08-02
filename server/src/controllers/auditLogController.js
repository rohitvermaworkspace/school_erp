const AuditLog = require(
  "../models/AuditLog"
);

// GET ALL LOGS

const getAuditLogs =
  async (req, res) => {
    try {
      const logs =
        await AuditLog.find()
          .populate(
            "performedBy",
            "name email role"
          )
          .sort({
            createdAt: -1,
          });

      res.json(logs);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getAuditLogs,
};