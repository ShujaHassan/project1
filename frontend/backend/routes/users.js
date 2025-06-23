const express = require("express");
const router = express.Router();
const db = require("../db"); // your db connection file
const bcrypt = require("bcrypt");

// GET all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// GET single user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(results[0]);
  });
});

// POST add new user
router.post("/", async (req, res) => {
  const { name, username, email, password, role, status } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (name, username, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [name, username, email, hashedPassword, role, status], (err, result) => {
    if (err) return res.status(500).json({ error: "Insert error" });
    res.status(201).json({ id: result.insertId, message: "User added" });
  });
});

// PUT update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password, role, status } = req.body;

  let updateQuery = "UPDATE users SET name=?, username=?, email=?, role=?, status=?";
  const values = [name, username, email, role, status];

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateQuery += ", password=?";
    values.push(hashedPassword);
  }

  updateQuery += " WHERE id=?";
  values.push(id);

  db.query(updateQuery, values, (err) => {
    if (err) return res.status(500).json({ error: "Update error" });
    res.json({ message: "User updated" });
  });
});

// DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Delete error" });
    res.json({ message: "User deleted" });
  });
});

module.exports = router;
