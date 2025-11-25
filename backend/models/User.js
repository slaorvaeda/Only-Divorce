const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  selectedTopics: [{
    type: String
  }],
  language: {
    type: String,
    default: 'en'
  },
  subscription: {
    tier: {
      type: String,
      enum: ['basic', 'premium', 'vip'],
      default: 'basic'
    },
    expiresAt: Date
  },
  profile: {
    age: Number,
    city: String,
    state: String,
    gender: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Hash OTP before saving
userSchema.pre('save', async function(next) {
  if (this.otp && this.otp.code && !this.isModified('otp.code')) {
    return next();
  }
  if (this.otp && this.otp.code) {
    const salt = await bcrypt.genSalt(10);
    this.otp.code = await bcrypt.hash(this.otp.code, salt);
  }
  next();
});

// Method to compare OTP
userSchema.methods.compareOTP = async function(enteredOTP) {
  if (!this.otp || !this.otp.code) return false;
  return await bcrypt.compare(enteredOTP, this.otp.code);
};

// Method to check if OTP is expired
userSchema.methods.isOTPExpired = function() {
  if (!this.otp || !this.otp.expiresAt) return true;
  return new Date() > this.otp.expiresAt;
};

module.exports = mongoose.model('User', userSchema);

