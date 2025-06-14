// auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();
const JWT_SECRET = "secretKey";

// ✅ Register
router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (name, email, username, password, role, status, created_at) VALUES (?, ?, ?, ?, 'user', 'active', NOW())";
  db.query(query, [name, email, username, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User registered successfully" });
  });
});

// ✅ Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

// ✅ Forgot Password (Dummy for now)
router.post("/forgot", (req, res) => {
  const { email } = req.body;
  // yahan normally email bhejni hoti hai
  res.json({ message: `Reset link sent to ${email} (dummy)` });
});

module.exports = router;
