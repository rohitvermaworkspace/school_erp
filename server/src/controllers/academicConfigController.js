const mongoose = require("mongoose");

const School = require("../models/School");
const Class = require("../models/Class");
const Subject = require("../models/Subject");
const Student = require("../models/Student");
const Mark = require("../models/Mark");
const Result = require("../models/Result");
const createAuditLog = require("../utils/createAuditLog");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const validateSchoolId = async (schoolId, res) => {
  if (!schoolId || !mongoose.isValidObjectId(schoolId)) {
    res.status(400).json({ message: "A valid schoolId is required" });
    return null;
  }
  const school = await School.findById(schoolId).select("name code status");
  if (!school) {
    res.status(404).json({ message: "School not found" });
    return null;
  }
  return school;
};

// Generate a per-school unique subject code when the caller does not supply one.
const generateSubjectCode = async (schoolId, subjectName, className) => {
  const base =
    `${subjectName}-${className}`
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "")
      .slice(0, 24);

  const prefix = base || "SUBJ";

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const candidate = attempt === 0 ? prefix : `${prefix}${attempt + 1}`;
    // eslint-disable-next-line no-await-in-loop
    const exists = await Subject.findOne({ schoolId, subjectCode: candidate });
    if (!exists) {
      return candidate;
    }
  }
  return `${prefix}${Date.now().toString().slice(-5)}`;
};

const logConfigChange = (req, action, details, schoolId) =>
  createAuditLog({
    module: "Academic Configuration",
    action,
    details,
    userId: req.user._id,
    schoolId,
  });

// ---------------------------------------------------------------------------
// CLASSES (school-specific, managed by Super Admin)
// ---------------------------------------------------------------------------

const getClasses = async (req, res) => {
  try {
    const school = await validateSchoolId(req.query.schoolId, res);
    if (!school) return;

    const { status } = req.query;
    const query = { schoolId: school._id };
    if (status === "Active" || status === "Inactive") {
      query.status = status;
    }

    const classes = await Class.find(query)
      .populate("classTeacher", "name email")
      .sort({ className: 1, section: 1 });

    const withCounts = await Promise.all(
      classes.map(async (cls) => ({
        ...cls.toObject(),
        studentCount: await Student.countDocuments({
          schoolId: school._id,
          "academic.className": cls.className,
          "academic.section": cls.section,
        }),
        subjectCount: await Subject.countDocuments({
          schoolId: school._id,
          className: cls.className,
        }),
      }))
    );

    res.json(withCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const school = await validateSchoolId(req.body.schoolId, res);
    if (!school) return;

    const { className, section } = req.body;
    if (!className?.trim() || !section?.trim()) {
      return res
        .status(400)
        .json({ message: "Class name and section are required" });
    }

    const duplicate = await Class.findOne({
      schoolId: school._id,
      className: className.trim(),
      section: section.trim(),
    });
    if (duplicate) {
      return res.status(400).json({
        message: `Class "${className} - ${section}" already exists in ${school.name}`,
      });
    }

    const created = await Class.create({
      schoolId: school._id,
      className: className.trim(),
      section: section.trim(),
      classTeacher: req.body.classTeacher || null,
      createdBy: req.user._id,
    });

    await logConfigChange(
      req,
      "CREATE",
      `Created class "${created.className} - ${created.section}" in "${school.name}"`,
      school._id
    );

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    const allowed = {};
    if (req.body.className !== undefined) allowed.className = String(req.body.className).trim();
    if (req.body.section !== undefined) allowed.section = String(req.body.section).trim();
    if (req.body.classTeacher !== undefined) allowed.classTeacher = req.body.classTeacher || null;
    if (req.body.status !== undefined && ["Active", "Inactive"].includes(req.body.status)) {
      allowed.status = req.body.status;
    }

    if (allowed.className || allowed.section) {
      const duplicate = await Class.findOne({
        schoolId: cls.schoolId,
        _id: { $ne: cls._id },
        className: allowed.className || cls.className,
        section: allowed.section || cls.section,
      });
      if (duplicate) {
        return res.status(400).json({
          message: "Another class with the same name and section already exists",
        });
      }
    }

    Object.assign(cls, allowed);
    await cls.save();

    await logConfigChange(
      req,
      "UPDATE",
      `Updated class "${cls.className} - ${cls.section}"`,
      cls.schoolId
    );

    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClassStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Status must be Active or Inactive" });
    }

    const cls = await Class.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    cls.status = status;
    await cls.save();

    await logConfigChange(
      req,
      status === "Active" ? "ACTIVATE_CLASS" : "DEACTIVATE_CLASS",
      `${status === "Active" ? "Activated" : "Deactivated"} class "${cls.className} - ${cls.section}"`,
      cls.schoolId
    );

    res.json({
      message:
        status === "Active"
          ? "Class activated"
          : "Class deactivated — it will no longer be offered during admissions",
      class: cls,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Safe deletion: never remove a class that still holds students or subjects.
    const [studentCount, subjectCount] = await Promise.all([
      Student.countDocuments({
        schoolId: cls.schoolId,
        "academic.className": cls.className,
        "academic.section": cls.section,
      }),
      Subject.countDocuments({ schoolId: cls.schoolId, className: cls.className }),
    ]);

    if (studentCount > 0 || subjectCount > 0) {
      return res.status(400).json({
        message: `Cannot delete this class — it still has ${studentCount} student(s) and ${subjectCount} subject assignment(s). Deactivate it instead.`,
      });
    }

    await cls.deleteOne();

    await logConfigChange(
      req,
      "DELETE",
      `Deleted empty class "${cls.className} - ${cls.section}"`,
      cls.schoolId
    );

    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------------
// SUBJECTS (school-specific)
// ---------------------------------------------------------------------------

const getSubjects = async (req, res) => {
  try {
    const school = await validateSchoolId(req.query.schoolId, res);
    if (!school) return;

    const query = { schoolId: school._id };
    if (req.query.className) query.className = req.query.className;
    if (req.query.status === "Active" || req.query.status === "Inactive") {
      query.status = req.query.status;
    }

    const subjects = await Subject.find(query)
      .populate("teacher", "name email")
      .sort({ className: 1, subjectName: 1 });

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubject = async (req, res) => {
  try {
    const school = await validateSchoolId(req.body.schoolId, res);
    if (!school) return;

    const { subjectName, className } = req.body;
    if (!subjectName?.trim() || !className?.trim()) {
      return res
        .status(400)
        .json({ message: "Subject name and class are required" });
    }

    const duplicate = await Subject.findOne({
      schoolId: school._id,
      className: className.trim(),
      subjectName: subjectName.trim(),
    });
    if (duplicate) {
      return res.status(400).json({
        message: `"${subjectName}" is already assigned to this class`,
      });
    }

    let subjectCode = req.body.subjectCode?.trim();
    if (subjectCode) {
      const codeTaken = await Subject.findOne({
        schoolId: school._id,
        subjectCode,
      });
      if (codeTaken) {
        return res.status(400).json({
          message: `Subject code "${subjectCode}" already exists in ${school.name}`,
        });
      }
    } else {
      subjectCode = await generateSubjectCode(
        school._id,
        subjectName.trim(),
        className.trim()
      );
    }

    const subject = await Subject.create({
      schoolId: school._id,
      subjectName: subjectName.trim(),
      subjectCode,
      className: className.trim(),
      teacher: req.body.teacher || null,
      createdBy: req.user._id,
    });

    await logConfigChange(
      req,
      "CREATE",
      `Assigned subject "${subject.subjectName}" (${subject.subjectCode}) to class "${className}" in "${school.name}"`,
      school._id
    );

    res.status(201).json(subject);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This subject is already assigned to the class",
      });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const allowed = {};
    if (req.body.subjectName !== undefined) {
      const nextName = String(req.body.subjectName).trim();
      if (!nextName) {
        return res.status(400).json({ message: "Subject name cannot be empty" });
      }
      allowed.subjectName = nextName;
    }

    // Moving the subject to another class is supported.
    if (req.body.className !== undefined) {
      const nextClass = String(req.body.className).trim();
      if (!nextClass) {
        return res.status(400).json({ message: "Class cannot be empty" });
      }
      allowed.className = nextClass;
    }

    if (req.body.subjectCode !== undefined) {
      allowed.subjectCode = String(req.body.subjectCode).trim();
    }
    if (req.body.teacher !== undefined) allowed.teacher = req.body.teacher || null;
    if (req.body.status !== undefined && ["Active", "Inactive"].includes(req.body.status)) {
      allowed.status = req.body.status;
    }

    const nextClassName = allowed.className || subject.className;
    const nextName = allowed.subjectName || subject.subjectName;

    // A school cannot have the same subject twice inside one class.
    if (
      nextClassName !== subject.className ||
      nextName !== subject.subjectName
    ) {
      const nameClash = await Subject.findOne({
        schoolId: subject.schoolId,
        _id: { $ne: subject._id },
        className: nextClassName,
        subjectName: nextName,
      });
      if (nameClash) {
        return res.status(400).json({
          message: `"${nextName}" is already assigned to class "${nextClassName}". Remove it there first.`,
        });
      }
    }

    if (allowed.subjectCode && allowed.subjectCode !== subject.subjectCode) {
      const codeTaken = await Subject.findOne({
        schoolId: subject.schoolId,
        subjectCode: allowed.subjectCode,
        _id: { $ne: subject._id },
      });
      if (codeTaken) {
        return res
          .status(400)
          .json({ message: `Subject code "${allowed.subjectCode}" already exists in this school` });
      }
    }

    const previousClassName = subject.className;
    Object.assign(subject, allowed);
    await subject.save();

    await logConfigChange(
      req,
      "UPDATE",
      previousClassName !== subject.className
        ? `Moved subject "${subject.subjectName}" from class "${previousClassName}" to "${subject.className}"`
        : `Updated subject "${subject.subjectName}" for class "${subject.className}"`,
      subject.schoolId
    );

    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Status must be Active or Inactive" });
    }

    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    subject.status = status;
    await subject.save();

    await logConfigChange(
      req,
      status === "Active" ? "ACTIVATE_SUBJECT" : "DEACTIVATE_SUBJECT",
      `${status === "Active" ? "Activated" : "Deactivated"} subject "${subject.subjectName}" (${subject.className})`,
      subject.schoolId
    );

    res.json({
      message:
        status === "Active" ? "Subject activated" : "Subject deactivated",
      subject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Marks store the subject by NAME, results reference it by ID.
    // Refuse to delete when either has history; deactivation is the safe path.
    const markCount = await Mark.countDocuments({
      schoolId: subject.schoolId,
      className: subject.className,
      subject: subject.subjectName,
    });

    const resultCount = await Result.countDocuments({
      schoolId: subject.schoolId,
      "subjects.subject": subject._id,
    });

    if (markCount > 0 || resultCount > 0) {
      return res.status(400).json({
        message: `"${subject.subjectName}" has recorded marks/results (${markCount} marks, ${resultCount} results). Deactivate it instead of deleting.`,
      });
    }

    await subject.deleteOne();

    await logConfigChange(
      req,
      "DELETE",
      `Removed subject "${subject.subjectName}" from class "${subject.className}"`,
      subject.schoolId
    );

    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------------
// CLASS → SUBJECT ASSIGNMENT
// ---------------------------------------------------------------------------

// Returns every distinct subject offered by the school plus which ones are
// assigned to the selected class. Powers the assignment matrix UI.
const getClassAssignment = async (req, res) => {
  try {
    const school = await validateSchoolId(req.query.schoolId, res);
    if (!school) return;

    if (!req.query.className) {
      return res.status(400).json({ message: "className query param is required" });
    }

    const subjects = await Subject.find({
      schoolId: school._id,
      className: req.query.className,
    })
      .populate("teacher", "name email")
      .sort({ subjectName: 1 });

    // Distinct subject catalogue across the whole school (any class).
    const catalogue = await Subject.distinct("subjectName", {
      schoolId: school._id,
    });

    const assignedIds = subjects.map((s) => String(s._id));

    res.json({
      school: { id: school._id, name: school.name, code: school.code },
      className: req.query.className,
      assignedSubjects: subjects,
      assignedSubjectNames: subjects.map((s) => s.subjectName),
      assignedIds,
      availableSubjectNames: catalogue.sort(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk assign a set of subject names to a class. Missing records are created;
// existing ones are left untouched.
const assignSubjectsToClass = async (req, res) => {
  try {
    const school = await validateSchoolId(req.body.schoolId, res);
    if (!school) return;

    const { className, subjectNames } = req.body;

    if (!className?.trim() || !Array.isArray(subjectNames) || subjectNames.length === 0) {
      return res.status(400).json({
        message: "className and at least one subject are required",
      });
    }

    const created = [];
    const skipped = [];

    for (const rawName of subjectNames) {
      const subjectName = String(rawName).trim();
      if (!subjectName) continue;

      // eslint-disable-next-line no-await-in-loop
      const exists = await Subject.findOne({
        schoolId: school._id,
        className: className.trim(),
        subjectName,
      });

      if (exists) {
        skipped.push(subjectName);
        // eslint-disable-next-line no-continue
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      const subjectCode = await generateSubjectCode(
        school._id,
        subjectName,
        className.trim()
      );

      // eslint-disable-next-line no-await-in-loop
      const subject = await Subject.create({
        schoolId: school._id,
        subjectName,
        subjectCode,
        className: className.trim(),
        createdBy: req.user._id,
      });

      created.push(subject);
    }

    if (created.length > 0) {
      await logConfigChange(
        req,
        "ASSIGN_SUBJECTS",
        `Assigned [${created.map((s) => s.subjectName).join(", ")}] to class "${className}" in "${school.name}"`,
        school._id
      );
    }

    res.status(201).json({
      message:
        created.length > 0
          ? `${created.length} subject(s) assigned to ${className}`
          : "Selected subjects were already assigned to this class",
      created,
      skipped,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClasses,
  createClass,
  updateClass,
  updateClassStatus,
  deleteClass,
  getSubjects,
  createSubject,
  updateSubject,
  updateSubjectStatus,
  deleteSubject,
  getClassAssignment,
  assignSubjectsToClass,
};
