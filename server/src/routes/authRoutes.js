const express = require("express");
const router = express.Router();

const {
  signup,
  loginUser,
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

// PUBLIC
router.post("/signup", signup);
router.post("/loginUser", loginUser);

// USER PROFILE (any logged in user)
router.get("/profile", protect, tenantScope, (req, res) => {
  res.json(req.user);
});

// SUPER ADMIN — School Management
router.post("/create-school", protect, authorizeRoles("super_admin"), createSchool);
router.get("/schools", protect, authorizeRoles("super_admin"), getSchools);
router.get("/schools/:id", protect, authorizeRoles("super_admin"), getSchoolById);
router.put("/schools/:id", protect, authorizeRoles("super_admin"), updateSchool);
router.delete("/schools/:id", protect, authorizeRoles("super_admin"), deleteSchool);

// ADMIN ONLY ROUTE
router.get("/admin", protect, tenantScope, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// TEACHER ONLY ROUTE
router.get("/teacher", protect, tenantScope, authorizeRoles("teacher"), (req, res) => {
  res.json({ message: "Welcome Teacher" });
});

module.exports = router;
