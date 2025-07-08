// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const speakerController = require("../controllers/speakerController");

// // Image storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/speakers/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Routes
// router.post("/add", upload.single("image"), speakerController.addSpeaker);
// router.get("/", speakerController.getAllSpeakers);
// router.get("/:id", speakerController.getSpeakerById);
// router.put("/update/:id", upload.single("image"), speakerController.updateSpeaker);
// router.delete("/delete/:id", speakerController.deleteSpeaker);

// module.exports = router;
