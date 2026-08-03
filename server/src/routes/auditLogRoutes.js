const express = require(
  "express"
);

const router =
  express.Router();

const {
  getAuditLogs,
} = require(
  "../controllers/auditLogController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const tenantScope = require(
  "../middleware/tenantMiddleware"
);

router.get(
  "/",
  protect,
  tenantScope,
  getAuditLogs
);

module.exports = router;