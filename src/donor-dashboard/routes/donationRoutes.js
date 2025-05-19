const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Donation Schema
const donationSchema = new mongoose.Schema({
    donorName: String,
    donorEmail: String,
    foodType: String,
    quantity: Number,
    pickupAddress: String,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    },
    timestamp: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// Create a new donation
router.post('/', async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        res.status(201).json(donation);
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ message: 'Error creating donation' });
    }
});

// Get all donations
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ timestamp: -1 });
        res.json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Error fetching donations' });
    }
});

// Update donation status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(donation);
    } catch (error) {
        console.error('Error updating donation status:', error);
        res.status(500).json({ message: 'Error updating donation status' });
    }
});

module.exports = router; 