const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = mongoose.Schema({
    nombre:        { type: String, required: true },
    codigo:        { type: String, required: true, unique: true },
    password:      { type: String, required: true },
    equipo:        { type: String },
    puntosTotales: { type: Number, default: 0 },
    registro:      { type: Date, default: Date.now }  // sin () — Date.now es una función
});

// Antes de guardar, encripta la contraseña automáticamente
UsuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Método para comparar contraseñas al hacer login
UsuarioSchema.methods.compararPassword = async function(passwordIngresada) {
    return bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);