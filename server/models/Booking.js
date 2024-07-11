// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    passengers: { type: Number, required: true },
    tripType: { type: String, required: true },
    travelClass: { type: String, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
    