const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db'); // Ajusta la ruta si tu app.js está en src o raíz

// 1. Cargar config y conectar BD
dotenv.config();
connectDB();

// 2. Inicializar Express
const app = express();

// 3. Middlewares (Herramientas globales)
app.use(express.json()); // Permite recibir JSON en peticiones POST
app.use(cors());         // Permite conexiones desde otros dominios
app.use(helmet());       // Seguridad headers
app.use(morgan('dev'));  // Logger de peticiones en consola

// 4. Montar Rutas
// Todas las rutas de componentes empezarán con /api/v1/components
const componentRoutes = require('./src/api/routes/componentRoutes');
app.use('/api/v1/components', componentRoutes);

// 5. Iniciar el Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en modo: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 URL Base: http://localhost:${PORT}`);
});