const scrapingService = require('../../services/scrapingService');
// Asegúrate de usar la ruta correcta a tu modelo o repositorio
const Component = require('../../data/models/Component'); 
const componentRepository = require('../../data/repositories/componentRepository');

// 1. Obtener todos los componentes
exports.getComponents = async (req, res) => {
    try {
        const filterOptions = {};
        if (req.query.brand) filterOptions.brand = req.query.brand;
        if (req.query.type) filterOptions.type = req.query.type;

        const components = await componentRepository.findAll(filterOptions);

        res.status(200).json({
            success: true,
            count: components.length,
            data: components
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Obtener un componente por ID
exports.getComponentById = async (req, res) => {
    try {
        const component = await componentRepository.findById(req.params.id);
        if (!component) {
            return res.status(404).json({ success: false, error: 'Componente no encontrado' });
        }
        res.status(200).json({ success: true, data: component });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. Agregar Link de Rastreo (LA NUEVA FUNCIÓN)
exports.addTrackedLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { url } = req.body;

        if (!url) return res.status(400).json({ success: false, error: 'URL requerida' });

        const component = await Component.findById(id);
        if (!component) return res.status(404).json({ success: false, error: 'Componente no encontrado' });

        // Scrapeo Inicial
        const scrapedData = await scrapingService.scrapeProduct(url);
        
        if (!scrapedData || scrapedData.price === 0) {
            return res.status(400).json({ success: false, error: 'No se pudo obtener precio' });
        }

        const newStore = {
            store_name: new URL(url).hostname.replace('www.', ''),
            url: url,
            price: scrapedData.price,
            currency: scrapedData.currency || 'USD',
            in_stock: scrapedData.stock,
            last_checked: new Date()
        };

        component.tracked_stores.push(newStore);
        await component.save();

        res.status(200).json({ success: true, data: component });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};