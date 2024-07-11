// routes/Booking.routes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Replace with your Booking model

router.post('/bookings', async (req, res) => {
  try {
    const values = req.body
    
    const data = await Booking.create(values)
    res.json({ success: true, mesage:'Booked successfully!', data });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;