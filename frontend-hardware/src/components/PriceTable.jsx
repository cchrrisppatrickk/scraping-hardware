import React from 'react';

// Helper para formatear fechas (ej: "hace 5 minutos")
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function PriceTable({ stores }) {
  // Si no hay tiendas rastreadas aún
  if (!stores || stores.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
        <p>No hay tiendas rastreadas para este producto aún.</p>
        <p className="text-xs mt-1">¡Sé el primero en agregar un link abajo!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-gray-700">Comparativa de Tiendas (Real)</h3>
        <span className="text-xs text-gray-500">{stores.length} opciones</span>
      </div>
      
      <div className="divide-y divide-gray-100">
        {stores.map((store) => (
          <div key={store._id} className="grid grid-cols-12 items-center p-4 hover:bg-gray-50 transition">
            
            {/* 1. Tienda */}
            <div className="col-span-4 sm:col-span-3 font-medium text-gray-800 capitalize">
               {store.store_name}
            </div>

            {/* 2. Precio */}
            <div className="col-span-4 sm:col-span-3 font-bold text-gray-900">
              {store.currency} {store.price.toFixed(2)}
            </div>

            {/* 3. Info Extra (Fecha) */}
            <div className="col-span-4 sm:col-span-3 text-xs text-gray-500">
               Actualizado: <br/> {formatDate(store.last_checked)}
            </div>

            {/* 4. Botón */}
            <div className="col-span-12 sm:col-span-3 mt-3 sm:mt-0 text-right">
              <a 
                href={store.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-medium text-sm hover:bg-blue-200 transition"
              >
                Ir a Tienda ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceTable;