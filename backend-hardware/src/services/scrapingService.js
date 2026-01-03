const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const scraperFactory = require('../scrapers/ScraperFactory');

puppeteer.use(StealthPlugin());

class ScrapingService {
    async scrapeProduct(url) {
        let browser = null;
        try {
            console.log(`🕷️ Iniciando scraping en: ${url}`);

            // Lanzamos navegador oculto (headless: "new" es más rápido en versiones nuevas)
            browser = await puppeteer.launch({
                headless: "new", 
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            
            // Configurar Viewport y User Agent para parecer real
            await page.setViewport({ width: 1366, height: 768 });
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

            // Navegar (Timeout de 30s)
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

            // Obtener la estrategia correcta
            const strategy = scraperFactory.getStrategy(url);
            
            // Ejecutar extracción
            const data = await strategy.scrape(page);

            // Agregar la URL fuente al resultado
            data.sourceUrl = url;
            data.scrapedAt = new Date();

            console.log("✅ Datos extraídos:", data);
            return data;

        } catch (error) {
            console.error("❌ Error en scraping:", error.message);
            throw new Error(`Fallo al scrapear: ${error.message}`);
        } finally {
            if (browser) await browser.close();
        }
    }
}

module.exports = new ScrapingService();