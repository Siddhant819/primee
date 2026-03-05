import express from 'express';
import Message from '../models/Message.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { sendEmail } from '../config/email.js';
import { sanitizeHtml } from '../utils/sanitize.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get all messages (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const messages = await Message.find().populate('repliedBy', 'name');
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get message by ID (admin only)
router.get('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    ).populate('repliedBy', 'name');

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create message (from contact form — public, but inputs are sanitized)
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().trim(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
    }
    const { name, email, phone, subject, message } = req.body;



    const newMessage = new Message({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      status: 'new'
    });

    await newMessage.save();

    // Sanitize all user input before injecting into HTML emails
    const safeName = sanitizeHtml(name);
    const safeSubject = sanitizeHtml(subject);
    const safeMessage = sanitizeHtml(message);
    const safeEmail = sanitizeHtml(email);
    const safePhone = sanitizeHtml(phone || 'Not provided');

    // Confirmation email to sender
    const senderEmailContent = `
      <h2>We Received Your Message</h2>
      <p>Dear ${safeName},</p>
      <p>Thank you for contacting Prime Hospital. We have received your message and will get back to you shortly.</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p>Our team will respond within 24 hours.</p>
      <p>Best regards,<br>Prime Hospital Team</p>
    `;

    await sendEmail(email, 'Message Received', senderEmailContent);

    // Admin notification email (sanitized to prevent stored XSS in admin inbox)
    const adminEmailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `;

    await sendEmail(process.env.EMAIL_USER, `New Message: ${subject.substring(0, 100)}`, adminEmailContent);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Reply to message (admin only — reply content is sanitized)
router.put('/:id/reply', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { repliedMessage } = req.body;

    if (!repliedMessage || !repliedMessage.trim()) {
      return res.status(400).json({ success: false, message: 'Reply message is required' });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        status: 'replied',
        repliedMessage: repliedMessage.trim(),
        repliedBy: req.userId,
        repliedAt: new Date()
      },
      { new: true }
    ).populate('repliedBy', 'name');

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    // Sanitize before inserting into HTML
    const safeName = sanitizeHtml(message.name);
    const safeReply = sanitizeHtml(repliedMessage);

    const replyEmail = `
      <h2>Reply to Your Message</h2>
      <p>Dear ${safeName},</p>
      <p>Thank you for contacting Prime Hospital. Here is our response to your message:</p>
      <p>${safeReply}</p>
      <p>If you have any further questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>Prime Hospital Team</p>
    `;

    await sendEmail(message.email, `Re: ${message.subject}`, replyEmail);

    res.json({ success: true, message: 'Reply sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;