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
    console.error('Error fetching reports:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get reports by patient ID (authenticated users)
router.get('/patient/:patientId', authenticate, async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.params.patientId })
      .populate('patientId', 'patientId fullName')
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    if (!reports || reports.length === 0) {
      return res.status(404).json({ success: false, message: 'No reports found' });
    }

    res.json({ success: true, reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
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
    console.error('Error fetching report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload report with patient creation option (admin only)
router.post('/upload', authenticate, authorize(['admin']), upload.single('reportImage'), async (req, res) => {
  let uploadedFile = null;
  
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    uploadedFile = req.file;
    console.log('File uploaded:', uploadedFile.filename);

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

    // Validate required report fields
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
      try {
        const existingPatient = await Patient.findById(patientId);
        if (!existingPatient) {
          return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        finalPatientId = existingPatient._id;
        finalPatientName = existingPatient.fullName;
      } catch (err) {
        console.error('Error finding patient:', err);
        return res.status(500).json({ success: false, message: 'Error finding patient: ' + err.message });
      }
    }

    // CASE 2: Creating new patient
    else if (createNewPatient === 'true') {
      // Validate patient details
      if (!patientName || !patientEmail || !patientPhone || !patientDateOfBirth || !patientGender) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing patient details. Required: patientName, patientEmail, patientPhone, patientDateOfBirth, patientGender' 
        });
      }

      try {
        // Check if email already exists
        const existingByEmail = await Patient.findOne({ 
          email: patientEmail.toLowerCase().trim() 
        });
        if (existingByEmail) {
          return res.status(400).json({
            success: false,
            message: 'Email already registered. Please use a different email.'
          });
        }

        // Create patient object
        const newPatient = new Patient({
          fullName: patientName.trim(),
          email: patientEmail.toLowerCase().trim(),
          phone: patientPhone.trim(),
          dateOfBirth: new Date(patientDateOfBirth),
          gender: patientGender.trim(),
          userId: req.userId,
          createdBy: req.userId
        });

        // Save patient
        await newPatient.save();
        console.log('Patient created with ID:', newPatient.patientId, 'MongoDB ID:', newPatient._id);

        finalPatientId = newPatient._id;
        finalPatientName = newPatient.fullName;
      } catch (err) {
        console.error('Error creating patient:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Error creating patient: ' + err.message,
          details: err.errors ? Object.keys(err.errors).map(key => `${key}: ${err.errors[key].message}`) : []
        });
      }
    }

    // Validate we have a patient
    if (!finalPatientId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please select an existing patient or provide new patient details' 
      });
    }

    // Create report
    try {
      console.log('Creating report for patient:', finalPatientId);
      
      // Store the file path relative to the uploads directory
      const reportImageUrl = `/uploads/reports/${uploadedFile.filename}`;
      console.log('Report image URL:', reportImageUrl);

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
      console.log('Report saved successfully');

      // Populate references
      await newReport.populate('patientId', 'patientId fullName');
      await newReport.populate('uploadedBy', 'name');

      return res.status(201).json({
        success: true,
        message: 'Report uploaded successfully',
        report: newReport,
        patientId: finalPatientId,
        patientName: finalPatientName
      });
    } catch (err) {
      console.error('Error saving report:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error saving report: ' + err.message,
        details: err.errors ? Object.keys(err.errors).map(key => `${key}: ${err.errors[key].message}`) : []
      });
    }

  } catch (error) {
    console.error('=== UPLOAD ERROR ===', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
    console.error('Error updating report:', error);
    res.status(500).json({ success: false, message: error.message });
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
    console.error('Error deleting report:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;