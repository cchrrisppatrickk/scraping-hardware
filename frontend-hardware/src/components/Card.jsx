// Agrega Link a los imports
import { Link } from 'react-router-dom';

// Aceptamos una nueva prop: onSelect
function Card({ component, onSelect }) {
  const { name, price, image, specs, brand } = component;
  const brandColor = brand === 'AMD' ? 'bg-red-600' : 'bg-blue-600';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      
      {/* Envolvemos la imagen en un Link hacia el detalle */}
      <Link to={`/product/${component._id}`} className="block h-48 w-full bg-gray-100 ... cursor-pointer">
         {/* Imagen */}
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center p-4 relative">
        <span className={`absolute top-2 left-2 ${brandColor} text-white text-xs font-bold px-2 py-1 rounded`}>
            {brand}
        </span>
        <img src={image} alt={name} className="max-h-full object-contain mix-blend-multiply" />
      </div>
      </Link>




      {/* Contenido */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* El título también es un Link */}
          <Link to={`/product/${component._id}`} className="hover:text-blue-600 transition-colors">
           <h3 className="font-bold text-gray-800 text-md leading-tight mb-2 line-clamp-2">
            {name}
          </h3>
          </Link>
          <div className="text-xs text-gray-500 mb-3 space-y-1">
            <p>🧩 {specs.core_count} Cores • {specs.core_clock}</p>
            <p>⚡ {specs.tdp}W TDP</p>
          </div>
        </div>

        {/* Footer de la tarjeta con Precio y Botón */}
        <div className="mt-2 pt-3 border-t flex justify-between items-center">
          <span className="text-xl font-bold text-green-700">
            ${price}
          </span>
          
          {/* Si nos pasaron la función onSelect, mostramos el botón Añadir */}
          {onSelect && (
            <button 
              onClick={onSelect}
              className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 font-medium transition-colors"
            >
              + Añadir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;