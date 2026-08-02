const Settings = require("../models/Settings");

// GET SETTINGS
const getSettings = async (
  req,
  res
) => {
  try {
    let settings =
      await Settings.findOne();

    if (!settings) {
      settings =
        await Settings.create({});
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SETTINGS
const updateSettings = async (
  req,
  res
) => {
  try {
    let settings =
      await Settings.findOne();

    if (!settings) {
      settings =
        await Settings.create({});
    }

    settings.schoolName =
      req.body.schoolName ||
      settings.schoolName;

    settings.principalName =
      req.body.principalName ||
      settings.principalName;

    settings.email =
      req.body.email ||
      settings.email;

    settings.phone =
      req.body.phone ||
      settings.phone;

    settings.address =
      req.body.address ||
      settings.address;

    settings.academicYear =
      req.body.academicYear ||
      settings.academicYear;

    settings.logo =
      req.body.logo ||
      settings.logo;

    settings.updatedBy =
      req.user.id;

    await settings.save();

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
  getSettings,
  updateSettings,
};