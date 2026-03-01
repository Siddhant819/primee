import express from 'express';
import Report from '../models/Report.js';
import Patient from '../models/Patient.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { upload } from '../config/upload.js';

const router = express.Router();

// Get all reports (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('patientId', 'patientId fullName email')
      .populate('uploadedBy', 'name');
    
    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get reports by patient ID (authenticated users)
router.get('/patient/:patientId', authenticate, async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.params.patientId })
      .populate('patientId', 'patientId fullName')
      .populate('uploadedBy', 'name');

    if (reports.length === 0) {
      return res.status(404).json({ success: false, message: 'No reports found' });
    }

    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single report
router.get('/:id', authenticate, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('patientId', 'patientId fullName email')
      .populate('uploadedBy', 'name');
    
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload report with patient creation option (admin only)
router.post('/upload', authenticate, authorize(['admin']), upload.single('reportImage'), async (req, res) => {
  try {
    const { 
      patientId, 
      patientName, 
      patientEmail,
      patientPhone,
      patientDateOfBirth,
      patientGender,
      createNewPatient,
      reportType, 
      department, 
      reportDate, 
      description, 
      doctorName 
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    if (!reportType || !department || !reportDate || !doctorName) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    let finalPatientId = patientId;
    let finalPatientName = patientName;
    let patient = null;

    // Check if patient exists
    if (patientId) {
      patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
      }
      finalPatientName = patient.fullName;
    }

    // Create new patient if requested
    if (createNewPatient === 'true' && !patientId) {
      if (!patientName || !patientEmail || !patientPhone || !patientDateOfBirth || !patientGender) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide all patient details to create new patient' 
        });
      }

      patient = new Patient({
        fullName: patientName,
        email: patientEmail,
        phone: patientPhone,
        dateOfBirth: patientDateOfBirth,
        gender: patientGender,
        userId: req.userId,
        createdBy: req.userId
      });

      await patient.save();
      finalPatientId = patient._id;
      finalPatientName = patient.fullName;
    }

    if (!finalPatientId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please select a patient or create a new one' 
      });
    }

    const reportImageUrl = `/uploads/reports/${req.file.filename}`;

    const report = new Report({
      patientId: finalPatientId,
      patientName: finalPatientName,
      reportType,
      department,
      reportDate,
      reportImageUrl,
      description,
      doctorName,
      uploadedBy: req.userId
    });

    await report.save();
    await report.populate('patientId', 'patientId fullName');
    await report.populate('uploadedBy', 'name');

    res.status(201).json({
      success: true,
      message: 'Report uploaded successfully',
      report,
      patientId: finalPatientId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update report (admin only)
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { description, doctorName } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { description, doctorName },
      { new: true, runValidators: true }
    ).populate('patientId', 'patientId fullName').populate('uploadedBy', 'name');

    res.json({ success: true, message: 'Report updated', report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete report (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    await Report.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;