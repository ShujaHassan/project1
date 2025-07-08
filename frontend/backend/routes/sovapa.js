const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createSovapa,
  getAllSovapa,
  updateSovapa,
  deleteSovapa
} = require("../controllers/sovapaController");

// Multer setup for saving poster image in uploads/sovapa/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/sovapa/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 📥 Create Sovapa entry (with poster upload)
router.post("/", upload.single("poster"), createSovapa);

// 📤 Get all Sovapa entries
router.get("/", getAllSovapa);

// ✏️ Update Sovapa entry (optional new poster)
router.put("/:id", upload.single("poster"), updateSovapa);

// ❌ Delete Sovapa entry and its poster
router.delete("/:id", deleteSovapa);

module.exports = router;
