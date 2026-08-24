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

const {
  getPlatformStats,
  updateSchoolStatus,
  listSchoolAdmins,
  createSchoolAdmin,
  updateSchoolAdmin,
  updateSchoolAdminStatus,
  listPlatformUsers,
  updateUserStatus,
} = require("../controllers/platformController");

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

// SUPER ADMIN — Platform statistics & school activation
router.get("/platform-stats", protect, authorizeRoles("super_admin"), getPlatformStats);
router.patch("/schools/:id/status", protect, authorizeRoles("super_admin"), updateSchoolStatus);

// SUPER ADMIN — School Admin management
router.get("/school-admins", protect, authorizeRoles("super_admin"), listSchoolAdmins);
router.post("/school-admins", protect, authorizeRoles("super_admin"), createSchoolAdmin);
router.put("/school-admins/:id", protect, authorizeRoles("super_admin"), updateSchoolAdmin);
router.patch(
  "/school-admins/:id/status",
  protect,
  authorizeRoles("super_admin"),
  updateSchoolAdminStatus
);

// SUPER ADMIN — Platform-wide users
router.get("/platform-users", protect, authorizeRoles("super_admin"), listPlatformUsers);
router.patch("/users/:id/status", protect, authorizeRoles("super_admin"), updateUserStatus);

// ADMIN ONLY ROUTE
router.get("/admin", protect, tenantScope, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// TEACHER ONLY ROUTE
router.get("/teacher", protect, tenantScope, authorizeRoles("teacher"), (req, res) => {
  res.json({ message: "Welcome Teacher" });
});

module.exports = router;
