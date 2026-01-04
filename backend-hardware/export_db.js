const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

// 1. Cargar variables de entorno (para la contraseña de la BD)
dotenv.config();

// 2. Importar tu Modelo (Ajusta la ruta si moviste carpetas)
const Component = require('./src/data/models/Component');

const exportData = async () => {
    try {
        console.log("🔌 Conectando a MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado.");

        console.log("📥 Descargando componentes...");
        
        // Obtenemos SOLO los campos necesarios para el matching (ID y Nombre)
        // Si quieres todo, quita el segundo parámetro select
        const components = await Component.find({})
            .select('_id name brand type') 
            .lean(); // .lean() hace que sea JSON puro y más rápido

        console.log(`📊 Se encontraron ${components.length} productos.`);

        // 3. Guardar en archivo
        const outputPath = path.join(__dirname, 'db_cpus_export.json');
        
        fs.writeFileSync(outputPath, JSON.stringify(components, null, 4));

        console.log(`💾 Archivo guardado exitosamente en:`);
        console.log(`   👉 ${outputPath}`);

        process.exit();
    } catch (error) {
        console.error("❌ Error exportando la data:", error);
        process.exit(1);
    }
};

exportData();