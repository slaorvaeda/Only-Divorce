const express = require('express');
const Message = require('../models/Message');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get messages between users or in a group
router.get('/', authenticate, async (req, res) => {
  try {
    const { receiverId, groupId } = req.query;
    let query = {};

    if (groupId) {
      query.group = groupId;
    } else if (receiverId) {
      query.$or = [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id }
      ];
    } else {
      // Get all conversations for the user
      query.$or = [
        { sender: req.user._id },
        { receiver: req.user._id }
      ];
    }

    const messages = await Message.find(query)
      .populate('sender', 'name phone')
      .populate('receiver', 'name phone')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// Send a message
router.post('/', authenticate, async (req, res) => {
  try {
    const { receiverId, groupId, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Message content required' });
    }

    const message = new Message({
      sender: req.user._id,
      receiver: receiverId || undefined,
      group: groupId || undefined,
      content: content.trim()
    });

    await message.save();
    await message.populate('sender', 'name phone');
    await message.populate('receiver', 'name phone');

    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

module.exports = router;

