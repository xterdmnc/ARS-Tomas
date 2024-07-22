// routes/Flight.routes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// Fetch all flights
router.get('/flight', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new flight
router.post('/flight', async (req, res) => {
    const { destination, airport, aircraft } = req.body;
    const newFlight = new Flight({ destination, airport, aircraft });
    try {
        const savedFlight = await newFlight.save();
        res.status(201).json(savedFlight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a flight
router.put('/flight/:id', async (req, res) => {
    const { id } = req.params;
    const { destination, airport, aircraft } = req.body;
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(id, { destination, airport, aircraft }, { new: true });
        if (!updatedFlight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.status(200).json(updatedFlight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a flight
router.delete('/flight/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFlight = await Flight.findByIdAndDelete(id);
        if (!deletedFlight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.status(200).json({ message: 'Flight deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
