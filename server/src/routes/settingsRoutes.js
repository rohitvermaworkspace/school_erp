const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

const {
  getSchoolInfo,
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

// GET SCHOOL INFO
router.get(
  "/school-info",
  protect,
  tenantScope,
  getSchoolInfo
);

// GET SETTINGS
router.get(
  "/",
  protect,
  tenantScope,
  getSettings
);

// UPDATE SETTINGS
router.put(
  "/",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  updateSettings
);

module.exports = router;