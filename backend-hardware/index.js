// 1. IMPORTAR LA LIBRERÍA
// "require" es como decir: "Node, ve a la carpeta node_modules, busca 'puppeteer' y tráelo aquí".
const puppeteer = require('puppeteer');

// 2. FUNCIÓN PRINCIPAL ASÍNCRONA
// Usamos "async" porque el scraping toma tiempo. Node.js no se queda bloqueado esperando,
// sino que gestiona promesas. "async" nos permite usar "await".
async function iniciarScraping() {
    
    console.log("--- Iniciando Robot ---");

    // 3. LANZAR EL NAVEGADOR
    // "await": Significa "Espera a que el navegador abra antes de pasar a la siguiente línea".
    // headless: false -> Para que VEAS el navegador abrirse (modo visible).
    const browser = await puppeteer.launch({ headless: false });
    
    // 4. ABRIR UNA NUEVA PESTAÑA
    const page = await browser.newPage();

    // 5. IR A UNA URL
    console.log("Yendo a Google...");
    await page.goto('https://www.google.com');

    // 6. OBTENER DATOS (Ej: El Título)
    // page.title() obtiene el título de la pestaña.
    const titulo = await page.title();

    console.log(`¡Éxito! El título de la página es: "${titulo}"`);

    // 7. CERRAR EL NAVEGADOR
    // Esperamos 3 segundos para que te dé tiempo de verlo
    await new Promise(r => setTimeout(r, 3000));
    
    await browser.close();
    console.log("--- Robot Finalizado ---");
}

// 8. EJECUTAR LA FUNCIÓN
iniciarScraping();