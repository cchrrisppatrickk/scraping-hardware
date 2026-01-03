const genericStrategy = require('./strategies/GenericStrategy');

class ScraperFactory {
    getStrategy(url) {
        const domain = new URL(url).hostname;

        // Aquí agregaremos lógica futura:
        // if (domain.includes('amazon')) return amazonStrategy;
        // if (domain.includes('cyberpuerta')) return cyberpuertaStrategy;

        // Por defecto, devolvemos la genérica
        console.log(`🏭 Usando estrategia GENÉRICA para: ${domain}`);
        return genericStrategy;
    }
}

module.exports = new ScraperFactory();