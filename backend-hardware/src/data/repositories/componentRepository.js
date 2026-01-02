const Component = require('../models/Component');

class ComponentRepository {
    
    // Obtener todos (con filtros opcionales)
    async findAll(filters = {}, sort = { createdAt: -1 }) {
        // En el futuro aquí agregaremos lógica de paginación
        return await Component.find(filters).sort(sort);
    }

    // Obtener uno por ID
    async findById(id) {
        return await Component.findById(id);
    }

    // Crear uno nuevo (útil para el scraper después)
    async create(data) {
        return await Component.create(data);
    }

    // Buscar por URL (para evitar duplicados al scrapear)
    async findByUrl(url) {
        // Nota: Asumimos que guardaremos la URL fuente en el futuro
        return await Component.findOne({ sourceUrl: url });
    }
}

module.exports = new ComponentRepository();