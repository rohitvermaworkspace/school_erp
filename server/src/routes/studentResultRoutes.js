const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getStudentResults,
  getStudentResultDetails,
} = require("../controllers/studentResultController");

router.get(
  "/",
  protect,
  authorizeRoles("student"),
  getStudentResults
);

router.get(
  "/:id",
  protect,
  authorizeRoles("student"),
  getStudentResultDetails
);

module.exports = router;