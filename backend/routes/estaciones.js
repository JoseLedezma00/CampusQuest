// backend/routes/estaciones.js
const express = require('express');
const router = express.Router();
const Estacion = require('../models/Estacion');

// GET /api/estaciones
router.get('/', async (req, res) => {
  try {
    const estaciones = await Estacion.find({});
    res.json({ 
      success: true, 
      count: estaciones.length, 
      data: estaciones 
    });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
});

module.exports = router;