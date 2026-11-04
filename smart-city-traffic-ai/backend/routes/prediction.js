const express = require('express');
const router = express.Router();
const { runAllPredictions } = require('../services/pythonRunner');

const REQUIRED_FIELDS = [
  'vehicle_count',
  'average_speed',
  'heavy_vehicle_count',
  'motorcycle_count',
  'public_transport_count',
  'traffic_density',
  'queue_length',
  'average_wait_time',
  'hour',
  'is_weekend',
  'is_holiday',
  'rush_hour',
  'temperature',
  'rainfall_mm',
  'visibility_km',
  'air_quality_index',
  'parking_occupancy',
  'construction_activity',
  'accident_reported',
  'traffic_camera_count',
  'signal_cycle_seconds',
  'green_light_duration',
  'emergency_vehicle_detected'
];

router.post('/predict', async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData || typeof inputData !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body. JSON object expected.'
      });
    }

    // Validate that numbers or convertible values are present
    const cleanData = {};
    const missing = [];

    for (const field of REQUIRED_FIELDS) {
      if (inputData[field] === undefined || inputData[field] === null || inputData[field] === '') {
        missing.push(field);
      } else {
        const num = Number(inputData[field]);
        if (isNaN(num)) {
          return res.status(400).json({
            success: false,
            error: `Field '${field}' must be a valid number. Received: ${inputData[field]}`
          });
        }
        cleanData[field] = num;
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required traffic input features: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? ` and ${missing.length - 5} more` : ''}`
      });
    }

    const results = await runAllPredictions(cleanData);
    return res.json(results);

  } catch (error) {
    console.error('Prediction controller error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Prediction service failed. Please check Python environment or model files.'
    });
  }
});

module.exports = router;

