const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// 1. Crear el servidor
const app = express();

// 2. Conectar a la Base de Datos (MongoDB Atlas)
conectarDB();

// 3. Middlewares
app.use(cors()); // Permite que tu React Native (frontend) se comunique con el backend
app.use(express.json()); // Permite recibir datos en formato JSON

// 4. IMPORTAR Y USAR RUTAS
// Aquí es donde agregaste la línea:
app.use('/api/estaciones', require('./routes/estaciones'));
app.use('/api/usuarios', require('./routes/usuarios'));

// 5. Definir puerto y arrancar servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor de CampusQuest corriendo en el puerto ${PORT}`);
});