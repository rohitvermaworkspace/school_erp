const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // OPTIONAL: prevent duplicate email
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CHANGE PASSWORD =================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(400).json({
        message: 'Old password is incorrect',
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Image required',
      });
    }

    const user = await User.findById(req.user._id);

    user.profileImage = req.file.filename;
    await user.save();
    await Student.updateOne(
      { userId: user._id },
      {
        $set: {
          'documents.studentPhoto': req.file.filename,
        },
      }
    );

    res.json({
      success: true,
      message: 'Profile image uploaded',
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
};
