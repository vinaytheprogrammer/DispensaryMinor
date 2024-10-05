// backend/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => {
    // Clear token logic (client-side)
    res.status(200).json({ message: 'Logged out successfully' });
  });
module.exports = router;
