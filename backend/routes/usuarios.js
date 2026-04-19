const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario.js');

// ── Crear usuario (POST /api/usuarios) ────────────────────────────────────────
// Body esperado: { nombre, codigo, password, equipo }
router.post('/', async (req, res) => {
    try {
        const { nombre, codigo, password, equipo } = req.body;

        // Validar campos obligatorios
        if (!nombre || !codigo || !password) {
            return res.status(400).json({ 
                message: 'nombre, codigo y password son obligatorios' 
            });
        }

        // Verificar si el código ya existe
        const existe = await Usuario.findOne({ codigo });
        if (existe) {
            return res.status(400).json({ 
                message: `El código ${codigo} ya está registrado` 
            });
        }

        const nuevoUsuario = new Usuario({ nombre, codigo, password, equipo });
        await nuevoUsuario.save();

        // Responder sin incluir la contraseña
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                codigo: nuevoUsuario.codigo,
                equipo: nuevoUsuario.equipo,
                puntosTotales: nuevoUsuario.puntosTotales,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

// ── Obtener todos los usuarios (GET /api/usuarios) ────────────────────────────
router.get('/', async (req, res) => {
    try {
        // .select('-password') excluye la contraseña de la respuesta
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

module.exports = router;