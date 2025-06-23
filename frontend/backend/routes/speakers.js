const express = require("express");
const router = express.Router();
const db = require("../db"); // your db connection file
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Serve static images
app.use("/uploads", express.static("uploads"));

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });


// ✅ Add Speaker
app.post("/api/speakers", upload.single("image"), (req, res) => {
  const { name, season, initiative, role, fb, insta, yt, description } = req.body;
  const image = req.file ? req.file.filename : "";

  const query = `
    INSERT INTO speakers (name, season, initiative, role, fb, insta, yt, description, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [name, season, initiative, role, fb, insta, yt, description, image];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Database insert failed" });
    res.status(201).json({ message: "Speaker added successfully" });
  });
});

// ✅ Get All Speakers
app.get("/api/speakers", (req, res) => {
  db.query("SELECT * FROM speakers ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// ✅ Get Single Speaker
app.get("/api/speakers/:id", (req, res) => {
  db.query("SELECT * FROM speakers WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
});

// ✅ Update Speaker (with or without image)
app.put("/api/speakers/:id", upload.single("image"), (req, res) => {
  const { name, season, initiative, role, fb, insta, yt, description } = req.body;
  const speakerId = req.params.id;

  let imagePart = "";
  const values = [name, season, initiative, role, fb, insta, yt, description];

  if (req.file) {
    imagePart = ", image = ?";
    values.push(req.file.filename);
  }

  values.push(speakerId);

  const query = `
    UPDATE speakers SET
      name = ?, season = ?, initiative = ?, role = ?,
      fb = ?, insta = ?, yt = ?, description = ?
      ${imagePart}
    WHERE id = ?
  `;

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Database update failed" });
    res.json({ message: "Speaker updated successfully" });
  });
});

// ✅ Delete Speaker
app.delete("/api/speakers/:id", (req, res) => {
  const id = req.params.id;

  // Optionally: delete image file too
  db.query("SELECT image FROM speakers WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) return res.status(500).json({ error: "Error finding speaker" });

    const filename = results[0].image;
    if (filename) {
      fs.unlink(`uploads/${filename}`, (err) => {
        if (err) console.log("Image delete error:", err);
      });
    }

    db.query("DELETE FROM speakers WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Delete failed" });
      res.json({ message: "Speaker deleted" });
    });
  });
});
