const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Si lo tienes instalado, si no, quita los .green/.red
const Component = require('./src/data/models/Component');
const scrapingService = require('./src/services/scrapingService');

// 1. Configuración
dotenv.config();

// Configuración de tiempos (en milisegundos)
const MIN_DELAY = 10000;  // Mínimo 5 segundos
const MAX_DELAY = 20000; // Máximo 15 segundos

// Función para pausar el script (Sleep)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const updatePrices = async () => {
    try {
        console.log("🔌 Conectando a BD...".yellow);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado.".green);

        // 2. Buscar candidatos
        // Traemos componentes que tengan al menos una tienda rastreada
        const components = await Component.find({ 
            'tracked_stores.0': { $exists: true } 
        });

        // Aplanamos la lista para tener una "Cola de Tareas" lineal
        let queue = [];
        components.forEach(comp => {
            comp.tracked_stores.forEach(store => {
                // FILTRO: Solo actualizamos si el precio es 0 (nuevo) 
                // O si quieres actualizar todo, quita el 'if'
                if (store.price === 0 || !store.last_checked) {
                    queue.push({
                        componentName: comp.name,
                        componentId: comp._id,
                        storeId: store._id,
                        url: store.url,
                        storeName: store.store_name
                    });
                }
            });
        });

        console.log(`\n📋 Se encontraron ${queue.length} enlaces pendientes de actualización.`.cyan);
        console.log("🚀 Iniciando proceso de scraping secuencial...\n");

        // 3. Procesar la Cola
        for (const [index, task] of queue.entries()) {
            const progress = `[${index + 1}/${queue.length}]`;
            console.log(`${progress} Analizando: ${task.componentName} en ${task.storeName}...`);

            try {
                // A. Scrapeamos
                const data = await scrapingService.scrapeProduct(task.url);

                if (data.price > 0) {
                    // B. Actualizamos en Base de Datos
                    // Usamos el operador $ set para actualizar solo el elemento específico del array
                    await Component.updateOne(
                        { "_id": task.componentId, "tracked_stores._id": task.storeId },
                        { 
                            $set: {
                                "tracked_stores.$.price": data.price,
                                "tracked_stores.$.currency": data.currency,
                                "tracked_stores.$.in_stock": data.stock,
                                "tracked_stores.$.last_checked": new Date()
                            }
                        }
                    );
                    console.log(`   ✅ Precio encontrado: ${data.currency} ${data.price}`.green);
                } else {
                    console.log(`   ⚠️  No se detectó precio (posible bloqueo o layout desconocido)`.yellow);
                }

            } catch (error) {
                console.error(`   ❌ Error: ${error.message}`.red);
            }

            // C. Retraso Aleatorio (Human Behavior)
            if (index < queue.length - 1) {
                const waitTime = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
                console.log(`   ⏳ Esperando ${Math.round(waitTime/1000)}s para evitar bloqueo...\n`.gray);
                await sleep(waitTime);
            }
        }

        console.log("\n🎉 ACTUALIZACIÓN MASIVA COMPLETADA 🎉".bgGreen.white);
        process.exit();

    } catch (error) {
        console.error("❌ Error Fatal:", error);
        process.exit(1);
    }
};

updatePrices();