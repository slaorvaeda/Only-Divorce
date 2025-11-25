const express = require('express');
const User = require('../models/User');
const Group = require('../models/Group');
const Session = require('../models/Session');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get user dashboard stats
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const activeGroups = await Group.countDocuments({
      'members.user': req.user._id,
      status: 'active'
    });

    const unreadMessages = await require('../models/Message').countDocuments({
      receiver: req.user._id,
      isRead: false
    });

    const upcomingSessions = await Session.countDocuments({
      'participants.user': req.user._id,
      scheduledAt: { $gte: new Date() },
      status: { $in: ['scheduled', 'ongoing'] }
    });

    res.json({
      success: true,
      stats: {
        activeGroups,
        unreadMessages,
        upcomingSessions
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
});

// Update selected topics
router.put('/topics', authenticate, async (req, res) => {
  try {
    const { topics } = req.body;
    const user = await User.findById(req.user._id);
    user.selectedTopics = topics || [];
    await user.save();

    res.json({ success: true, message: 'Topics updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update topics' });
  }
});

// Get all users (admin only)
router.get('/all', authenticate, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-otp').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

module.exports = router;

