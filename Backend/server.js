// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const connectDB = require('./db');

// Initialize dotenv to use environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();
 
// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/appointments', appointmentRoutes); // Appointment routes

app.get("/", (req, res) => {
  res.send("GET request to ./ is working. The server is connected!");
});

// Port configuration 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
