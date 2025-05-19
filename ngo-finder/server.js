const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const NGO = require('./models/NGO');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ngo-finder')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/ngos', async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching NGOs' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const ngo = new NGO(req.body);
    await ngo.save();
    res.status(201).send('NGO registered');
  } catch (error) {
    res.status(400).json({ error: 'Error registering NGO' });
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
