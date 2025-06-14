const express = require("express");
const router = express.Router();
const verifyToken = require("./authMiddleware");

// ✅ Protected route
router.get("/dashboard-data", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard!", user: req.user });
});

module.exports = router;