// paymentRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the Payment schema
const paymentSchema = new mongoose.Schema({
  departureAirport: String,
  arrivalAirport: String,
  passengers: Number,
  tripType: String,
  travelClass: String,
  price: Number,
  debitAccount: String,
  creditAccount: String,
  bookingDetails: Object, // Optionally store the entire booking details
  paymentDate: { type: Date, default: Date.now }
});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema, 'payments');

// Payment submission route
router.post('/api/payments', async (req, res) => {
  const { departureAirport, arrivalAirport, passengers, tripType, travelClass, price, debitAccount, creditAccount, bookingDetails } = req.body;

  try {
    const payment = new Payment({
      departureAirport,
      arrivalAirport,
      passengers,
      tripType,
      travelClass,
      price,
      debitAccount,
      creditAccount,
      bookingDetails
    });

    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
