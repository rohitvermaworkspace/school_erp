const express = require(
  "express"
);

const router =
  express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);

const protect = require(
  "../middleware/authMiddleware"
);

const tenantScope = require(
  "../middleware/tenantMiddleware"
);

const {
  uploadFile,
  getFiles,
  deleteFile,
} = require(
  "../controllers/fileController"
);

router.post(
  "/",
  protect,
  tenantScope,
  upload.single("file"),
  uploadFile
);

router.get(
  "/",
  protect,
  tenantScope,
  getFiles
);

router.delete(
  "/:id",
  protect,
  tenantScope,
  deleteFile
);

module.exports = router;