const db = require("../db");
const path = require("path");

exports.addBanner = (req, res) => {
  const { heading, description, initiative, season, status } = req.body;
  const image = req.file?.filename || null;

  const sql = `INSERT INTO banner (img, heading, description, initiative, season, status) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [image, heading, description, initiative, season, status], (err, result) => {
    if (err) return res.status(500).json({ error: "Database insert error" });
    res.status(201).json({ message: "Banner added successfully" });
  });
};

exports.getAllBanners = (req, res) => {
  db.query("SELECT * FROM banner ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database fetch error" });
    res.json(rows);
  });
};

exports.getBannerById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM banner WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (rows.length === 0) return res.status(404).json({ error: "Banner not found" });
    res.json(rows[0]);
  });
};

exports.updateBanner = (req, res) => {
  const { id } = req.params;
  const { heading, description, initiative, season, status } = req.body;
  const image = req.file?.filename;

  const sql = image
    ? `UPDATE banner SET img=?, heading=?, description=?, initiative=?, season=?, status=? WHERE id=?`
    : `UPDATE banner SET heading=?, description=?, initiative=?, season=?, status=? WHERE id=?`;

  const values = image
    ? [image, heading, description, initiative, season, status, id]
    : [heading, description, initiative, season, status, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Database update error" });
    res.json({ message: "Banner updated successfully" });
  });
};

exports.deleteBanner = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM banner WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database delete error" });
    res.json({ message: "Banner deleted successfully" });
  });
};
