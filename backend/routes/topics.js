const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const SUPPORT_TOPICS = [
  { id: 'women-support', name: 'Women Support', description: 'Safe, guided spaces hosted by expert moderators.' },
  { id: 'men-support', name: 'Men Support', description: 'Peer circles focused on emotional resilience.' },
  { id: 'child-custody', name: 'Child Custody', description: 'Legal and psychological support for parents.' },
  { id: 'domestic-violence', name: 'Domestic Violence', description: 'Immediate assistance with protection plans.' },
  { id: 'alimony-finance', name: 'Alimony & Finance', description: 'Financial planning with certified advisors.' },
  { id: 'nri-assistance', name: 'NRI Assistance', description: 'Cross-border legal strategies and guidance.' },
  { id: 'mental-wellness', name: 'Mental Wellness', description: 'Therapy-led circles for anxiety, burnout, and panic.' },
  { id: 'legal-strategy', name: 'Legal Strategy', description: 'One-on-one prep for hearings, mediation, and FIR filings.' },
  { id: 'property-asset', name: 'Property & Asset', description: 'Guidance on joint assets, gold, and real-estate division.' },
  { id: 'parenting-support', name: 'Parenting Support', description: 'Co-parenting playbooks and child therapy referrals.' },
  { id: 'lgbtqia', name: 'LGBTQIA+', description: 'Supportive legal and emotional aid for queer partners.' },
  { id: 'safety-planning', name: 'Safety Planning', description: 'Rapid-response teams for relocation and protection orders.' },
  { id: 'career-restart', name: 'Career & Restart', description: 'Mentorship for financial independence and upskilling.' }
];

// Get all support topics
router.get('/', authenticate, (req, res) => {
  res.json({ success: true, topics: SUPPORT_TOPICS });
});

// Get topic by ID
router.get('/:id', authenticate, (req, res) => {
  const topic = SUPPORT_TOPICS.find(t => t.id === req.params.id);
  if (!topic) {
    return res.status(404).json({ success: false, message: 'Topic not found' });
  }
  res.json({ success: true, topic });
});

module.exports = router;

