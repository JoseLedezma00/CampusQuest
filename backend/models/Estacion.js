const mongoose = require('mongoose');

const EstacionSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    puntos: { type: Number, default: 0 },
    creado: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Estacion', EstacionSchema);