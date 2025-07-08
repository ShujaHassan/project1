const express = require("express");
const router = express.Router();
const makeUploader = require("../middlewares/upload"); // ✅ yeh factory function hai
const upload = makeUploader("session-data"); // ✅ folder specify karo

const sessionDataController = require("../controllers/sessionDataController");

// ✅ Use upload.array now that it's created properly
router.post("/", upload.array("images", 50), sessionDataController.addSessionData);
router.get("/", sessionDataController.getAllSessionData);
router.get("/:id", sessionDataController.getSessionDataById);
router.put("/:id", upload.array("images", 50), sessionDataController.updateSessionData);
router.delete("/:id", sessionDataController.deleteSessionData);


module.exports = router;
