const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const initiativeController = require("../controllers/initiative");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure 'uploads' exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("logo"), initiativeController.addInitiative);
router.get("/", initiativeController.getAllInitiatives);
router.get("/:id", initiativeController.getInitiativeById);
router.put("/:id", upload.single("logo"), initiativeController.updateInitiative);
router.delete("/:id", initiativeController.deleteInitiative);

module.exports = router;
