const Component = require('../../data/models/Component');

// @desc    Obtener todos los componentes (CPUs)
// @route   GET /api/v1/components
// @access  Public
exports.getComponents = async (req, res) => {
    try {
        // 1. Buscamos en la BD usando Mongoose
        // .find() trae todo. .sort() ordena por fecha de creación (más nuevo primero)
        const components = await Component.find().sort({ createdAt: -1 });

        // 2. Respondemos con JSON estandarizado
        res.status(200).json({
            success: true,
            count: components.length,
            data: components
        });
    } catch (error) {
        // Si algo falla (BD caída, error de red)
        res.status(500).json({
            success: false,
            error: 'Error del Servidor',
            details: error.message
        });
    }
};

// @desc    Obtener un solo componente por ID
// @route   GET /api/v1/components/:id
exports.getComponentById = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);

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