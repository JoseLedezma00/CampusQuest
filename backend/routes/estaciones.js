const express = require('express');
const router = express.Router();
const Estacion = require('../models/Estacion.js');

// Ruta para crear una nueva estación (POST)
router.post('/', async (req, res) => {
    try {
        const nuevaEstacion = new Estacion(req.body);
        await nuevaEstacion.save();
        res.json(nuevaEstacion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al guardar la estación');
    }
});

// Ruta para obtener todas las estaciones (GET)
router.get('/', async (req, res) => {
    try {
        const estaciones = await Estacion.find();
        res.json(estaciones);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las estaciones');
    }
});

module.exports = router;