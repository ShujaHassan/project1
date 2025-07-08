const db = require("../db");
const fs = require("fs");
const path = require("path");

exports.addSession = (req, res) => {
  const { name, one_liner, status, initiative, season } = req.body;
  const poster = req.file ? req.file.filename : null;

  const query = `INSERT INTO sessions (name, one_liner, poster, status, initiative, season)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, one_liner, poster, status, initiative, season], (err, result) => {
    if (err) {
      console.error("Add Session Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Session added successfully" });
  });
};

exports.getAllSessions = (req, res) => {
  db.query("SELECT * FROM sessions ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

exports.getSessionById = (req, res) => {
  db.query("SELECT * FROM sessions WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Session not found" });
    res.json(results[0]);
  });
};

exports.updateSession = (req, res) => {
  const id = req.params.id;
  const { name, one_liner, status, initiative, season } = req.body;
  const poster = req.file ? req.file.filename : null;

  const getOld = `SELECT poster FROM sessions WHERE id = ?`;
  db.query(getOld, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Fetch error" });

    const oldPoster = results[0]?.poster;

    const query = `UPDATE sessions SET name=?, one_liner=?, status=?, initiative=?, season=?${poster ? ", poster=?" : ""} WHERE id=?`;
    const params = poster
      ? [name, one_liner, status, initiative, season, poster, id]
      : [name, one_liner, status, initiative, season, id];

    db.query(query, params, (err) => {
      if (err) return res.status(500).json({ error: "Update error" });

      if (poster && oldPoster) {
        const oldPath = path.join("uploads", oldPoster);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      res.json({ message: "Session updated successfully" });
    });
  });
};

exports.deleteSession = (req, res) => {
  const id = req.params.id;
  db.query("SELECT poster FROM sessions WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Fetch error" });

    const poster = results[0]?.poster;
    db.query("DELETE FROM sessions WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Delete error" });

      if (poster) {
        const filePath = path.join("uploads", poster);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      res.json({ message: "Session deleted successfully" });
    });
  });
};
