const express = require("express");
const router = express.Router();

const {
  getClasses,
  getClassNames,
  getNextRollNumber,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

router.get("/", protect, tenantScope, getClasses);
router.get("/names", protect, tenantScope, getClassNames);
router.get("/next-roll-number", protect, tenantScope, getNextRollNumber);
router.get("/:id", protect, tenantScope, getClassById);

router.post("/", protect, tenantScope, authorizeRoles("admin"), createClass);
router.put("/:id", protect, tenantScope, authorizeRoles("admin"), updateClass);
router.delete("/:id", protect, tenantScope, authorizeRoles("admin"), deleteClass);

module.exports = router;