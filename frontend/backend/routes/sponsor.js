const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const sponsorController = require("../controllers/sponsorController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/sponsors/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", sponsorController.getAllSponsors);
router.get("/:id", sponsorController.getSponsorById);
router.post("/", upload.single("image"), sponsorController.createSponsor);
router.put("/:id", upload.single("image"), sponsorController.updateSponsor);
router.delete("/:id", sponsorController.deleteSponsor);

module.exports = router;
