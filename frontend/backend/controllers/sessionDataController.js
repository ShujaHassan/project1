const db = require("../db");
const fs = require("fs");
const path = require("path");

// ✅ Add Session Data
exports.addSessionData = (req, res) => {
  const { name, season, initiative, description, youtube_link } = req.body;
  const imageFields = {};

  req.files.forEach((file, index) => {
    if (index < 50) {
      imageFields[`image_${index + 1}`] = file.filename;
    }
  });

  const fields = ["name", "season", "initiative", "description", "youtube_link", ...Object.keys(imageFields)];
  const placeholders = fields.map(() => "?").join(", ");
  const values = [name, season, initiative, description, youtube_link, ...Object.values(imageFields)];

  const query = `INSERT INTO session_data (${fields.join(", ")}) VALUES (${placeholders})`;

  db.query(query, values, (err) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Session Data added successfully" });
  });
};

// ✅ Other CRUD functions
exports.getAllSessionData = (req, res) => {
  db.query("SELECT * FROM session_data ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

exports.getSessionDataById = (req, res) => {
  db.query("SELECT * FROM session_data WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
};

exports.updateSessionData = (req, res) => {
  const { name, season, initiative, description, youtube_link } = req.body;
  const id = req.params.id;

  const updates = [];
  const values = [];

  if (name) { updates.push("name=?"); values.push(name); }
  if (season) { updates.push("season=?"); values.push(season); }
  if (initiative) { updates.push("initiative=?"); values.push(initiative); }
  if (description) { updates.push("description=?"); values.push(description); }
  if (youtube_link) { updates.push("youtube_link=?"); values.push(youtube_link); }

  req.files.forEach((file, index) => {
    if (index < 50) {
      const column = `image_${index + 1}`;
      updates.push(`${column}=?`);
      values.push(file.filename);
    }
  });

  if (updates.length === 0) return res.status(400).json({ error: "No fields to update" });

  const query = `UPDATE session_data SET ${updates.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(query, values, (err) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Session Data updated successfully" });
  });
};

exports.deleteSessionData = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM session_data WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const row = results[0];
    if (!row) return res.status(404).json({ error: "Not found" });

    for (let i = 1; i <= 50; i++) {
      const img = row[`image_${i}`];
      if (img) {
        const filePath = path.join("uploads", "session-data", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    db.query("DELETE FROM session_data WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Delete error" });
      res.json({ message: "Deleted successfully" });
    });
  });
};
