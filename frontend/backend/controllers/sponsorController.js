const db = require("../db");
const path = require("path");
const fs = require("fs");

// GET All Sponsors
exports.getAllSponsors = (req, res) => {
  db.query("SELECT * FROM sponsors", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// GET Sponsor by ID
exports.getSponsorById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM sponsors WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send("Not found");
    res.json(result[0]);
  });
};

// CREATE Sponsor
exports.createSponsor = (req, res) => {
  const { name, initiative, season, status } = req.body;
  const image = req.file ? req.file.filename : "";

  const query = `INSERT INTO sponsors (name, image, initiative, season, status) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [name, image, initiative, season, status], (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("Sponsor created");
  });
};

// UPDATE Sponsor
exports.updateSponsor = (req, res) => {
  const { id } = req.params;
  const { name, initiative, season, status } = req.body;
  const image = req.file ? req.file.filename : null;

  const values = image
    ? [name, image, initiative, season, status, id]
    : [name, initiative, season, status, id];

  const query = `
    UPDATE sponsors SET 
    name = ?,
    ${image ? "image = ?," : ""}
    initiative = ?,
    season = ?,
    status = ?
    WHERE id = ?
  `;

  db.query(query, values, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Sponsor updated");
  });
};

// DELETE Sponsor
exports.deleteSponsor = (req, res) => {
  const { id } = req.params;

  db.query("SELECT image FROM sponsors WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) return res.status(404).send("Sponsor not found");

    const filePath = path.join(__dirname, "../uploads/sponsors", result[0].image);
    fs.unlink(filePath, () => {});

    db.query("DELETE FROM sponsors WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).send(err2);
      res.send("Sponsor deleted");
    });
  });
};
