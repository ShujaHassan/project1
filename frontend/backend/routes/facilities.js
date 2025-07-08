const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility
} = require("../controllers/facilitiesController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/facilities/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createFacility);
router.get("/", getAllFacilities);
router.get("/:id", getFacilityById);
router.put("/:id", upload.single("image"), updateFacility);
router.delete("/:id", deleteFacility);

module.exports = router;
