const db = require("../db");
const path = require("path");
const fs = require("fs");

// CREATE Facility
exports.createFacility = (req, res) => {
  const { name, title, status } = req.body;
  const image = req.file ? req.file.filename : "";

  const sql = `INSERT INTO facilities (name, title, image, status) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, title, image, status], (err) => {
    if (err) return res.status(500).json({ message: "Insert failed", error: err });
    res.status(200).json({ message: "Facility created successfully" });
  });
};

// GET All Facilities
exports.getAllFacilities = (req, res) => {
  db.query("SELECT * FROM facilities", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// GET Facility by ID
exports.getFacilityById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM facilities WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send("Not found");
    res.json(result[0]);
  });
};

// UPDATE Facility
exports.updateFacility = (req, res) => {
  const { id } = req.params;
  const { name, title, status } = req.body;
  const image = req.file ? req.file.filename : null;

  const values = image
    ? [name, title, image, status, id]
    : [name, title, status, id];

  const sql = `
    UPDATE facilities SET 
    name = ?, 
    title = ?, 
    ${image ? "image = ?, " : ""}
    status = ?
    WHERE id = ?
  `.replace(", status = ?", "status = ?"); // to fix double commas if no image

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err });
    res.json({ message: "Facility updated successfully" });
  });
};

// DELETE Facility
exports.deleteFacility = (req, res) => {
  const { id } = req.params;

  db.query("SELECT image FROM facilities WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) return res.status(404).send("Facility not found");

    const filePath = path.join(__dirname, "../uploads/facilities", result[0].image);
    fs.unlink(filePath, () => {}); // async delete file

    db.query("DELETE FROM facilities WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).send("Delete failed");
      res.send("Facility deleted successfully");
    });
  });
};
