const express = require('express');
const Group = require('../models/Group');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get all groups (filtered by topic if provided)
router.get('/', authenticate, async (req, res) => {
  try {
    const { topic, status = 'active' } = req.query;
    const query = { status };
    if (topic) query.topic = topic;

    const groups = await Group.find(query)
      .populate('moderator', 'name phone')
      .populate('members.user', 'name phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch groups' });
  }
});

// Get user's groups
router.get('/my-groups', authenticate, async (req, res) => {
  try {
    const groups = await Group.find({
      'members.user': req.user._id
    })
      .populate('moderator', 'name phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch your groups' });
  }
});

// Join a group
router.post('/:groupId/join', authenticate, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    if (group.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Group is not active' });
    }

    // Check if already a member
    const isMember = group.members.some(m => m.user.toString() === req.user._id.toString());
    if (isMember) {
      return res.status(400).json({ success: false, message: 'Already a member' });
    }

    // Check if group is full
    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ success: false, message: 'Group is full' });
    }

    group.members.push({ user: req.user._id });
    if (group.members.length >= group.maxMembers) {
      group.status = 'full';
    }

    await group.save();

    res.json({ success: true, message: 'Joined group successfully', group });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to join group' });
  }
});

// Leave a group
router.post('/:groupId/leave', authenticate, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    group.members = group.members.filter(m => m.user.toString() !== req.user._id.toString());
    
    if (group.status === 'full' && group.members.length < group.maxMembers) {
      group.status = 'active';
    }

    await group.save();

    res.json({ success: true, message: 'Left group successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to leave group' });
  }
});

module.exports = router;

