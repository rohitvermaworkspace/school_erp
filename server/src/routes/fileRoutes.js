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
  upload.single("file"),
  uploadFile
);

router.get(
  "/",
  protect,
  getFiles
);

router.delete(
  "/:id",
  protect,
  deleteFile
);

module.exports = router;