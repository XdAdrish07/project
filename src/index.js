const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!require('fs').existsSync(uploadsDir)) {
    require('fs').mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'ngo-finder', 'public')));
app.use(express.static(path.join(__dirname, 'donor-dashboard', 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jeevan-aahar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// NGO Routes
const ngoRoutes = require('./ngo-finder/routes/ngoRoutes');
app.use('/api/ngos', ngoRoutes);

// Donation Routes
const donationRoutes = require('./donor-dashboard/routes/donationRoutes');
app.use('/api/donations', donationRoutes);

// Food Quality Routes
const foodQualityRoutes = require('./ngo-finder/routes/foodQualityRoutes');
app.use('/api/food-quality', foodQualityRoutes);

// Serve HTML files
app.get('/ngo-finder', (req, res) => {
    res.sendFile(path.join(__dirname, 'ngo-finder', 'public', 'index.html'));
});

app.get('/donor-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'donor-dashboard', 'public', 'index.html'));
});

app.get('/food-quality', (req, res) => {
    res.sendFile(path.join(__dirname, 'ngo-finder', 'public', 'food-quality.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 