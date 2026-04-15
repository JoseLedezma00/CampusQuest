// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables del .env

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conexión a MongoDB Atlas exitosa');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
        process.exit(1); // Detener la app si falla la conexión
    }
};

module.exports = conectarDB;