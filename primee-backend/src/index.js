import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import patientRoutes from './routes/patients.js';
import appointmentRoutes from './routes/appointments.js';
import messageRoutes from './routes/messages.js';
import reportRoutes from './routes/reports.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// ── Security Middleware ──────────────────────────────────────────────

// Helmet sets various HTTP security headers (XSS filter, noSniff, etc.)
app.use(helmet());

// CORS — only allow requests from the configured frontend origin
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Global rate limiter — 500 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(globalLimiter);

// Stricter rate limiter for auth routes — 20 requests per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts, please try again later.' },
});

import mongoSanitize from 'express-mongo-sanitize';

// ── Body Parsing ─────────────────────────────────────────────────────

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Sanitize data against NoSQL query injection
app.use(mongoSanitize());

// ── Static Files ─────────────────────────────────────────────────────

const uploadsPath = path.resolve(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Serve uploaded files — dotfiles denied, caching disabled for freshness
app.use('/uploads', express.static(uploadsPath, {
  dotfiles: 'deny',
  etag: true,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
  },
}));

// ── Database ─────────────────────────────────────────────────────────

connectDB();

// ── Routes ───────────────────────────────────────────────────────────

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reports', reportRoutes);

// Health check (safe to leave public)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ── Error Handlers ───────────────────────────────────────────────────

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler — never leak internals in production
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

// ── Start ────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});