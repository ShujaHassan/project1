const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

// Routes connected to controller
router.get("/", aboutController.getAllAbout);
router.get("/:id", aboutController.getAboutById);
router.post("/", aboutController.addAbout);
router.put("/:id", aboutController.updateAbout);
router.delete("/:id", aboutController.deleteAbout);

module.exports = router;
