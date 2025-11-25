const express = require('express');
const Session = require('../models/Session');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get user's sessions
router.get('/my-sessions', authenticate, async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [
        { 'participants.user': req.user._id },
        { moderator: req.user._id }
      ]
    })
      .populate('moderator', 'name phone')
      .populate('participants.user', 'name phone')
      .populate('group', 'name topic')
      .sort({ scheduledAt: 1 });

    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch sessions' });
  }
});

// Get upcoming sessions
router.get('/upcoming', authenticate, async (req, res) => {
  try {
    const sessions = await Session.find({
      scheduledAt: { $gte: new Date() },
      status: { $in: ['scheduled', 'ongoing'] },
      $or: [
        { 'participants.user': req.user._id },
        { moderator: req.user._id }
      ]
    })
      .populate('moderator', 'name phone')
      .populate('group', 'name topic')
      .sort({ scheduledAt: 1 })
      .limit(10);

    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch upcoming sessions' });
  }
});

module.exports = router;

