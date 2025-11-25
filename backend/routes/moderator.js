const express = require('express');
const Group = require('../models/Group');
const Session = require('../models/Session');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require moderator or admin role
router.use(authenticate);
router.use(authorize('moderator', 'admin'));

// Get moderator dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const myGroups = await Group.countDocuments({ moderator: req.user._id });
    const pendingRequests = await Group.countDocuments({
      moderator: req.user._id,
      status: 'active',
      'members.0': { $exists: true }
    });
    const upcomingSessions = await Session.countDocuments({
      moderator: req.user._id,
      scheduledAt: { $gte: new Date() },
      status: { $in: ['scheduled', 'ongoing'] }
    });

    res.json({
      success: true,
      stats: {
        myGroups,
        pendingRequests,
        upcomingSessions
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
});

// Get moderator's groups
router.get('/groups', async (req, res) => {
  try {
    const groups = await Group.find({ moderator: req.user._id })
      .populate('members.user', 'name phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch groups' });
  }
});

// Create a new group
router.post('/groups', async (req, res) => {
  try {
    const { name, topic, description, maxMembers = 20 } = req.body;

    const group = new Group({
      name,
      topic,
      description,
      moderator: req.user._id,
      maxMembers
    });

    await group.save();
    await group.populate('moderator', 'name phone');

    res.json({ success: true, group });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create group' });
  }
});

// Get pending join requests for moderator's groups
router.get('/pending-requests', async (req, res) => {
  try {
    // Get all groups moderated by this user
    const groups = await Group.find({ moderator: req.user._id })
      .populate({
        path: 'members.user',
        select: 'name phone email profile'
      })
      .sort({ createdAt: -1 });

    // For now, we'll return all members as "pending" if they need approval
    // In a real system, you'd have a separate joinRequests array
    const pendingRequests = [];
    groups.forEach(group => {
      group.members.forEach(member => {
        pendingRequests.push({
          id: member._id,
          userId: member.user._id,
          userName: member.user.name || member.user.phone,
          userPhone: member.user.phone,
          userEmail: member.user.email,
          groupId: group._id,
          groupName: group.name,
          groupTopic: group.topic,
          requestedAt: member.joinedAt
        });
      });
    });

    res.json({ success: true, requests: pendingRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch pending requests' });
  }
});

module.exports = router;

