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

router.get('/feedback', async (req, res) => {
  try {
      const feedback = await Feedback.find();
      res.status(200).json(feedback);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


module.exports = router;
