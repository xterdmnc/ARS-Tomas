// app.js or server.js
const express = require('express');
const cors = require('cors');
const app = express();
const ConnectToDatabase = require('../config/db'); // Replace with your database connection setup
const UserRoute = require('../routes/User.routes'); // Replace with your routes setup
const BookingsRoute = require('../routes/Booking.routes')

// CORS setup
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());

// Connect to database
ConnectToDatabase(); // Ensure this function initializes your database connection

// Example default route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    });
});

app.use('/api', UserRoute);

app.use('/api', BookingsRoute);

module.exports = app;
