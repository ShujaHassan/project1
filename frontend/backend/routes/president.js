const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const presidentController = require("../controllers/presidentController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Routes
router.post("/president", upload.single("image"), presidentController.addPresident);
router.get("/president", presidentController.getAllPresidents);
router.get("/president/:id", presidentController.getPresidentById);
router.put("/president/:id", upload.single("image"), presidentController.updatePresident);
router.delete("/president/:id", presidentController.deletePresident);

module.exports = router;
