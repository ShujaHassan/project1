const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/feedback/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("img"), feedbackController.addFeedback);
router.get("/", feedbackController.getAllFeedback);
router.get("/:id", feedbackController.getFeedbackById);
router.put("/:id", upload.single("img"), feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
