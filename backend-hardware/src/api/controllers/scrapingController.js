const scrapingService = require('../../services/scrapingService');
const Component = require('../../data/models/Component'); // Para guardar (opcional)

exports.trackProduct = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ success: false, error: 'La URL es requerida' });
        }

        // 1. Ejecutar el Scraper
        const scrapedData = await scrapingService.scrapeProduct(url);

        // 2. (Opcional) Guardar en Base de Datos como un nuevo componente o actualizar precio
        // Por ahora, solo devolvemos los datos para verificar que funciona
        res.status(200).json({
            success: true,
            data: scrapedData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};