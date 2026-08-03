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
const tenantScope = require("../middleware/tenantMiddleware");

const router = express.Router();

router.get("/active", getActiveSession);
router.get("/", protect, tenantScope, getSessions);
router.post("/", protect, tenantScope, authorizeRoles("admin"), createSession);
router.put("/:id", protect, tenantScope, authorizeRoles("admin"), updateSession);
router.put("/:id/activate", protect, tenantScope, authorizeRoles("admin"), activateSession);
router.delete("/:id", protect, tenantScope, authorizeRoles("admin"), deleteSession);

module.exports = router;