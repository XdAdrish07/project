const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/food-quality';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Food Quality Check Schema
const foodQualitySchema = new mongoose.Schema({
    imagePath: String,
    qualityScore: Number,
    freshnessScore: Number,
    contaminationScore: Number,
    timestamp: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['safe', 'unsafe', 'needs_attention'],
        default: 'needs_attention'
    }
});

const FoodQuality = mongoose.model('FoodQuality', foodQualitySchema);

// Upload image and analyze food quality
router.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Here you would integrate with your AI model
        // For now, we'll simulate the analysis
        const analysis = {
            qualityScore: Math.random() * 100,
            freshnessScore: Math.random() * 100,
            contaminationScore: Math.random() * 100
        };

        // Determine status based on scores
        let status = 'needs_attention';
        if (analysis.qualityScore > 70 && analysis.freshnessScore > 70 && analysis.contaminationScore < 30) {
            status = 'safe';
        } else if (analysis.qualityScore < 40 || analysis.freshnessScore < 40 || analysis.contaminationScore > 60) {
            status = 'unsafe';
        }

        // Save analysis results
        const foodQuality = new FoodQuality({
            imagePath: req.file.path,
            qualityScore: analysis.qualityScore,
            freshnessScore: analysis.freshnessScore,
            contaminationScore: analysis.contaminationScore,
            status: status
        });

        await foodQuality.save();

        res.json({
            message: 'Food quality analysis completed',
            results: {
                qualityScore: analysis.qualityScore,
                freshnessScore: analysis.freshnessScore,
                contaminationScore: analysis.contaminationScore,
                status: status
            }
        });
    } catch (error) {
        console.error('Error analyzing food quality:', error);
        res.status(500).json({ message: 'Error analyzing food quality' });
    }
});

// Get analysis history
router.get('/history', async (req, res) => {
    try {
        const history = await FoodQuality.find()
            .sort({ timestamp: -1 })
            .limit(10);
        
        res.json(history);
    } catch (error) {
        console.error('Error fetching analysis history:', error);
        res.status(500).json({ message: 'Error fetching analysis history' });
    }
});

// Food Quality Check endpoint
router.post('/check', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Here you would typically call your AI model for food quality check
        // For now, we'll return a mock response
        const mockResponse = {
            quality: 'good',
            confidence: 0.85,
            suggestions: ['Food appears fresh and properly stored'],
            imagePath: req.file.path
        };

        res.json(mockResponse);
    } catch (error) {
        console.error('Error in food quality check:', error);
        res.status(500).json({ message: 'Error processing food quality check' });
    }
});

module.exports = router; 