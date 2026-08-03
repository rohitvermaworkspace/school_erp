const Settings = require("../models/Settings");
const School = require("../models/School");

// GET SCHOOL INFO (for logged-in admin to see their school code)
const getSchoolInfo = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    if (!schoolId) {
      return res.status(400).json({ message: "No school assigned" });
    }

    const school = await School.findById(schoolId).select("name code email phone address city state principalName status plan");
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SETTINGS
const getSettings = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    let settings = await Settings.findOne({ schoolId });

    if (!settings) {
      settings = await Settings.create({ schoolId });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE SETTINGS
const updateSettings = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    const updateData = {};

    if (req.body.schoolName !== undefined)
      updateData.schoolName = req.body.schoolName;
    if (req.body.principalName !== undefined)
      updateData.principalName = req.body.principalName;
    if (req.body.email !== undefined)
      updateData.email = req.body.email;
    if (req.body.phone !== undefined)
      updateData.phone = req.body.phone;
    if (req.body.address !== undefined)
      updateData.address = req.body.address;
    if (req.body.academicYear !== undefined)
      updateData.academicYear = req.body.academicYear;
    if (req.body.logo !== undefined)
      updateData.logo = req.body.logo;

    updateData.updatedBy = req.user.id;

    const settings = await Settings.findOneAndUpdate(
      { schoolId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json({
      message:
        "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSchoolInfo,
  getSettings,
  updateSettings,
};