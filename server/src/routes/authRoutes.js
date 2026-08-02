const express = require("express");
const router = express.Router();

const { signup, loginUser } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// PUBLIC
router.post("/signup", signup);
router.post("/loginUser", loginUser);

// USER PROFILE (any logged in user)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// ADMIN ONLY ROUTE
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

// TEACHER ONLY ROUTE
router.get("/teacher", protect, authorizeRoles("teacher"), (req, res) => {
  res.json({
    message: "Welcome Teacher",
  });
});

module.exports = router;
