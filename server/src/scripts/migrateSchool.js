/**
 * Migration Script: Add schoolId to existing data
 *
 * This script:
 * 1. Creates a default school ("Default School", code "DEFAULT")
 * 2. Assigns all existing Users, Students, Teachers, etc. to that school
 * 3. Creates a super_admin user
 *
 * Usage: node src/scripts/migrateSchool.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const School = require("../models/School");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Subject = require("../models/Subject");
const Attendance = require("../models/Attendance");
const Mark = require("../models/Mark");
const Result = require("../models/Result");
const Fee = require("../models/Fee");
const FeePayment = require("../models/FeePayment");
const Notice = require("../models/Notice");
const Notification = require("../models/Notification");
const Timetable = require("../models/Timetable");
const Settings = require("../models/Settings");
const AuditLog = require("../models/AuditLog");
const Leave = require("../models/Leave");
const AcademicSession = require("../models/AcademicSession");
const File = require("../models/File");
const SubjectResource = require("../models/SubjectResource");
const bcrypt = require("bcryptjs");

const MIGRATION_SCHOOL = {
  name: "Default School",
  code: "DEFAULT",
  email: "admin@defaultschool.com",
  phone: "",
  address: "",
  city: "",
  state: "",
  principalName: "",
  plan: "Free",
  status: "Active",
};

const SUPER_ADMIN = {
  name: "Super Admin",
  email: "superadmin@edupulse.com",
  password: "admin123",
  role: "super_admin",
};

async function migrate() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected.\n");

    // 1. Create default school
    let school = await School.findOne({ code: "DEFAULT" });
    if (!school) {
      school = await School.create(MIGRATION_SCHOOL);
      console.log(`Created default school: ${school.name} (${school._id})`);
    } else {
      console.log(`Default school already exists: ${school.name} (${school._id})`);
    }

    // 2. Create super_admin user
    let superAdmin = await User.findOne({ email: SUPER_ADMIN.email, role: "super_admin" });
    if (!superAdmin) {
      const hashedPassword = await bcrypt.hash(SUPER_ADMIN.password, 10);
      superAdmin = await User.create({
        name: SUPER_ADMIN.name,
        email: SUPER_ADMIN.email,
        password: hashedPassword,
        role: "super_admin",
        schoolId: null,
      });
      console.log(`Created super_admin: ${superAdmin.email} (${superAdmin._id})`);
    } else {
      console.log(`Super admin already exists: ${superAdmin.email}`);
    }

    // 3. Models that need schoolId added
    const modelsToUpdate = [
      { model: User, name: "User" },
      { model: Student, name: "Student" },
      { model: Teacher, name: "Teacher" },
      { model: Class, name: "Class" },
      { model: Subject, name: "Subject" },
      { model: Attendance, name: "Attendance" },
      { model: Mark, name: "Mark" },
      { model: Result, name: "Result" },
      { model: Fee, name: "Fee" },
      { model: FeePayment, name: "FeePayment" },
      { model: Notice, name: "Notice" },
      { model: Notification, name: "Notification" },
      { model: Timetable, name: "Timetable" },
      { model: Settings, name: "Settings" },
      { model: AuditLog, name: "AuditLog" },
      { model: Leave, name: "Leave" },
      { model: AcademicSession, name: "AcademicSession" },
      { model: File, name: "File" },
      { model: SubjectResource, name: "SubjectResource" },
    ];

    console.log("\nMigrating data...");

    for (const { model, name } of modelsToUpdate) {
      // Skip User model - super_admin should NOT get schoolId
      if (model === User) {
        const result = await model.updateMany(
          { schoolId: { $exists: false }, role: { $ne: "super_admin" } },
          { $set: { schoolId: school._id } }
        );
        console.log(`  ${name}: ${result.modifiedCount} documents updated (skipped super_admin)`);
        continue;
      }

      const result = await model.updateMany(
        { schoolId: { $exists: false } },
        { $set: { schoolId: school._id } }
      );
      console.log(`  ${name}: ${result.modifiedCount} documents updated`);
    }

    console.log("\nMigration complete!");
    console.log(`\nSuper Admin credentials:`);
    console.log(`  Email: ${SUPER_ADMIN.email}`);
    console.log(`  Password: ${SUPER_ADMIN.password}`);
    console.log(`\nLogin at: /login`);

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB.");
  }
}

migrate();
