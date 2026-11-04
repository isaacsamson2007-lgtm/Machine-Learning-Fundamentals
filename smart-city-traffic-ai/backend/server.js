require('dotenv').config();
const express = require('express');
const cors = require('cors');
const predictionRoutes = require('./routes/prediction');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Enable CORS for frontend
app.use(cors({
  origin: [CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Smart City Traffic AI'
  });
});

// Prediction API routes
app.use('/api', predictionRoutes);

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler (prevent stack traces leaking to client)
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` SMART CITY TRAFFIC AI BACKEND INITIALIZED`);
  console.log(` Listening on: http://localhost:${PORT}`);
  console.log(` Allowed Origin: ${CORS_ORIGIN}`);
  console.log(` Status: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

