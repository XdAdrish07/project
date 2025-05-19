// routes/ngoRoutes.js
const express = require('express');
const router = express.Router();
const Ngo = require('../models/Ngo');

// Create a new NGO
router.post('/', async (req, res) => {
  try {
    const newNgo = new Ngo(req.body);
    await newNgo.save();
    res.status(201).json(newNgo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await Ngo.find();
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
