import React from 'react';

// Función auxiliar para simular precios (Solo para esta fase de UI)
const getMockPrices = (basePrice) => {
  // Variamos el precio un poco para que parezca real
  return [
    { name: 'Amazon', price: basePrice, stock: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'CyberPuerta', price: basePrice - 5, stock: true, logo: 'https://www.cyberpuerta.mx/out/cyberpuertaV4/img/logo.png' },
    { name: 'DD Tech', price: basePrice + 12, stock: false, logo: '' }, // Sin stock
    { name: 'MercadoLibre', price: basePrice + 8, stock: true, logo: 'https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png' },
  ];
};

function PriceTable({ basePrice }) {
  const stores = getMockPrices(basePrice);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <h3 className="font-bold text-gray-700">Comparativa de Tiendas</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {stores.map((store, index) => (
          <div key={index} className="grid grid-cols-12 items-center p-4 hover:bg-gray-50 transition">
            
            {/* 1. Tienda (Logo o Nombre) */}
            <div className="col-span-4 sm:col-span-3 font-medium text-gray-800 flex items-center">
               {store.logo && store.name !== 'DD Tech' ? (
                   <img src={store.logo} alt={store.name} className="h-6 object-contain max-w-[100px]" />
               ) : (
                   <span>{store.name}</span>
               )}
            </div>

            {/* 2. Estado (Stock) */}
            <div className="col-span-4 sm:col-span-3 text-sm">
              {store.stock ? (
                <span className="text-green-600 flex items-center gap-1">
                  ● En Stock
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-1">
                  ✕ Agotado
                </span>
              )}
            </div>

            {/* 3. Precio */}
            <div className="col-span-4 sm:col-span-3 text-right sm:text-left font-bold text-gray-900">
              ${store.price.toFixed(2)}
            </div>

            {/* 4. Botón de Acción */}
            <div className="col-span-12 sm:col-span-3 mt-3 sm:mt-0 text-right">
              {store.stock ? (
                <a 
                  href="#" 
                  className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded font-semibold text-sm hover:bg-yellow-500 transition shadow-sm w-full sm:w-auto text-center"
                >
                  Ver Tienda ↗
                </a>
              ) : (
                <button disabled className="bg-gray-200 text-gray-400 px-4 py-2 rounded text-sm w-full sm:w-auto cursor-not-allowed">
                  Sin Stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceTable;