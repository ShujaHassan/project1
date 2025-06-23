// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // mongoose model

router.post('/add', async (req, res) => {
  try {
    const { name, email, username, password, role, status } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({ name, email, username, password, role, status });
    await newUser.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
