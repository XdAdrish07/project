const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from all public directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'ngo-finder', 'public')));
app.use(express.static(path.join(__dirname, 'donor-dashboard', 'public')));

// NGO Routes
app.use('/api/ngos', require('./ngo-finder/routes/ngoRoutes'));

// AI Quality Food Check Routes
app.use('/api/food-quality', require('./ngo-finder/routes/foodQualityRoutes'));

// Donation Routes
app.use('/api/donations', require('./donor-dashboard/routes/donationRoutes'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jeevan-aahar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
app.get('/api/donations', async (req, res) => {
    // Replace this with actual logic to fetch donations from your database
    const donations = [
        { id: 1, status: 'pending' },
        { id: 2, status: 'completed' }
    ];
    res.json(donations);
});