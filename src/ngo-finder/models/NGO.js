const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: String
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  foodPreferences: [{
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan', 'jain', 'halal']
  }],
  capacity: {
    dailyMeals: {
      type: Number,
      required: true
    },
    storage: {
      type: String,
      required: true
    }
  },
  operatingHours: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Add index for search functionality
ngoSchema.index({ 'address.city': 1, 'address.state': 1 });
ngoSchema.index({ foodPreferences: 1 });

const NGO = mongoose.model('NGO', ngoSchema);

module.exports = NGO; 