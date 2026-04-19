// backend/models/Estacion.js
const mongoose = require('mongoose');

const EstacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  codigo: { type: String, required: true, unique: true }, // Ej: LOC_ENG_07
  bloque: { type: Number, required: true },
  piso: { type: Number, default: 1 },
  // GeoJSON para geolocalización (OBLIGATORIO para $near)
  ubicacion: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitud, latitud] -> OJO: Longitud primero
      required: true
    }
  },
  puntos: { type: Number, default: 10 }
}, { timestamps: true });

// Índice 2dsphere para búsquedas geoespaciales
EstacionSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('Estacion', EstacionSchema);