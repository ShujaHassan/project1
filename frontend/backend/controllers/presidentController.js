const db = require("../db");
const path = require("path");

// Add President Message
exports.addPresident = (req, res) => {
  const {
    heading,
    title,
    position,
    description,
    bottom_title,
    initiative,
    season,
    status,
  } = req.body;
  const image = req.file?.filename || null;

  const sql = `INSERT INTO president_message (heading, image, title, position, description, bottom_title, initiative, season, status)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      heading,
      image,
      title,
      position,
      description,
      bottom_title,
      initiative,
      season,
      status,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database insert error" });
      res.status(201).json({ message: "President message added successfully" });
    }
  );
};

// Get All
exports.getAllPresidents = (req, res) => {
  db.query("SELECT * FROM president_message ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database fetch error" });
    res.json(rows);
  });
};

// Get By ID
exports.getPresidentById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM president_message WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (rows.length === 0)
      return res.status(404).json({ error: "President message not found" });
    res.json(rows[0]);
  });
};

// Update
exports.updatePresident = (req, res) => {
  const { id } = req.params;
  const {
    heading,
    title,
    position,
    description,
    bottom_title,
    initiative,
    season,
    status,
  } = req.body;
  const image = req.file?.filename;

  const sql = image
    ? `UPDATE president_message SET heading=?, image=?, title=?, position=?, description=?, bottom_title=?, initiative=?, season=?, status=? WHERE id=?`
    : `UPDATE president_message SET heading=?, title=?, position=?, description=?, bottom_title=?, initiative=?, season=?, status=? WHERE id=?`;

  const values = image
    ? [
        heading,
        image,
        title,
        position,
        description,
        bottom_title,
        initiative,
        season,
        status,
        id,
      ]
    : [
        heading,
        title,
        position,
        description,
        bottom_title,
        initiative,
        season,
        status,
        id,
      ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Database update error" });
    res.json({ message: "President message updated successfully" });
  });
};

// Delete
exports.deletePresident = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM president_message WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database delete error" });
    res.json({ message: "President message deleted successfully" });
  });
};
