const express = require("express");
const router = express.Router();
const makeUploader = require("../middlewares/upload");
const upload = makeUploader("sessions"); // ✅ Yeh line zaroori hai
const sessionController = require("../controllers/sessionController");

router.post("/", upload.single("poster"), sessionController.addSession);
router.get("/", sessionController.getAllSessions);
router.get("/:id", sessionController.getSessionById);
router.put("/:id", upload.single("poster"), sessionController.updateSession);
router.delete("/:id", sessionController.deleteSession);

module.exports = router;
