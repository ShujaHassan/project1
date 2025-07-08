const express = require("express");
const router = express.Router();
const speakerController = require("../controllers/speakerController");
const makeUploader = require("../middlewares/upload");

const upload = makeUploader("speakers");

router.post("/", upload.single("image"), speakerController.addSpeaker); // ✅ now /api/speakers works
router.post("/add", upload.single("image"), speakerController.addSpeaker);
router.get("/", speakerController.getAllSpeakers);
router.get("/:id", speakerController.getSpeakerById);
router.put("/:id", upload.single("image"), speakerController.updateSpeaker);
router.put("/update/:id", upload.single("image"), speakerController.updateSpeaker);
router.delete("/delete/:id", speakerController.deleteSpeaker);

module.exports = router;

