const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateOTP, getOTPExpiration, sendOTP } = require('../utils/otp');
const { generateToken } = require('../utils/jwt');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Send OTP
router.post('/send-otp', [
  body('phone').isMobilePhone('en-IN').withMessage('Valid Indian phone number required'),
  body('role').optional().isIn(['user', 'moderator', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { phone, role = 'user' } = req.body;
    const otp = generateOTP();
    const expiresAt = getOTPExpiration();

    let user = await User.findOne({ phone });
    
    if (!user) {
      // New user - create with the requested role
      user = new User({
        phone,
        role,
        otp: { code: otp, expiresAt, intendedRole: role },
        isVerified: false
      });
    } else {
      // Existing user - verify they're logging in with the correct role
      if (user.role !== role) {
        return res.status(403).json({ 
          success: false, 
          message: `This phone number is registered as a ${user.role}. Please use the ${user.role} login.` 
        });
      }
      user.otp = { code: otp, expiresAt, intendedRole: role };
      user.isVerified = false;
    }

    await user.save();

    // Send OTP (in production, use Twilio)
    await sendOTP(phone, otp);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      // In development, return OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp })
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP and login
router.post('/verify-otp', [
  body('phone').isMobilePhone('en-IN'),
  body('otp').isLength({ min: 6, max: 6 }).isNumeric(),
  body('role').optional().isIn(['user', 'moderator', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { phone, otp, role } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify role matches (if provided)
    if (role && user.role !== role) {
      return res.status(403).json({ 
        success: false, 
        message: `This phone number is registered as a ${user.role}. Please use the ${user.role} login.` 
      });
    }

    if (!user.otp || !user.otp.code) {
      return res.status(400).json({ success: false, message: 'No OTP found. Please request a new one.' });
    }

    if (user.isOTPExpired()) {
      return res.status(400).json({ success: false, message: 'OTP expired. Please request a new one.' });
    }

    const isMatch = await user.compareOTP(otp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP verified successfully
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

// Get current user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-otp');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, email, language, profile } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (language) user.language = language;
    if (profile) user.profile = { ...user.profile, ...profile };

    await user.save();

    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

module.exports = router;

