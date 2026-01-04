const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const Component = require('./src/data/models/Component');

// 1. Configuración
dotenv.config();

// Nombre del archivo generado por Python
const MATCHES_FILE = '/dataJson/matches_ready_to_upload.json';

const importLinks = async () => {
    try {
        console.log("🔌 Conectando a MongoDB Atlas...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado.");

        // 2. Leer el archivo de matches
        const filePath = path.join(__dirname, MATCHES_FILE);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ No encuentro el archivo: ${MATCHES_FILE}`);
            process.exit(1);
        }

        const matches = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`📂 Leyendo ${matches.length} enlaces para procesar...`);

        let updatedCount = 0;
        let skippedCount = 0;

        // 3. Procesar cada match
        for (const match of matches) {
            const { component_id, store_url } = match;

            if (!component_id || !store_url) continue;

            // Extraer nombre de la tienda del dominio
            let storeName = "Unknown";
            try {
                storeName = new URL(store_url).hostname.replace('www.', '');
            } catch (e) {
                console.log(`⚠️ URL inválida: ${store_url}`);
                continue;
            }

            // Buscar el componente
            const component = await Component.findById(component_id);
            
            if (component) {
                // VERIFICAR DUPLICADOS: ¿Ya existe este link en este CPU?
                const exists = component.tracked_stores.some(store => store.url === store_url);

                if (!exists) {
                    // Crear el objeto de tienda (Estado "Pendiente de Actualización")
                    const newStore = {
                        store_name: storeName,
                        url: store_url,
                        price: 0,          // Precio 0 indica "No actualizado"
                        currency: 'PEN',   // Asumimos moneda local por defecto (o USD)
                        in_stock: true,
                        last_checked: null // Null indica al Worker que debe priorizarlo
                    };

                    component.tracked_stores.push(newStore);
                    await component.save();
                    process.stdout.write("." ); // Barra de progreso visual
                    updatedCount++;
                } else {
                    skippedCount++;
                }
            }
        }

        console.log("\n\n" + "=".repeat(40));
        console.log("🚀 IMPORTACIÓN FINALIZADA");
        console.log("=".repeat(40));
        console.log(`✅ Enlaces nuevos agregados: ${updatedCount}`);
        console.log(`⏭️  Enlaces duplicados saltados: ${skippedCount}`);
        console.log("=".repeat(40));
        console.log("Ahora tus CPUs tienen los links, pero el precio es 0.");
        console.log("Siguiente paso: Ejecutar el 'Price Updater' para obtener los precios reales.");

        process.exit();

    } catch (error) {
        console.error("❌ Error fatal:", error);
        process.exit(1);
    }
};

importLinks();