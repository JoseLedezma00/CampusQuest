const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario.js');

// Crear un usuario (POST: /api/usuarios)
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el usuario');
    }
});

// Obtener todos los usuarios (GET: /api/usuarios)
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

module.exports = router;