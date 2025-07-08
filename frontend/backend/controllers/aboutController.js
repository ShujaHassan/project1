const db = require("../db");

// GET all
exports.getAllAbout = (req, res) => {
  db.query("SELECT * FROM about", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// GET by ID
exports.getAboutById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM about WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send("Not found");
    res.json(result[0]);
  });
};

// CREATE
exports.addAbout = (req, res) => {
  const data = req.body;
  const sql = `
    INSERT INTO about 
    (heading, description, tab_1_heading, tab_1_title, tab_2_heading, tab_2_title, tab_3_heading, tab_3_title, tab_4_heading, tab_4_title, initiative, season, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.heading,
    data.description,
    data.tab_1_heading,
    data.tab_1_title,
    data.tab_2_heading,
    data.tab_2_title,
    data.tab_3_heading,
    data.tab_3_title,
    data.tab_4_heading,
    data.tab_4_title,
    data.initiative,
    data.season,
    data.status,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("About entry created");
  });
};

// UPDATE
exports.updateAbout = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const sql = `
    UPDATE about SET 
    heading=?, description=?, tab_1_heading=?, tab_1_title=?, 
    tab_2_heading=?, tab_2_title=?, tab_3_heading=?, tab_3_title=?, 
    tab_4_heading=?, tab_4_title=?, initiative=?, season=?, status=?
    WHERE id=?
  `;

  const values = [
    data.heading,
    data.description,
    data.tab_1_heading,
    data.tab_1_title,
    data.tab_2_heading,
    data.tab_2_title,
    data.tab_3_heading,
    data.tab_3_title,
    data.tab_4_heading,
    data.tab_4_title,
    data.initiative,
    data.season,
    data.status,
    id,
  ];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).send(err);
    res.send("About entry updated");
  });
};

// DELETE
exports.deleteAbout = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM about WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("About entry deleted");
  });
};
