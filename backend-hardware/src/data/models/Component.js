const mongoose = require('mongoose');

// Sub-esquema para las tiendas rastreadas
// Esto define qué datos guardamos de cada link externo
const TrackedStoreSchema = new mongoose.Schema({
    store_name: {
        type: String,
        required: true, // Ej: "Amazon", "CyberPuerta"
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true // El precio que encontramos en esa tienda
    },
    currency: {
        type: String,
        default: 'USD', // O 'PEN'
        uppercase: true
    },
    logo: {
        type: String, // URL del logo de la tienda (opcional, para la UI)
        default: ''
    },
    in_stock: {
        type: Boolean,
        default: true
    },
    last_checked: {
        type: Date,
        default: Date.now // Para saber cuándo fue la última actualización
    }
}, { _id: true }); // _id: true permite que cada link tenga su propio ID único

// Esquema Principal del Componente
const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['cpu', 'gpu', 'ram', 'motherboard', 'storage', 'psu', 'case'],
        index: true
    },
    brand: {
        type: String,
        enum: ['Intel', 'AMD', 'NVIDIA', 'Unknown'],
        default: 'Unknown'
    },
    // Este "price" será el PRECIO DE REFERENCIA (Base/MSRP)
    // No se sobrescribe con el scraping diario.
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    // Especificaciones técnicas (estáticas)
    specs: {
        core_count: Number,
        core_clock: String,
        boost_clock: String,
        tdp: Number,
        microarchitecture: String,
        integrated_graphics: String,
        socket: String,
        vram: String
    },
    
    // AQUÍ ESTÁ EL CAMBIO CLAVE:
    // Un array que contiene todos los links externos y sus precios
    tracked_stores: [TrackedStoreSchema],

    last_updated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Component', ComponentSchema);