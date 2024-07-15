// app.js or server.js
const express = require('express');
const cors = require('cors');
const app = express();
const ConnectToDatabase = require('../config/db');
const UserRoute = require('../routes/User.routes');
const BookingsRoute = require('../routes/Booking.routes');
const FeedbackRoute = require('../routes/Feedback.routes');
const PaymentRoute = require('../routes/Payment.routes');

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

app.use('/api', FeedbackRoute); // Use Feedback route

app.use('/api', PaymentRoute);

module.exports = app;
