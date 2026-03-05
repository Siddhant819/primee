import express from 'express';
import User from '../models/User.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get current user (authenticated)
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update user profile (authenticated — own profile only)
router.put('/me', authenticate, async (req, res) => {
  try {
    // Whitelist allowed fields — prevent role escalation or field injection
    const { name, phone, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user by ID (authenticated + admin only)
router.get('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;