// models/Flight.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Flight schema
const flightSchema = new Schema({
    destination: {
        type: String,
        required: true,
        trim: true
    },
    airport: {
        type: String,
        required: true,
        trim: true
    },
    aircraft: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Create the Flight model
const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
