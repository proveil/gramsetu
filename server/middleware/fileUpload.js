import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.id;
    const folder = req.params.type || "general"; // dynamic folder

    const uploadPath = path.join(
      process.cwd(),
      "..",
      "storage",
      userId,
      folder
    );

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const uploadSingle = multer({ storage });