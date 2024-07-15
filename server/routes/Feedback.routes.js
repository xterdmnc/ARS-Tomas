const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Replace with your Feedback model

router.post('/feedback', async (req, res) => {
  try {
    const values = req.body
   const feedback = await Feedback.create(values)
   console.log(feedback)
    res.json({ success: true, message: 'Feedback submitted successfully!', data: feedback });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
