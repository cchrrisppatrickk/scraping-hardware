const mongoose = require('mongoose');

// Definimos el esquema (las reglas del juego)
const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['cpu', 'gpu', 'ram', 'motherboard', 'storage', 'psu', 'case'], // Lista permitida
        index: true // Indexar para búsquedas rápidas
    },
    brand: {
        type: String,
        enum: ['Intel', 'AMD', 'NVIDIA', 'Unknown'],
        default: 'Unknown'
    },
    price: {
        type: Number, // Importante: Ahora es número para poder ordenar
        default: 0
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    // "specs" será un objeto flexible, porque una GPU tiene VRAM y una CPU tiene Cores
    // Usamos "Mixed" o un sub-documento flexible.
    specs: {
        core_count: Number,
        core_clock: String,
        boost_clock: String,
        tdp: Number,
        microarchitecture: String,
        integrated_graphics: String,
        vram: String, // Futuro: Para GPUs
        capacity: String // Futuro: Para RAM/SSD
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true, // Crea automáticamente campos createdAt y updatedAt
    versionKey: false // Quita el campo __v molesto de Mongo
});

// Exportamos el modelo
module.exports = mongoose.model('Component', ComponentSchema);