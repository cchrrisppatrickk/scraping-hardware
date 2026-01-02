const express = require('express');
const router = express.Router();
const { getComponents, getComponentById } = require('../controllers/componentController');

// Definimos las rutas raíz (ej: /api/v1/components)
router.route('/')
    .get(getComponents); // Cuando hagan GET, ejecuta getComponents

// Definimos rutas con parámetros (ej: /api/v1/components/12345)
router.route('/:id')
    .get(getComponentById);

module.exports = router;