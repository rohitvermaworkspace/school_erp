const Student = require("../models/Student");
const Class = require("../models/Class");

// GET CLASS NAMES WITH SECTIONS (for dropdowns)
exports.getClassNames = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const classes = await Class.find({ schoolId }).select("className section");

    const classMap = {};
    classes.forEach((cls) => {
      if (!classMap[cls.className]) {
        classMap[cls.className] = [];
      }
      if (!classMap[cls.className].includes(cls.section)) {
        classMap[cls.className].push(cls.section);
      }
    });

    const result = Object.entries(classMap).map(([className, sections]) => ({
      className,
      sections: sections.sort(),
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch class names" });
  }
};

// GET NEXT ROLL NUMBER for a class+section
exports.getNextRollNumber = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const { className, section } = req.query;

    if (!className || !section) {
      return res.status(400).json({ message: "className and section are required" });
    }

    const lastStudent = await Student.findOne({
      schoolId,
      "academic.className": className,
      "academic.section": section,
    })
      .sort({ "academic.rollNumber": -1 })
      .select("academic.rollNumber");

    const nextRoll = lastStudent
      ? String(parseInt(lastStudent.academic.rollNumber) + 1)
      : "1";

    res.status(200).json({ rollNumber: nextRoll });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate roll number" });
  }
};

// GET ALL CLASSES
exports.getClasses = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const classes = await Class.find({ schoolId })
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
              schoolId,
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
    const schoolId = req.schoolId;

    const cls = await Class.findOne({ _id: req.params.id, schoolId });

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
    const schoolId = req.schoolId;

    const newClass = await Class.create({
      ...req.body,
      schoolId,
      createdBy: req.user._id,
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create class",
    });
  }
};

// UPDATE CLASS
exports.updateClass = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const updatedClass = await Class.findOneAndUpdate(
      { _id: req.params.id, schoolId },
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
    const schoolId = req.schoolId;

    const deletedClass = await Class.findOneAndDelete({ _id: req.params.id, schoolId });

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
