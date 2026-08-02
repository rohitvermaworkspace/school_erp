const AuditLog = require("../models/AuditLog");

const createAuditLog = async ({
  module,
  action,
  details,
  userId,
}) => {
  try {
    await AuditLog.create({
      module,
      action,
      details,
      performedBy: userId,
    });
  } catch (error) {
    console.error(
      "Audit Log Error:",
      error.message
    );
  }
};

module.exports = createAuditLog;