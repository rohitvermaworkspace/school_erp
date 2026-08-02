const express = require("express");

const {
  createSession,
  getSessions,
  getActiveSession,
  activateSession,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/active", getActiveSession);
router.get("/", protect, getSessions);
router.post("/", protect, authorizeRoles("admin"), createSession);
router.put("/:id", protect, authorizeRoles("admin"), updateSession);
router.put("/:id/activate", protect, authorizeRoles("admin"), activateSession);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSession);

module.exports = router;