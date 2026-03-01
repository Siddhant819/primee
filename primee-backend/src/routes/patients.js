import express from 'express';
import Patient from '../models/Patient.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all patients (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('userId', 'name email')
      .populate('createdBy', 'name');
    
    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get patient by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('createdBy', 'name');
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Allow admin or the patient themselves
    if (req.userId !== patient.userId.toString() && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create patient (authenticated users)
router.post('/', authenticate, async (req, res) => {
  try {
    const { fullName, email, phone, dateOfBirth, gender, address, medicalHistory, bloodGroup } = req.body;

    if (!fullName || !email || !phone || !dateOfBirth || !gender) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const patient = new Patient({
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      medicalHistory,
      bloodGroup,
      userId: req.userId,
      createdBy: req.userId
    });

    await patient.save();
    await patient.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      patient
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update patient
router.put('/:id', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Check authorization
    if (req.userId !== patient.userId.toString() && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.json({ success: true, message: 'Patient updated', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete patient
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    await Patient.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;