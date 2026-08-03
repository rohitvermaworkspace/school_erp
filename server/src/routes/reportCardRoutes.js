const express = require("express");

const router =
  express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

const {
  generateReportCard,
} = require("../controllers/reportCardController");

router.get(
  "/:studentId",
  protect,
  tenantScope,
  authorizeRoles(
    "teacher",
    "admin"
  ),
  generateReportCard
);

module.exports = router;