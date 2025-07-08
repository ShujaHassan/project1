const db = require("../db");
const path = require("path");
const fs = require("fs");

// CREATE Sovapa
const createSovapa = (req, res) => {
  const {
    fullname,
    dept_name_1, dept_title_1,
    dept_name_2, dept_title_2,
    dept_name_3, dept_title_3,
    dept_name_4, dept_title_4,
    dept_name_5, dept_title_5,
    dept_name_6, dept_title_6,
    status
  } = req.body;

  const poster = req.file ? req.file.filename : "";

  const query = `
    INSERT INTO sovapa 
    (
      fullname, poster, 
      dept_name_1, dept_title_1,
      dept_name_2, dept_title_2,
      dept_name_3, dept_title_3,
      dept_name_4, dept_title_4,
      dept_name_5, dept_title_5,
      dept_name_6, dept_title_6,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fullname, poster,
    dept_name_1, dept_title_1,
    dept_name_2, dept_title_2,
    dept_name_3, dept_title_3,
    dept_name_4, dept_title_4,
    dept_name_5, dept_title_5,
    dept_name_6, dept_title_6,
    status
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ message: "Server error during insert" });
    }
    res.status(200).json({ message: "Sovapa member added successfully" });
  });
};

// GET All Sovapa
const getAllSovapa = (req, res) => {
  db.query("SELECT * FROM sovapa", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching data" });
    res.status(200).json(results);
  });
};

// UPDATE Sovapa
const updateSovapa = (req, res) => {
  const id = req.params.id;

  const {
    fullname,
    dept_name_1, dept_title_1,
    dept_name_2, dept_title_2,
    dept_name_3, dept_title_3,
    dept_name_4, dept_title_4,
    dept_name_5, dept_title_5,
    dept_name_6, dept_title_6,
    status
  } = req.body;

  const poster = req.file ? req.file.filename : null;

  if (poster) {
    db.query("SELECT poster FROM sovapa WHERE id = ?", [id], (err, result) => {
      if (!err && result.length > 0 && result[0].poster) {
        const oldPath = path.join(__dirname, "../uploads/sovapa", result[0].poster);
        fs.unlink(oldPath, () => {});
      }
    });
  }

  const query = `
    UPDATE sovapa SET 
      fullname = ?, 
      ${poster ? "poster = ?, " : ""}
      dept_name_1 = ?, dept_title_1 = ?,
      dept_name_2 = ?, dept_title_2 = ?,
      dept_name_3 = ?, dept_title_3 = ?,
      dept_name_4 = ?, dept_title_4 = ?,
      dept_name_5 = ?, dept_title_5 = ?,
      dept_name_6 = ?, dept_title_6 = ?,
      status = ?
    WHERE id = ?
  `;

  const values = poster
    ? [
        fullname, poster,
        dept_name_1, dept_title_1,
        dept_name_2, dept_title_2,
        dept_name_3, dept_title_3,
        dept_name_4, dept_title_4,
        dept_name_5, dept_title_5,
        dept_name_6, dept_title_6,
        status, id
      ]
    : [
        fullname,
        dept_name_1, dept_title_1,
        dept_name_2, dept_title_2,
        dept_name_3, dept_title_3,
        dept_name_4, dept_title_4,
        dept_name_5, dept_title_5,
        dept_name_6, dept_title_6,
        status, id
      ];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ message: "Update failed" });
    }
    res.status(200).json({ message: "Sovapa updated successfully" });
  });
};

// DELETE Sovapa
const deleteSovapa = (req, res) => {
  const id = req.params.id;

  db.query("SELECT poster FROM sovapa WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: "Not found" });

    const filePath = path.join(__dirname, "../uploads/sovapa", result[0].poster);
    fs.unlink(filePath, () => {});

    db.query("DELETE FROM sovapa WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json({ message: "Delete failed" });
      res.status(200).json({ message: "Deleted successfully" });
    });
  });
};

module.exports = {
  createSovapa,
  getAllSovapa,
  updateSovapa,
  deleteSovapa
};
