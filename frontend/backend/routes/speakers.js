import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ADD SPEAKER
router.post('/', async (req, res) => {
  try {
    const { name, season, initiative, role, facebook, instagram, youtube, description } = req.body;
    const sql = `
      INSERT INTO speakers (name, season, initiative, role, facebook, instagram, youtube, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [name, season, initiative, role, facebook, instagram, youtube, description]);
    res.status(200).json({ message: 'Speaker added successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL SPEAKERS
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM speakers ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EDIT SPEAKER
router.put('/:id', async (req, res) => {
  try {
    const { name, season, initiative, role, facebook, instagram, youtube, description } = req.body;
    const { id } = req.params;
    const sql = `
      UPDATE speakers 
      SET name=?, season=?, initiative=?, role=?, facebook=?, instagram=?, youtube=?, description=?
      WHERE id=?`;
    await pool.execute(sql, [name, season, initiative, role, facebook, instagram, youtube, description, id]);
    res.json({ message: 'Speaker updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
