import express from 'express';
import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { sendEmail } from '../config/email.js';

const router = express.Router();

// Get all appointments (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('confirmedBy', 'name');
    
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get appointments for current user
router.get('/user/me', authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.userId })
      .populate('patientId');
    
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get appointment by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId')
      .populate('confirmedBy', 'name');
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create appointment
router.post('/', async (req, res) => {
  try {
    const { patientName, email, phone, department, appointmentDate, timeSlot, reason } = req.body;

    if (!patientName || !email || !phone || !department || !appointmentDate || !timeSlot) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const appointment = new Appointment({
      patientId: null,
      patientName,
      email,
      phone,
      department,
      appointmentDate,
      timeSlot,
      reason,
      status: 'pending'
    });

    await appointment.save();

    // Send confirmation email
    const emailContent = `
      <h2>Appointment Confirmation</h2>
      <p>Dear ${patientName},</p>
      <p>Your appointment request has been received. We will contact you shortly to confirm.</p>
      <h3>Appointment Details:</h3>
      <ul>
        <li><strong>Department:</strong> ${department}</li>
        <li><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${timeSlot}</li>
        <li><strong>Reason:</strong> ${reason || 'General Checkup'}</li>
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
    res.status(500).json({ success: false, message: error.message });
  }
});

// Confirm appointment (admin only)
router.put('/:id/confirm', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { notes } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'confirmed',
        notes,
        confirmedBy: req.userId,
        confirmedAt: new Date()
      },
      { new: true }
    ).populate('patientId');

    // Send confirmation email to patient
    const emailContent = `
      <h2>Appointment Confirmed!</h2>
      <p>Dear ${appointment.patientName},</p>
      <p>Your appointment has been confirmed by Prime Hospital.</p>
      <h3>Confirmed Appointment Details:</h3>
      <ul>
        <li><strong>Department:</strong> ${appointment.department}</li>
        <li><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${appointment.timeSlot}</li>
        <li><strong>Notes:</strong> ${notes || 'None'}</li>
      </ul>
      <p>Please arrive 15 minutes before your appointment time.</p>
      <p>Thank you!</p>
    `;

    await sendEmail(appointment.email, 'Appointment Confirmed', emailContent);

    res.json({ success: true, message: 'Appointment confirmed', appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel appointment
router.put('/:id/cancel', authenticate, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;