const express = require('express');
const router = express.Router();

// IMPORTACIÓN CORRECTA
// Nota: .. sube a 'src/api', luego entramos a 'controllers'
const controller = require('../controllers/componentController');

// --- DEBUG DE SEGURIDAD ---
// Esto imprimirá en tu consola qué funciones se importaron.
// Si ves "undefined", sabrás cuál es el problema.
console.log("Cargando rutas de componentes...");
console.log("Funciones disponibles:", Object.keys(controller));

// Verificar que las funciones existen antes de asignarlas
if (!controller.getComponents || !controller.addTrackedLink) {
    console.error("❌ ERROR FATAL: Alguna función del controlador es UNDEFINED. Revisa las exportaciones.");
}

// --- DEFINICIÓN DE RUTAS ---

router.route('/')
    .get(controller.getComponents);

router.route('/:id')
    .get(controller.getComponentById);

router.route('/:id/add-link')
    .post(controller.addTrackedLink);

module.exports = router;