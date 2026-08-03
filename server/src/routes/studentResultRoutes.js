const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

const {
  getStudentResults,
  getStudentResultDetails,
} = require("../controllers/studentResultController");

router.get(
  "/",
  protect,
  tenantScope,
  authorizeRoles("student"),
  getStudentResults
);

router.get(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("student"),
  getStudentResultDetails
);

module.exports = router;