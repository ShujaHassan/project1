const db = require("../db");

// GET all videos
exports.getAllVideos = (req, res) => {
  db.query("SELECT * FROM video", (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
};

// GET single video by ID
exports.getVideoById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM video WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

// ADD new video
exports.addVideo = (req, res) => {
  const { link, initiative, season, status } = req.body;
  const sql = "INSERT INTO video (link, initiative, season, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [link, initiative, season, status], (err, result) => {
    if (err) return res.status(500).json({ error: "Insert error" });
    res.json({ message: "Video added successfully", id: result.insertId });
  });
};

// UPDATE video
exports.updateVideo = (req, res) => {
  const id = req.params.id;
  const { link, initiative, season, status } = req.body;
  const sql = "UPDATE video SET link = ?, initiative = ?, season = ?, status = ? WHERE id = ?";
  db.query(sql, [link, initiative, season, status, id], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Video updated successfully" });
  });
};

// DELETE video
exports.deleteVideo = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM video WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Video deleted successfully" });
  });
};
