const express = require("express");
const router = express.Router();

const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getClasses);
router.get("/:id", protect, getClassById);

router.post("/", protect, authorizeRoles("admin"), createClass);
router.put("/:id", protect, authorizeRoles("admin"), updateClass);
router.delete("/:id", protect, authorizeRoles("admin"), deleteClass);

module.exports = router;