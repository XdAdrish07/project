const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// NGO Schema
const ngoSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    registrationNumber: String,
    description: String,
    timestamp: { type: Date, default: Date.now }
});

const NGO = mongoose.model('NGO', ngoSchema);

// Create a new NGO
router.post('/', async (req, res) => {
    try {
        const ngo = new NGO(req.body);
        await ngo.save();
        res.status(201).json(ngo);
    } catch (error) {
        console.error('Error creating NGO:', error);
        res.status(500).json({ message: 'Error creating NGO' });
    }
});

// Get all NGOs
router.get('/', async (req, res) => {
    try {
        const ngos = await NGO.find().sort({ timestamp: -1 });
        res.json(ngos);
    } catch (error) {
        console.error('Error fetching NGOs:', error);
        res.status(500).json({ message: 'Error fetching NGOs' });
    }
});

// Get NGO by ID
router.get('/:id', async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id);
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.json(ngo);
    } catch (error) {
        console.error('Error fetching NGO:', error);
        res.status(500).json({ message: 'Error fetching NGO' });
    }
});

// Update NGO
router.put('/:id', async (req, res) => {
    try {
        const ngo = await NGO.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.json(ngo);
    } catch (error) {
        console.error('Error updating NGO:', error);
        res.status(500).json({ message: 'Error updating NGO' });
    }
});

// Delete NGO
router.delete('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    await ngo.remove();
    res.json({ message: 'NGO deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search NGOs by location
router.get('/search/location', async (req, res) => {
  try {
    const { city, state } = req.query;
    const query = {};
    
    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }
    if (state) {
      query['address.state'] = new RegExp(state, 'i');
    }
    
    const ngos = await NGO.find(query);
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search NGOs by food preferences
router.get('/search/preferences', async (req, res) => {
  try {
    const { preferences } = req.query;
    if (!preferences) {
      return res.status(400).json({ message: 'Preferences parameter is required' });
    }
    
    const preferenceArray = preferences.split(',').map(p => p.trim());
    const ngos = await NGO.find({
      foodPreferences: { $in: preferenceArray }
    });
    
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 