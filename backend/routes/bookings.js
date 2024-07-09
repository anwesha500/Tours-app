const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// POST /api/bookings
router.post('/', authMiddleware, async (req, res) => {
  const { tourName, priceTier, numberOfPeople, currency, totalAmount } = req.body;
  const userId = req.user.userId; // Extract userId from authenticated user

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the booking to the user's bookings array
    user.bookings.push({
      tourName,
      priceTier,
      numberOfPeople,
      currency,
      totalAmount,
      timestamp: new Date(),
    });

    // Save the user document with the new booking
    await user.save();

    res.status(201).json({ message: 'Booking created successfully', user });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

module.exports = router;
