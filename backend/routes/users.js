const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Booking = require('../models/Booking');

// GET /api/users/me/bookings
router.get('/me/bookings', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('User ID from token:', userId);

    const user = await User.findById(userId).select('bookings');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ bookings: user.bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// DELETE /api/users/:userId/bookings/:bookingId
router.delete('/:userId/bookings/:bookingId', async (req, res) => {
  const userId = req.params.userId;
  const bookingId = req.params.bookingId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter out the booking to delete
    user.bookings = user.bookings.filter(booking => booking._id.toString() !== bookingId);

    await user.save();

    res.status(204).end(); // Successful deletion response
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: `Failed to delete booking` });
  }
});

// DELETE /api/users/:userId
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.remove();

    res.status(204).end(); // Successful deletion response
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// GET /api/users (for fetching all users)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('bookings');
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/users (for adding a new user)
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// POST /api/users/:userId/bookings (for adding a new booking to a user)
router.post('/:userId/bookings', async (req, res) => {
  const userId = req.params.userId;
  const { tourName, priceTier, numberOfPeople, currency, totalAmount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newBooking = new Booking({
      user: userId,
      tourName,
      priceTier,
      numberOfPeople,
      currency,
      totalAmount,
      timestamp: new Date(),
    });

    await newBooking.save();
    user.bookings.push(newBooking);
    await user.save();

    res.status(201).json({ booking: newBooking });
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Failed to add booking' });
  }
});

router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    user.email = email;
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// PUT route to update a booking for a specific user
router.put('/:userId/bookings/:bookingId', async (req, res) => {
  const { userId, bookingId } = req.params;
  const { tourName, priceTier, numberOfPeople, currency, totalAmount } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookingToUpdate = user.bookings.find(booking => booking._id == bookingId);

    if (!bookingToUpdate) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking fields
    bookingToUpdate.tourName = tourName;
    bookingToUpdate.priceTier = priceTier;
    bookingToUpdate.numberOfPeople = numberOfPeople;
    bookingToUpdate.currency = currency;
    bookingToUpdate.totalAmount = totalAmount;

    await user.save();

    res.status(200).json(bookingToUpdate);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
