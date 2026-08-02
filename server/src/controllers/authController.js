const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");
const createAuditLog = require("../utils/createAuditLog");

// =========================
// SIGNUP
// =========================
const signup = async (req, res) => {
  try {
    const { name, email, password, role, className, rollNumber } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 2️⃣ AUTO CREATE STUDENT PROFILE (IMPORTANT FIX)
    if (role === "student") {
      await Student.create({
        userId: user._id,
        name,
        email,
        className: className || "",
        rollNumber: rollNumber || "",
      });
    }

    const token = generateToken(user);

    await createAuditLog({
      module: "Authentication",
      action: "SIGNUP",
      details: `${user.email} registered`,
      userId: user._id,
    });

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// LOGIN
// =========================
const loginUser = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    const token =
      generateToken(user);

    await createAuditLog({
      module:
        "Authentication",
      action: "LOGIN",
      details: `${user.email} logged in`,
      userId: user._id,
    });

    return res.json({
      message:
        "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  signup,
  loginUser,
};