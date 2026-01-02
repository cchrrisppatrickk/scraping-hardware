import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBuilderStore } from '../stores/useBuilderStore';
import Card from '../components/Card';
import FilterSidebar from '../components/FilterSidebar'; // <-- Importamos el Sidebar

function CatalogPage() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ESTADO DE FILTROS: Aquí vive la verdad de qué está filtrando el usuario
  const [filters, setFilters] = useState({
    brand: '', // Puede ser 'AMD', 'Intel' o '' (vacío)
    // sort: 'price_asc' (Futuro)
  });

  const navigate = useNavigate();
  const addComponent = useBuilderStore((state) => state.addComponent);

  // Función para actualizar un filtro específico
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // EFECTO: Se ejecuta al cargar Y cada vez que cambian los filtros
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Construimos los parámetros para Axios
        // Esto generará: http://.../components?brand=AMD
        const params = {};
        if (filters.brand) params.brand = filters.brand;

        const response = await axios.get('http://localhost:3000/api/v1/components', { params });
        
        setComponents(response.data.data);
      } catch (error) {
        console.error("Error cargando catálogo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]); // <--- OJO: [filters] significa "ejecuta esto cuando filters cambie"

  const handleAddToBuild = (component) => {
    addComponent('cpu', component);
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* --- IZQUIERDA: SIDEBAR --- */}
        <aside className="w-full md:w-64 flex-shrink-0">
           <FilterSidebar 
              currentFilters={filters} 
              onFilterChange={handleFilterChange} 
           />
        </aside>

        {/* --- DERECHA: GRILLA DE PRODUCTOS --- */}
        <main className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Procesadores</h1>
            <span className="text-sm text-gray-500">
               {loading ? '...' : `${components.length} resultados`}
            </span>
          </div>

          {loading ? (
             // Skeleton Loading simple (Efecto de carga)
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
               {[1,2,3].map(i => <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>)}
             </div>
          ) : components.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {components.map((comp) => (
                <Card 
                  key={comp._id} 
                  component={comp} 
                  onSelect={() => handleAddToBuild(comp)} 
                />
              ))}
            </div>
          ) : (
            // Estado vacío (No hay resultados)
            <div className="text-center py-20 bg-white rounded-lg border border-dashed">
              <p className="text-gray-500 text-lg">No encontramos procesadores con esos filtros.</p>
              <button 
                onClick={() => setFilters({ brand: '' })}
                className="mt-2 text-blue-600 font-medium hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default CatalogPage;