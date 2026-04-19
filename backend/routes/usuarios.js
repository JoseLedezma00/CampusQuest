// backend/routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// ✅ POST /api/usuarios - REGISTRAR NUEVO USUARIO
router.post('/', async (req, res) => {
  try {
    const { nombre, codigo, password, equipo } = req.body;

    // Validaciones
    if (!nombre || !codigo || !password) {
      return res.status(400).json({ message: 'Nombre, código y contraseña son obligatorios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el código ya existe
    const existente = await Usuario.findOne({ codigo });
    if (existente) {
      return res.status(409).json({ message: 'Ya existe un usuario con este código' });
    }

    // Crear usuario (el hook pre('save') de Usuario.js encripta la contraseña)
    const nuevoUsuario = await Usuario.create({
      nombre,
      codigo,
      password,
      equipo: equipo || null
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: nuevoUsuario._id, codigo: nuevoUsuario.codigo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // ✅ Responder con JSON (esto es lo que tu frontend espera)
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      usuario: {
        nombre: nuevoUsuario.nombre,
        codigo: nuevoUsuario.codigo,
        equipo: nuevoUsuario.equipo
      }
    });

  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// ✅ POST /api/usuarios/login - LOGIN
router.post('/login', async (req, res) => {
  try {
    const { codigo, password } = req.body;
    if (!codigo || !password) {
      return res.status(400).json({ message: 'Código y contraseña son requeridos' });
    }

    const usuario = await Usuario.findOne({ codigo });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const esValido = await usuario.compararPassword(password);
    if (!esValido) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, codigo: usuario.codigo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        nombre: usuario.nombre,
        codigo: usuario.codigo,
        equipo: usuario.equipo
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// ✅ IMPORTANTE: Exportar el router
module.exports = router;