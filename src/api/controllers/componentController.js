// IMPORTANTE: Ya no importamos el Modelo directamente.
// Importamos el Repositorio.
const componentRepository = require('../../data/repositories/componentRepository');

// @desc    Obtener componentes con filtros
// @route   GET /api/v1/components?brand=AMD&type=cpu
// @access  Public
exports.getComponents = async (req, res) => {
    try {
        // 1. Extraer filtros de la URL (Query Params)
        // Ejemplo: Si la URL es .../components?brand=AMD
        const filterOptions = {};
        
        if (req.query.brand) {
            filterOptions.brand = req.query.brand;
        }
        if (req.query.type) {
            filterOptions.type = req.query.type;
        }

        // 2. Pedir datos al repositorio (El controlador no sabe de Mongoose)
        const components = await componentRepository.findAll(filterOptions);

        // 3. Respuesta
        res.status(200).json({
            success: true,
            count: components.length,
            filters_applied: filterOptions,
            data: components
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al obtener datos',
            details: error.message
        });
    }
};

exports.getComponentById = async (req, res) => {
    try {
        const component = await componentRepository.findById(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                error: 'Componente no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: component
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};