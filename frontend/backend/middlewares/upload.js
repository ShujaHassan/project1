const multer = require("multer");
const path = require("path");
const fs = require("fs");

const makeUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `uploads/${folderName}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    },
  });

  return multer({ storage });
};

module.exports = makeUploader;
