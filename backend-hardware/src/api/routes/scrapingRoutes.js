const express = require('express');
const router = express.Router();
const { trackProduct } = require('../controllers/scrapingController');

router.post('/track', trackProduct);

module.exports = router;