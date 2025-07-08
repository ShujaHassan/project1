const db = require("../db");

// Add Initiative
exports.addInitiative = (req, res) => {
  const { name, logo, description, text, heading, status } = req.body;
  const logoImage = req.file?.filename || null;

  const sql = `INSERT INTO initiatives (name, logo, description, text, heading, status) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, logoImage, description, text, heading, status], (err, result) => {
    if (err) return res.status(500).json({ error: "Database insert error" });
    res.status(201).json({ message: "Initiative added successfully" });
  });
};

// Get All Initiatives
exports.getAllInitiatives = (req, res) => {
  db.query("SELECT * FROM initiatives ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database fetch error" });
    res.json(rows);
  });
};

// Get Initiative by ID
exports.getInitiativeById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM initiatives WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (rows.length === 0) return res.status(404).json({ error: "Initiative not found" });
    res.json(rows[0]);
  });
};

// Update Initiative
exports.updateInitiative = (req, res) => {
  const { id } = req.params;
  const { name, description, text, heading, status } = req.body;
  const logoImage = req.file?.filename;

  const sql = logoImage
    ? `UPDATE initiatives SET name=?, logo=?, description=?, text=?, heading=?, status=? WHERE id=?`
    : `UPDATE initiatives SET name=?, description=?, text=?, heading=?, status=? WHERE id=?`;

  const values = logoImage
    ? [name, logoImage, description, text, heading, status, id]
    : [name, description, text, heading, status, id];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: "Database update error" });
    res.json({ message: "Initiative updated successfully" });
  });
};

// Delete Initiative
exports.deleteInitiative = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM initiatives WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Database delete error" });
    res.json({ message: "Initiative deleted successfully" });
  });
};
