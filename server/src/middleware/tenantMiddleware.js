const tenantScope = (req, res, next) => {
  if (req.user.role === "super_admin") {
    return next();
  }

  if (!req.schoolId) {
    return res.status(400).json({
      message: "No school assigned to this user",
    });
  }

  next();
};

module.exports = tenantScope;
