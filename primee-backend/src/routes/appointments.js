import express from 'express';
import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { sendEmail } from '../config/email.js';
import { sanitizeHtml } from '../utils/sanitize.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get all appointments (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('confirmedBy', 'name');

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get appointments for current user
router.get('/user/me', authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.userId })
      .populate('patientId');

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get appointment by ID (authenticated — admin or owner)
router.get('/:id', authenticate, authorize(['admin', 'user']), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId')
      .populate('confirmedBy', 'name');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Non-admin users can only view their own appointments
    if (req.userRole !== 'admin' && appointment.patientId?.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create appointment (public, but with sanitized inputs)
router.post('/', [
  body('patientName').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('appointmentDate').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').trim().notEmpty().withMessage('Time slot is required'),
  body('reason').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
    }

    const { patientName, email, phone, department, appointmentDate, timeSlot, reason } = req.body;



    const appointment = new Appointment({
      patientId: null,
      patientName: patientName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      department: department.trim(),
      appointmentDate,
      timeSlot: timeSlot.trim(),
      reason: reason?.trim() || '',
      status: 'pending'
    });

    await appointment.save();

    // Sanitize all user-supplied values before injecting into HTML email
    const safeName = sanitizeHtml(patientName);
    const safeDept = sanitizeHtml(department);
    const safeReason = sanitizeHtml(reason || 'General Checkup');
    const safeDate = sanitizeHtml(new Date(appointmentDate).toLocaleDateString());
    const safeTime = sanitizeHtml(timeSlot);

    const emailContent = `
      <h2>Appointment Confirmation</h2>
      <p>Dear ${safeName},</p>
      <p>Your appointment request has been received. We will contact you shortly to confirm.</p>
      <h3>Appointment Details:</h3>
      <ul>
        <li><strong>Department:</strong> ${safeDept}</li>
        <li><strong>Date:</strong> ${safeDate}</li>
        <li><strong>Time:</strong> ${safeTime}</li>
        <li><strong>Reason:</strong> ${safeReason}</li>
      </ul>
      <p>Thank you for choosing Prime Hospital!</p>
    `;

    await sendEmail(email, 'Appointment Request Received', emailContent);

    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Confirm appointment (admin only)
router.put('/:id/confirm', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { notes } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    let patientId = appointment.patientId;

    // Create patient if one doesn't exist
    if (!patientId) {
      let patient = await Patient.findOne({ email: appointment.email });

      if (!patient) {
        patient = new Patient({
          fullName: appointment.patientName,
          email: appointment.email,
          phone: appointment.phone,
          dateOfBirth: new Date(),
          gender: 'Other',
          address: '',
          medicalHistory: '',
          bloodGroup: null,
          userId: req.userId,
          createdBy: req.userId,
        });

        await patient.save();
      }

      patientId = patient._id;
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'confirmed',
        patientId: patientId,
        notes: notes?.trim() || '',
        confirmedBy: req.userId,
        confirmedAt: new Date()
      },
      { new: true }
    ).populate('patientId');

    // Send sanitized confirmation email
    const patientIDStr = sanitizeHtml(updatedAppointment.patientId?.patientId || 'N/A');
    const safeName = sanitizeHtml(appointment.patientName);
    const safeDept = sanitizeHtml(appointment.department);
    const safeDate = sanitizeHtml(new Date(appointment.appointmentDate).toLocaleDateString());
    const safeTime = sanitizeHtml(appointment.timeSlot);
    const safeNotes = notes ? sanitizeHtml(notes) : '';

    const emailContent = `
      <h2>Appointment Confirmed!</h2>
      <p>Dear ${safeName},</p>
      <p>Your appointment has been confirmed by Prime Hospital.</p>
      <h3>Confirmed Appointment Details:</h3>
      <ul>
        <li><strong>Department:</strong> ${safeDept}</li>
        <li><strong>Date:</strong> ${safeDate}</li>
        <li><strong>Time:</strong> ${safeTime}</li>
        <li><strong>Your Patient ID:</strong> <strong>${patientIDStr}</strong></li>
        ${safeNotes ? `<li><strong>Notes:</strong> ${safeNotes}</li>` : ''}
      </ul>
      <p>Please arrive 15 minutes before your appointment time.</p>
      <p>Thank you for choosing Prime Hospital!</p>
    `;

    await sendEmail(appointment.email, 'Appointment Confirmed', emailContent);

    res.json({
      success: true,
      message: `Appointment confirmed! Patient ID: ${updatedAppointment.patientId?.patientId || 'N/A'}`,
      appointment: updatedAppointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Cancel appointment (authenticated — admin or own appointment only)
router.put('/:id/cancel', authenticate, authorize(['admin', 'user']), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Non-admin users can only cancel their own appointments
    if (req.userRole !== 'admin' && appointment.patientId?.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;