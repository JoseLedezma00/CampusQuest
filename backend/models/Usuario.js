const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    equipo: { type: String },
    puntosTotales: { type: Number, default: 0 },
    registro: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);