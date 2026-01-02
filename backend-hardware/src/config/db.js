// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables del .env

const connectDB = async () => {
    try {
        // Intentamos conectar usando la URL guardada en el archivo secreto
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`--- MongoDB Conectado ---`);
        console.log(`Host: ${conn.connection.host}`);
        console.log(`Base de Datos: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
        // Si falla la conexión, cerramos la aplicación (es crítico)
        process.exit(1);
    }
};

// Exportamos la función para usarla en app.js
module.exports = connectDB;