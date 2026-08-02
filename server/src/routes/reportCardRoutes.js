const express = require("express");

const router =
  express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  generateReportCard,
} = require("../controllers/reportCardController");

router.get(
  "/:studentId",
  protect,
  authorizeRoles(
    "teacher",
    "admin"
  ),
  generateReportCard
);

module.exports = router;