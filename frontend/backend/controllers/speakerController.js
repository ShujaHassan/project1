const db = require("../db");
const fs = require("fs");
const path = require("path");

// ➕ ADD SPEAKER
exports.addSpeaker = (req, res) => {
  const {
    name,
    season,
    initiative,
    role,
    facebook_link,
    instagram_link,
    youtube_link,
    description,
  } = req.body;

  const fields = ["name", "season", "initiative", "role", "facebook_link", "instagram_link", "youtube_link", "description"];
  const values = [name, season, initiative, role, facebook_link, instagram_link, youtube_link, description];

  if (req.file) {
    fields.push("image");
    values.push(req.file.filename);
  }

  const placeholders = fields.map(() => "?").join(", ");
  const query = `INSERT INTO speakers (${fields.join(", ")}) VALUES (${placeholders})`;

  db.query(query, values, (err) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Speaker added successfully" });
  });
};

// 📥 GET ALL
exports.getAllSpeakers = (req, res) => {
  db.query("SELECT * FROM speakers ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// 🔍 GET BY ID
exports.getSpeakerById = (req, res) => {
  db.query("SELECT * FROM speakers WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Speaker not found" });
    res.json(results[0]);
  });
};

// ✏️ UPDATE
exports.updateSpeaker = (req, res) => {
  const {
    name,
    season,
    initiative,
    role,
    facebook_link,
    instagram_link,
    youtube_link,
    description,
  } = req.body;
  const id = req.params.id;

  const updates = [];
  const values = [];

  if (name) updates.push("name=?"), values.push(name);
  if (season) updates.push("season=?"), values.push(season);
  if (initiative) updates.push("initiative=?"), values.push(initiative);
  if (role) updates.push("role=?"), values.push(role);
  if (facebook_link) updates.push("facebook_link=?"), values.push(facebook_link);
  if (instagram_link) updates.push("instagram_link=?"), values.push(instagram_link);
  if (youtube_link) updates.push("youtube_link=?"), values.push(youtube_link);
  if (description) updates.push("description=?"), values.push(description);

  if (req.file) {
    updates.push("image=?");
    values.push(req.file.filename);
  }

  if (updates.length === 0) return res.status(400).json({ error: "No fields to update" });

  const query = `UPDATE speakers SET ${updates.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(query, values, (err) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Speaker updated successfully" });
  });
};

// ❌ DELETE
exports.deleteSpeaker = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM speakers WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Speaker not found" });

    const row = results[0];
    if (row.image) {
      const filePath = path.join("uploads", "speakers", row.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    db.query("DELETE FROM speakers WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Delete error" });
      res.json({ message: "Speaker deleted successfully" });
    });
  });
};
