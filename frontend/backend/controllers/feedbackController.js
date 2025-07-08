const db = require("../db");
const path = require("path");
const fs = require("fs");

// CREATE
exports.addFeedback = (req, res) => {
  const { name, country, text, initiative, season, status } = req.body;
  const img = req.file ? req.file.filename : "";

  const sql = `
    INSERT INTO feedback (name, country, img, text, initiative, season, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [name, country, img, text, initiative, season, status];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send("Error inserting feedback");
    res.status(201).send("Feedback added successfully");
  });
};

// READ ALL
exports.getAllFeedback = (req, res) => {
  db.query("SELECT * FROM feedback", (err, result) => {
    if (err) return res.status(500).send("Failed to fetch feedback");
    res.json(result);
  });
};

// READ BY ID
exports.getFeedbackById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM feedback WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send("Error fetching feedback");
    if (result.length === 0) return res.status(404).send("Feedback not found");
    res.json(result[0]);
  });
};

// UPDATE
exports.updateFeedback = (req, res) => {
  const { id } = req.params;
  const { name, country, text, initiative, season, status } = req.body;
  const img = req.file ? req.file.filename : null;

  let sql, values;
  if (img) {
    sql = `
      UPDATE feedback SET 
      name=?, country=?, img=?, text=?, initiative=?, season=?, status=?
      WHERE id=?
    `;
    values = [name, country, img, text, initiative, season, status, id];
  } else {
    sql = `
      UPDATE feedback SET 
      name=?, country=?, text=?, initiative=?, season=?, status=?
      WHERE id=?
    `;
    values = [name, country, text, initiative, season, status, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).send("Error updating feedback");
    res.send("Feedback updated successfully");
  });
};

// DELETE
exports.deleteFeedback = (req, res) => {
  const { id } = req.params;

  db.query("SELECT img FROM feedback WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) return res.status(404).send("Feedback not found");

    const filePath = path.join(__dirname, "../uploads/feedback", result[0].img);
    fs.unlink(filePath, () => {});

    db.query("DELETE FROM feedback WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).send("Failed to delete feedback");
      res.send("Feedback deleted successfully");
    });
  });
};
