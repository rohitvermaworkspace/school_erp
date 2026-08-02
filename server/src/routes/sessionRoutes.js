const express = require("express");

const {
  createSession,
  getSessions,
  getActiveSession,
  activateSession,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/", createSession);
router.get("/", getSessions);
router.get("/active", getActiveSession);
router.put("/:id", updateSession);
router.put("/:id/activate", activateSession);
router.delete("/:id", deleteSession);

module.exports = router;