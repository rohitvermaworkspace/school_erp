const Student = require("../models/Student");
const Class = require("../models/Class");

// GET ALL CLASSES
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
    .populate(
      "classTeacher",
      "name email"
    )
    .populate(
      "createdBy",
      "name email role"
    )
    .sort({ createdAt: -1 });

    const classesWithStudents =
      await Promise.all(
        classes.map(async (cls) => {

          const totalStudents =
            await Student.countDocuments({
              className: `${cls.className}${cls.section.replace(
                cls.className,
                ""
              )}`,
            });

          return {
            ...cls.toObject(),
            totalStudents,
          };
        })
      );

    res.status(200).json(classesWithStudents);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch classes",
    });
  }
};

// GET SINGLE CLASS
exports.getClassById = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);

    if (!cls) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.status(200).json(cls);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch class",
    });
  }
};

// CREATE CLASS
exports.createClass = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const newClass = await Class.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.log("CREATE CLASS ERROR:", error);

    res.status(500).json({
      message: "Failed to create class",
    });
  }
};

// UPDATE CLASS
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update class",
    });
  }
};

// DELETE CLASS
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.status(200).json({
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete class",
    });
  }
};
