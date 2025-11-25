const express = require('express');
const User = require('../models/User');
const Group = require('../models/Group');
const Session = require('../models/Session');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require admin role
router.use(authenticate);
router.use(authorize('admin'));

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeModerators = await User.countDocuments({ role: 'moderator', status: 'active' });
    const activeGroups = await Group.countDocuments({ status: 'active' });
    const totalSessions = await Session.countDocuments();

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeModerators,
        activeGroups,
        totalSessions
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-otp').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// Get all moderators
router.get('/moderators', async (req, res) => {
  try {
    const moderators = await User.find({ role: 'moderator' }).select('-otp').sort({ createdAt: -1 });
    res.json({ success: true, moderators });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch moderators' });
  }
});

// Create moderator
router.post('/moderators', async (req, res) => {
  try {
    const { phone, name, email } = req.body;

    const moderator = new User({
      phone,
      name,
      email,
      role: 'moderator',
      isVerified: true
    });

    await moderator.save();

    res.json({ success: true, moderator });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Phone number already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create moderator' });
  }
});

// Update user status
router.put('/users/:userId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { status },
      { new: true }
    ).select('-otp');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user status' });
  }
});

module.exports = router;

