const File = require(
  "../models/File"
);

const uploadFile = async (
  req,
  res
) => {
  try {
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const file =
      await File.create({
        fileName:
          req.file.originalname,

        fileUrl:
          `/uploads/${req.file.filename}`,

        fileType:
          req.file.mimetype,

        uploadedBy:
          req.user.id,

        schoolId:
          req.schoolId,
      });

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFiles = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    const files =
      await File.find({ schoolId })
        .populate(
          "uploadedBy",
          "name role"
        )
        .sort({
          createdAt: -1,
        });

    res.json(files);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

const deleteFile = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    await File.findOneAndDelete(
      { _id: req.params.id, schoolId }
    );

    res.json({
      message:
        "File deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  deleteFile,
};