const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const makeUploader = require("../middlewares/upload");
const upload = makeUploader("banner"); // uploads/banner

router.post("/", upload.single("img"), bannerController.addBanner);
router.get("/", bannerController.getAllBanners);
router.get("/:id", bannerController.getBannerById);
router.put("/:id", upload.single("img"), bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
