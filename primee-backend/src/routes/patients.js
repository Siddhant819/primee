import express from 'express';
import Patient from '../models/Patient.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { escapeRegex, pickFields } from '../utils/sanitize.js';

const router = express.Router();

// Allowed fields for patient updates
const PATIENT_UPDATE_FIELDS = ['fullName', 'email', 'phone', 'dateOfBirth', 'gender', 'address', 'medicalHistory', 'bloodGroup'];

// Get all patients (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('userId', 'name email')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Search patients by name, email, or patientId (admin only)
router.get('/search/query', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.json({ success: true, patients: [] });
    }

    // Escape regex special characters to prevent ReDoS / NoSQL injection
    const safeQuery = escapeRegex(q.trim());

    const patients = await Patient.find({
      $or: [
        { fullName: { $regex: safeQuery, $options: 'i' } },
        { email: { $regex: safeQuery, $options: 'i' } },
        { patientId: { $regex: safeQuery, $options: 'i' } },
        { phone: { $regex: safeQuery, $options: 'i' } }
      ]
    })
      .populate('userId', 'name email')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get patient by ID (admin or owner)
router.get('/:id', authenticate, authorize(['admin', 'user']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('createdBy', 'name');

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Allow admin or the patient's own user
    if (req.userRole !== 'admin' && req.userId !== patient.userId?.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create patient (authenticated users)
router.post('/', authenticate, async (req, res) => {
  try {
    const { fullName, email, phone, dateOfBirth, gender, address, medicalHistory, bloodGroup } = req.body;

    if (!fullName || !email || !phone || !dateOfBirth || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: fullName, email, phone, dateOfBirth, gender'
      });
    }

    const existingPatient = await Patient.findOne({ email: email.toLowerCase().trim() });
    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'A patient with this email already exists'
      });
    }

    const patient = new Patient({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      dateOfBirth: new Date(dateOfBirth),
      gender: gender.trim(),
      address: address?.trim() || null,
      medicalHistory: medicalHistory?.trim() || null,
      bloodGroup: bloodGroup || null,
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
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        success: false,
        message: 'A patient with this email already exists'
      });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update patient (admin or owner — whitelisted fields only)
router.put('/:id', authenticate, authorize(['admin', 'user']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Check authorization — admin or patient owner
    if (req.userRole !== 'admin' && req.userId !== patient.userId?.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Only allow whitelisted fields — prevents mass assignment
    const updateData = pickFields(req.body, PATIENT_UPDATE_FIELDS);

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.json({ success: true, message: 'Patient updated successfully', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete patient (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    await Patient.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;