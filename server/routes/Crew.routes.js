// routes/Crew.routes.js
const express = require('express');
const router = express.Router();
const CrewMember = require('../models/CrewMember');

// Get all crew members
router.get('/crew', async (req, res) => {
    try {
        const crew = await CrewMember.find();
        const categorizedCrew = {
            pilots: crew.filter(member => member.category === 'pilots'),
            coPilots: crew.filter(member => member.category === 'coPilots'),
            flightAttendants: crew.filter(member => member.category === 'flightAttendants'),
            groundCrew: crew.filter(member => member.category === 'groundCrew'),
        };
        res.json(categorizedCrew);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add a new crew member
router.post('/crew', async (req, res) => {
    const newCrewMember = new CrewMember(req.body);
    try {
        await newCrewMember.save();
        res.status(201).send(newCrewMember);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a crew member
router.put('/crew/:id', async (req, res) => {
    try {
        const crewMember = await CrewMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(crewMember);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a crew member
router.delete('/crew/:id', async (req, res) => {
    try {
        await CrewMember.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
