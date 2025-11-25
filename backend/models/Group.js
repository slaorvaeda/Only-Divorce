const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    enum: [
      'Women Support',
      'Men Support',
      'Child Custody',
      'Domestic Violence',
      'Alimony & Finance',
      'NRI Assistance',
      'Mental Wellness',
      'Legal Strategy',
      'Property & Asset',
      'Parenting Support',
      'LGBTQIA+',
      'Safety Planning',
      'Career & Restart'
    ]
  },
  description: {
    type: String,
    trim: true
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  meetingLink: {
    type: String,
    trim: true
  },
  meetingTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'full'],
    default: 'active'
  },
  maxMembers: {
    type: Number,
    default: 20
  },
  settings: {
    isPrivate: {
      type: Boolean,
      default: false
    },
    allowNewMembers: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
groupSchema.index({ topic: 1, status: 1 });
groupSchema.index({ moderator: 1 });

module.exports = mongoose.model('Group', groupSchema);

