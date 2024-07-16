const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Replace with your Booking model

// Create a booking
router.post('/bookings', async (req, res) => {
  try {
    const values = req.body;
    const data = await Booking.create(values);
    res.json({ success: true, message: 'Booked successfully!', data });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Fetch all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings from the database
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Delete a booking by ID
router.delete('/bookings/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    await Booking.findByIdAndDelete(bookingId); // Delete the booking from the database
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
