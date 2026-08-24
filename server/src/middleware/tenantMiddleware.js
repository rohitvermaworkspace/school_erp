const School = require("../models/School");

const tenantScope = async (req, res, next) => {
  try {
    // Super Admin operates across all schools — no tenant restriction.
    if (req.user.role === "super_admin") {
      return next();
    }

    const schoolId = req.schoolId || req.user.schoolId;

    if (!schoolId) {
      return res.status(400).json({
        message: "No school assigned to this user",
      });
    }

    // Enforce platform-level school status: users of a deactivated
    // school cannot operate until the school is re-activated.
    const school = await School.findById(schoolId).select("status");

    if (!school) {
      return res.status(403).json({
        message: "Your school no longer exists on the platform. Contact support.",
      });
    }

    if (school.status !== "Active") {
      return res.status(403).json({
        message:
          "Your school has been deactivated by the platform administrator. Please contact support.",
      });
    }

    req.schoolId = schoolId;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = tenantScope;
