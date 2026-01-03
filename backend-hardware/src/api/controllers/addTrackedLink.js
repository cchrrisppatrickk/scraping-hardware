const scrapingService = require('../../services/scrapingService'); // Importar el servicio
// Asegúrate de que Component ya esté importado (o importalo si usas Repository,
// pero para modificar sub-documentos a veces es más directo usar el Modelo o un método update del Repo).
const Component = require('../../data/models/Component'); 

// @desc    Agregar un link de tienda para rastrear precio
// @route   POST /api/v1/components/:id/add-link
// @access  Public (Futuro: Private/Admin)
exports.addTrackedLink = async (req, res) => {
    try {
        const { id } = req.params; // ID del CPU (Ryzen 5500)
        const { url } = req.body;  // Link de la tienda (Amazon...)

        if (!url) {
            return res.status(400).json({ success: false, error: 'La URL es requerida' });
        }

        // 1. Buscar el componente en la BD
        const component = await Component.findById(id);
        if (!component) {
            return res.status(404).json({ success: false, error: 'Componente no encontrado' });
        }

        // 2. Validar duplicados (No queremos el mismo link 2 veces)
        const linkExists = component.tracked_stores.find(store => store.url === url);
        if (linkExists) {
            return res.status(400).json({ success: false, error: 'Este enlace ya está siendo rastreado.' });
        }

        // 3. EJECUTAR SCRAPING (Validación en tiempo real)
        // Scrapeamos AHORA para obtener el primer precio y asegurar que el link sirve.
        const scrapedData = await scrapingService.scrapeProduct(url);

        if (scrapedData.price === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'No pudimos detectar un precio. Verifica el link o la tienda no es compatible.' 
            });
        }

        // 4. Construir el objeto de la tienda
        const domain = new URL(url).hostname.replace('www.', ''); // ej: 'amazon.com'

        const newStore = {
            store_name: domain, // Nombre automático basado en el dominio
            url: url,
            price: scrapedData.price,
            currency: scrapedData.currency || 'USD',
            in_stock: scrapedData.stock,
            last_checked: new Date()
        };

        // 5. Guardar en el array y en la BD
        component.tracked_stores.push(newStore);
        await component.save();

        res.status(200).json({
            success: true,
            message: 'Enlace agregado y precio inicial capturado',
            data: component // Devolvemos el componente actualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al agregar el enlace',
            details: error.message 
        });
    }
};