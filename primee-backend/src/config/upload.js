import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(__dirname, '../../uploads');
const reportsDir = path.resolve(__dirname, '../../uploads/reports');

// Ensure directories exist
const ensureDirectories = () => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    return true;
  } catch (error) {
    console.error('Upload directory initialization failed');
    return false;
  }
};

ensureDirectories();

// Magic byte signatures for allowed image types
const MAGIC_BYTES = {
  'image/jpeg': [Buffer.from([0xFF, 0xD8, 0xFF])],
  'image/png': [Buffer.from([0x89, 0x50, 0x4E, 0x47])],
  'image/gif': [Buffer.from([0x47, 0x49, 0x46, 0x38])],
};

/**
 * Validate that the file content matches the declared MIME type
 * by checking magic bytes (file signatures).
 */
const validateMagicBytes = (filePath, declaredMime) => {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(8);
    fs.readSync(fd, buffer, 0, 8, 0);
    fs.closeSync(fd);

    const signatures = MAGIC_BYTES[declaredMime];
    if (!signatures) return false;

    return signatures.some(sig => {
      for (let i = 0; i < sig.length; i++) {
        if (buffer[i] !== sig[i]) return false;
      }
      return true;
    });
  } catch {
    return false;
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      cb(null, reportsDir);
    } catch (error) {
      cb(new Error('Upload destination error'));
    }
  },
  filename: (req, file, cb) => {
    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, uniqueSuffix + ext);
    } catch (error) {
      cb(new Error('Filename generation error'));
    }
  }
});

// File filter — check MIME type AND file extension
const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const allowedExts = ['.jpg', '.jpeg', '.png', '.gif'];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Only image files (JPEG, PNG, GIF) are allowed'));
  }

  if (!allowedExts.includes(ext)) {
    return cb(new Error('Invalid file extension'));
  }

  cb(null, true);
};

// Create multer instance
const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB per file (reduced from 10MB)
});

/**
 * Wrapper that validates magic bytes AFTER upload.
 * If the file content doesn't match the declared MIME type, delete it.
 */
export const upload = {
  array: (fieldName, maxCount) => {
    const multerMiddleware = multerUpload.array(fieldName, maxCount);

    return (req, res, next) => {
      multerMiddleware(req, res, (err) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }

        // Post-upload magic byte validation
        if (req.files && req.files.length > 0) {
          for (const file of req.files) {
            if (!validateMagicBytes(file.path, file.mimetype)) {
              // Delete the suspect file immediately
              try { fs.unlinkSync(file.path); } catch { }
              return res.status(400).json({
                success: false,
                message: 'File content does not match declared type. Upload rejected.'
              });
            }
          }
        }

        next();
      });
    };
  }
};