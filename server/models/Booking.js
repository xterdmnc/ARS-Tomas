const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureDate: { type: Date, required: true },
  departureTime: { type: String, required: true },
  returnDate: { type: Date }, // Return date field, not required by default
  returnTime: { type: String }, // Return time field, not required by default
  passengers: { type: Number, required: true },
  tripType: { type: String, required: true },
  travelClass: { type: String, required: true },
  price: { type: Number, required: true } // Added price field
});

// Pre-save middleware to ensure returnDate and returnTime are set for round trips
bookingSchema.pre('save', function(next) {
  if (this.tripType === 'roundTrip' && (!this.returnDate || !this.returnTime)) {
    return next(new Error('Return date and time are required for round trips'));
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
