const cheerio = require('cheerio');

class GenericStrategy {
    async scrape(page) {
        // 1. Obtener el HTML completo de la página ya renderizada por Puppeteer
        const content = await page.content();
        const $ = cheerio.load(content);
        
        let data = {
            price: 0,
            currency: 'PEN', // Moneda por defecto si falla la detección
            name: '',
            image: '',
            stock: true
        };

        // --- NIVEL 1: JSON-LD (Schema.org) ---
        // Es el estándar de oro. Google obliga a las tiendas a usarlo.
        try {
            const jsonLdScripts = $('script[type="application/ld+json"]');
            
            jsonLdScripts.each((i, script) => {
                const json = JSON.parse($(script).html());
                
                // A veces el JSON es un array, a veces un objeto. Buscamos "Product".
                const product = Array.isArray(json) 
                    ? json.find(item => item['@type'] === 'Product') 
                    : (json['@type'] === 'Product' ? json : null);

                if (product) {
                    data.name = product.name || data.name;
                    data.image = product.image || data.image;
                    
                    // El precio suele estar dentro de "offers"
                    if (product.offers) {
                        const offer = Array.isArray(product.offers) ? product.offers[0] : product.offers;
                        data.price = parseFloat(offer.price);
                        data.currency = offer.priceCurrency || data.currency;
                        data.stock = offer.availability ? offer.availability.includes('InStock') : true;
                    }
                }
            });
        } catch (e) {
            console.log("Error parseando JSON-LD:", e.message);
        }

        // --- NIVEL 2: Open Graph (Meta Tags) ---
        // Si falló el JSON-LD, buscamos las etiquetas de Facebook/Twitter
        if (!data.price || data.price === 0) {
            data.name = data.name || $('meta[property="og:title"]').attr('content');
            data.image = data.image || $('meta[property="og:image"]').attr('content');
            
            const ogPrice = $('meta[property="product:price:amount"]').attr('content') || 
                            $('meta[property="og:price:amount"]').attr('content');
            
            if (ogPrice) data.price = parseFloat(ogPrice);
            
            const ogCurrency = $('meta[property="product:price:currency"]').attr('content') || 
                               $('meta[property="og:price:currency"]').attr('content');
            if (ogCurrency) data.currency = ogCurrency;
        }

        // --- NIVEL 3: Selectores CSS Comunes (Fallback desesperado) ---
        // Si todo falla, intentamos adivinar clases comunes
        if (!data.price || data.price === 0) {
            const potentialSelectors = ['.price', '.current-price', '.product-price', '#price-block'];
            for (const selector of potentialSelectors) {
                const text = $(selector).first().text().trim();
                // Regex para extraer números de texto sucio como "S/. 1,200.00"
                const match = text.match(/[\d,.]+/); 
                if (match) {
                    data.price = parseFloat(match[0].replace(/,/g, ''));
                    break;
                }
            }
        }

        return data;
    }
}

module.exports = new GenericStrategy();