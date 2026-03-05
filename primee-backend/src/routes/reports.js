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
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, reports: reports || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get reports by patient ID (public access by ID)
router.get('/patient/:patientId', async (req, res) => {
  try {
    const patientIdParam = req.params.patientId?.trim();

    // Strict validation for PTXXXXX format
    if (!patientIdParam || !/^PT\d+$/i.test(patientIdParam)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Patient ID format. Example: PT00001'
      });
    }

    const patient = await Patient.findOne({ patientId: patientIdParam.toUpperCase() });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const mongoDbId = patient._id.toString();

    const reports = await Report.find({ patientId: mongoDbId })
      .populate('patientId', 'patientId fullName')
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    if (!reports || reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No reports found for this patient'
      });
    }

    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get single report (authenticated — admin or patient owner)
router.get('/:id', authenticate, authorize(['admin', 'user']), async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('patientId', 'patientId fullName email userId')
      .populate('uploadedBy', 'name');

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // Authorization: non-admin users can only view their own reports
    const patientOwnerId = report.patientId?.userId?.toString();
    if (req.userRole !== 'admin' && req.userId !== patientOwnerId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Upload report with MULTIPLE images (admin only)
router.post('/upload', authenticate, authorize(['admin']), upload.array('reportImages', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided' });
    }

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

    if (!reportType || !department || !reportDate || !doctorName) {
      return res.status(400).json({
        success: false,
        message: 'Missing report fields. Required: reportType, department, reportDate, doctorName'
      });
    }

    let finalPatientId = null;
    let finalPatientName = null;

    // CASE 1: Using existing patient
    if (patientId && patientId.trim() !== '' && createNewPatient !== 'true') {
      const existingPatient = await Patient.findById(patientId);
      if (!existingPatient) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
      }
      finalPatientId = existingPatient._id;
      finalPatientName = existingPatient.fullName;
    }

    // CASE 2: Creating new patient
    else if (createNewPatient === 'true') {
      if (!patientName || !patientEmail || !patientPhone || !patientDateOfBirth || !patientGender) {
        return res.status(400).json({
          success: false,
          message: 'Missing patient details'
        });
      }

      const existingByEmail = await Patient.findOne({
        email: patientEmail.toLowerCase().trim()
      });
      if (existingByEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      const newPatient = new Patient({
        fullName: patientName.trim(),
        email: patientEmail.toLowerCase().trim(),
        phone: patientPhone.trim(),
        dateOfBirth: new Date(patientDateOfBirth),
        gender: patientGender.trim(),
        userId: req.userId,
        createdBy: req.userId
      });

      await newPatient.save();
      finalPatientId = newPatient._id;
      finalPatientName = newPatient.fullName;
    }

    if (!finalPatientId) {
      return res.status(400).json({
        success: false,
        message: 'Please select an existing patient or create a new one'
      });
    }

    // Create reports for each uploaded image
    const savedReports = [];

    for (const file of req.files) {
      const reportImageUrl = `/uploads/reports/${file.filename}`;

      const newReport = new Report({
        patientId: finalPatientId,
        patientName: finalPatientName,
        reportType: reportType.trim(),
        department: department.trim(),
        reportDate: new Date(reportDate),
        reportImageUrl: reportImageUrl,
        description: description?.trim() || null,
        doctorName: doctorName.trim(),
        uploadedBy: req.userId
      });

      await newReport.save();
      await newReport.populate('patientId', 'patientId fullName');
      await newReport.populate('uploadedBy', 'name');

      savedReports.push(newReport);
    }

    return res.status(201).json({
      success: true,
      message: `${savedReports.length} report(s) uploaded successfully`,
      reports: savedReports,
      patientId: finalPatientId,
      patientName: finalPatientName
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
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

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.json({ success: true, message: 'Report updated successfully', report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete report (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;