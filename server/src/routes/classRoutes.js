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

router.get("/", protect, getClasses);

router.get("/:id", protect, getClassById);

router.post("/", protect, createClass);

router.put("/:id", protect, updateClass);

router.delete("/:id", protect, deleteClass);

module.exports = router;