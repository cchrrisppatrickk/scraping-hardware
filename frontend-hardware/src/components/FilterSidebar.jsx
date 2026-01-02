function FilterSidebar({ currentFilters, onFilterChange }) {
  
  // Manejador para cambios en los checkboxes de Marca
  const handleBrandChange = (brand) => {
    // Si ya está seleccionada, la desmarcamos (null), si no, la marcamos
    const newValue = currentFilters.brand === brand ? '' : brand;
    onFilterChange('brand', newValue);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 w-full md:w-64 flex-shrink-0 h-fit sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Filtros</h3>
        {/* Botón para limpiar filtros */}
        {(currentFilters.brand) && (
          <button 
            onClick={() => onFilterChange('brand', '')}
            className="text-xs text-red-500 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* --- SECCIÓN MARCAS --- */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">
          Fabricante
        </h4>
        <div className="space-y-2">
          
          {/* Opción AMD */}
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={currentFilters.brand === 'AMD'}
              onChange={() => handleBrandChange('AMD')}
            />
            <span className="text-gray-700 group-hover:text-blue-600 transition">AMD</span>
          </label>

          {/* Opción Intel */}
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={currentFilters.brand === 'Intel'}
              onChange={() => handleBrandChange('Intel')}
            />
            <span className="text-gray-700 group-hover:text-blue-600 transition">Intel</span>
          </label>

        </div>
      </div>

      {/* --- SECCIÓN PRECIO (Visual por ahora) --- */}
      <div>
        <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">
          Rango de Precio
        </h4>
        <div className="flex gap-2 items-center">
            <input type="number" placeholder="Min" className="w-full border rounded px-2 py-1 text-sm" disabled />
            <span>-</span>
            <input type="number" placeholder="Max" className="w-full border rounded px-2 py-1 text-sm" disabled />
        </div>
        <p className="text-xs text-gray-400 mt-2">Próximamente</p>
      </div>

    </div>
  );
}

export default FilterSidebar;