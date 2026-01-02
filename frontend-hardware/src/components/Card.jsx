// src/components/Card.jsx
function Card({ component }) {
  // Desestructuramos los datos para escribir menos
  const { name, price, image, specs, brand } = component;

  // Color dinámico según la marca
  const brandColor = brand === 'AMD' ? 'bg-red-600' : 'bg-blue-600';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Imagen */}
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center p-4">
        <img 
          src={image} 
          alt={name} 
          className="max-h-full object-contain"
        />
      </div>

      {/* Contenido */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className={`${brandColor} text-white text-xs font-bold px-2 py-1 rounded`}>
            {brand}
          </span>
          <span className="text-gray-500 text-xs font-mono">
            {component.type.toUpperCase()}
          </span>
        </div>

        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 h-12 overflow-hidden">
          {name}
        </h3>

        {/* Specs Resumidas */}
        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <p>🧩 Núcleos: <span className="font-semibold">{specs.core_count}</span></p>
          <p>⚡ Reloj: <span className="font-semibold">{specs.core_clock}</span></p>
        </div>

        {/* Precio */}
        <div className="flex justify-between items-center border-t pt-3">
          <span className="text-2xl font-bold text-green-600">
            ${price}
          </span>
          <button className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;