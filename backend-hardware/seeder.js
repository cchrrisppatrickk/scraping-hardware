// seeder.js
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Opcional: npm install colors para que se vea bonito

// Cargar variables de entorno
dotenv.config();

// Cargar el modelo
const Component = require('./src/data/models/Component');

// Conectar a la BD
mongoose.connect(process.env.MONGO_URI);

// Leer el archivo JSON
const components = JSON.parse(
    fs.readFileSync(`${__dirname}/dataJson/cpus_Amd_Intel_data.json`, 'utf-8')
);

// Función para Importar Datos
const importData = async () => {
    try {
        console.log('⏳ Borrando datos antiguos...'.yellow);
        await Component.deleteMany(); // Limpia la tabla para no duplicar

        console.log('⏳ Insertando nuevos datos...'.yellow);
        await Component.create(components);

        console.log('✅ ¡Datos Importados con Éxito!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error}`.red.inverse);
        process.exit(1);
    }
};

// Función para Borrar Todo (Por si te equivocas)
const deleteData = async () => {
    try {
        await Component.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

// Detectar argumentos de consola
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log("Por favor usa: node seeder.js -i (importar) o -d (borrar)");
    process.exit();
}