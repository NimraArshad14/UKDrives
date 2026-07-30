const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // For production, you may want to restrict this to your specific Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/cars', carRoutes);
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
  res.send('UKDrives Backend API is live and healthy!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
