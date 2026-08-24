/**
 * Super Admin Portal — Index Migration & Demo Seed
 *
 * 1. MIGRATION: replaces the legacy GLOBAL unique index on subjects.subjectCode
 *    with per-school compound uniques ({schoolId, subjectCode} and
 *    {schoolId, className, subjectName}) so different schools can safely use
 *    the same subject names/codes.
 *
 * 2. SEED (idempotent):
 *      SUPER_ADMIN  →  super@edupulse.com / Super@123
 *         ├── ABC Public School (ABPS01) → admin Rajesh Kumar (rajesh@abps.test / Admin@123)
 *         │       Classes: Class 1-A, Class 1-B, Class 2-A
 *         │       Class 1 ← English, Mathematics, Hindi
 *         │       Class 2 ← English, Science
 *         └── XYZ Public School (XYPS01) → admin Anita Sharma (anita@xyps.test / Admin@123)
 *                 Classes: Class 1-A, Class 3-A
 *                 Class 1 ← English, Mathematics, Computer Science
 *
 * Usage: node src/scripts/seedSuperAdminPortal.js [--reset]
 *   --reset also removes previously seeded demo schools before seeding.
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const School = require("../models/School");
const User = require("../models/User");
const Class = require("../models/Class");
const Subject = require("../models/Subject");

const SUPER_ADMIN = {
  name: "Platform Super Admin",
  email: process.env.SEED_SUPER_ADMIN_EMAIL || "super@edupulse.com",
  password: process.env.SEED_SUPER_ADMIN_PASSWORD || "Super@123",
};

const DEMO_SCHOOLS = [
  {
    name: "ABC Public School",
    code: "ABPS01",
    board: "CBSE",
    email: "office@abcpublic.test",
    phone: "+91 9800000001",
    address: "12 MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    academicYear: "2026-2027",
    principalName: "Rajesh Kumar",
    admin: { name: "Rajesh Kumar", email: "rajesh@abps.test", password: "Admin@123" },
    classes: [
      { className: "Class 1", section: "A" },
      { className: "Class 1", section: "B" },
      { className: "Class 2", section: "A" },
    ],
    // class → assigned subjects
    assignments: {
      "Class 1": ["English", "Mathematics", "Hindi"],
      "Class 2": ["English", "Science"],
    },
  },
  {
    name: "XYZ Public School",
    code: "XYPS01",
    board: "ICSE",
    email: "office@xyzpublic.test",
    phone: "+91 9800000002",
    address: "44 Park Street",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    academicYear: "2026-2027",
    principalName: "Anita Sharma",
    admin: { name: "Anita Sharma", email: "anita@xyps.test", password: "Admin@123" },
    classes: [
      { className: "Class 1", section: "A" },
      { className: "Class 3", section: "A" },
    ],
    assignments: {
      "Class 1": ["English", "Mathematics", "Computer Science"],
      "Class 3": ["Physics", "Chemistry"],
    },
  },
];

async function migrateIndexes() {
  const collection = mongoose.connection.collection("subjects");
  const indexes = await collection.indexes();

  const legacyGlobalCodeIndex = indexes.find(
    (idx) =>
      JSON.stringify(idx.key) === JSON.stringify({ subjectCode: 1 }) && idx.unique === true
  );

  if (legacyGlobalCodeIndex) {
    console.log(`Dropping legacy global unique index "${legacyGlobalCodeIndex.name}" on subjects...`);
    await collection.dropIndex(legacyGlobalCodeIndex.name);
  }

  // Ensure the new compound indexes exist (syncIndexes creates missing ones).
  await Subject.syncIndexes();
  await Class.syncIndexes();
  console.log("Subject/Class indexes are up to date.");
}

async function upsertSuperAdmin() {
  // Prefer the documented demo account; fall back to any existing super admin.
  let superAdmin = await User.findOne({
    role: "super_admin",
    email: SUPER_ADMIN.email.toLowerCase(),
  });

  if (!superAdmin) {
    superAdmin = await User.create({
      name: SUPER_ADMIN.name,
      email: SUPER_ADMIN.email.toLowerCase(),
      password: await bcrypt.hash(SUPER_ADMIN.password, 10),
      role: "super_admin",
      schoolId: null,
    });
    console.log(`Created SUPER ADMIN → ${SUPER_ADMIN.email} / ${SUPER_ADMIN.password}`);
  } else {
    console.log(`Demo super admin already exists (${superAdmin.email}) — skipped.`);
  }

  const all = await User.countDocuments({ role: "super_admin" });
  if (all > 1) {
    console.log(`(Note: ${all - 1} other super admin account(s) already exist on this platform.)`);
  }

  return superAdmin;
}

async function ensureSchoolCreator(schoolData) {
  let school = await School.findOne({ code: schoolData.code });

  if (school) {
    console.log(`School "${schoolData.name}" already exists — updating profile fields only.`);
    Object.assign(school, {
      board: schoolData.board || school.board,
      country: schoolData.country || school.country,
      academicYear: schoolData.academicYear || school.academicYear,
    });
    await school.save();
    return { school, created: false };
  }

  school = await School.create({
    name: schoolData.name,
    code: schoolData.code,
    email: schoolData.email,
    phone: schoolData.phone,
    address: schoolData.address,
    city: schoolData.city,
    state: schoolData.state,
    country: schoolData.country,
    board: schoolData.board,
    academicYear: schoolData.academicYear,
    principalName: schoolData.principalName,
    status: "Active",
  });

  return { school, created: true };
}

async function ensureSchoolAdmin(school, adminData, createdBy) {
  let admin = await User.findOne({ email: adminData.email.toLowerCase(), schoolId: school._id });

  if (!admin) {
    admin = await User.create({
      name: adminData.name,
      email: adminData.email.toLowerCase(),
      password: await bcrypt.hash(adminData.password, 10),
      role: "admin",
      schoolId: school._id,
    });
    console.log(`  Created SCHOOL ADMIN → ${adminData.email} / ${adminData.password}`);
  } else {
    console.log(`  School admin already exists (${adminData.email}) — skipped.`);
  }

  return admin;
}

async function seedSchool(schoolData, superAdmin) {
  console.log(`\nSeeding ${schoolData.name} (${schoolData.code})...`);

  const { school } = await ensureSchoolCreator(schoolData);
  await ensureSchoolAdmin(school, schoolData.admin, superAdmin._id);

  for (const cls of schoolData.classes) {
    const exists = await Class.findOne({
      schoolId: school._id,
      className: cls.className,
      section: cls.section,
    });

    if (!exists) {
      await Class.create({
        schoolId: school._id,
        className: cls.className,
        section: cls.section,
        status: "Active",
        createdBy: superAdmin._id,
      });
      console.log(`  Created class ${cls.className} - ${cls.section}`);
    }
  }

  for (const [className, subjectNames] of Object.entries(schoolData.assignments)) {
    for (const subjectName of subjectNames) {
      const exists = await Subject.findOne({
        schoolId: school._id,
        className,
        subjectName,
      });

      if (!exists) {
        const slug = `${subjectName}-${className}`
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, "")
          .slice(0, 24);

        await Subject.create({
          schoolId: school._id,
          subjectName,
          subjectCode: `${slug}${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
          className,
          status: "Active",
          createdBy: superAdmin._id,
        });
        console.log(`  Assigned subject ${subjectName} → ${className}`);
      }
    }
  }
}

async function main() {
  const shouldReset = process.argv.includes("--reset");

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB.\n");

  try {
    await migrateIndexes();

    if (shouldReset) {
      const codes = DEMO_SCHOOLS.map((s) => s.code);
      const schools = await School.find({ code: { $in: codes } });
      for (const school of schools) {
        await Promise.all([
          User.deleteMany({ schoolId: school._id }),
          Class.deleteMany({ schoolId: school._id }),
          Subject.deleteMany({ schoolId: school._id }),
        ]);
        await school.deleteOne();
      }
      console.log(`\nReset removed ${schools.length} demo school(s).`);
    }

    const superAdmin = await upsertSuperAdmin();

    for (const schoolData of DEMO_SCHOOLS) {
      // eslint-disable-next-line no-await-in-loop
      await seedSchool(schoolData, superAdmin);
    }

    console.log("\nSeed complete.");
    console.log("--------------------------------------------------");
    console.log("SUPER ADMIN LOGIN : super@edupulse.com / Super@123");
    console.log("ABC ADMIN LOGIN   : rajesh@abps.test / Admin@123  (code ABPS01)");
    console.log("XYZ ADMIN LOGIN   : anita@xyps.test / Admin@123  (code XYPS01)");
    console.log("--------------------------------------------------");
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
