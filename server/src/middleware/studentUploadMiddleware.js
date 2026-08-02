const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/uploads/students/");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.fieldname + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload.fields([
  { name: "studentPhoto", maxCount: 1 },
  { name: "guardianPhoto", maxCount: 1 },
  { name: "birthCertificate", maxCount: 1 },
  { name: "aadhaarCard", maxCount: 1 },
  { name: "transferCertificate", maxCount: 1 },
  { name: "marksheet", maxCount: 1 },
]);