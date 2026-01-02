import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { useBuilderStore } from '../stores/useBuilderStore'; // Importamos el cerebro
import Card from '../components/Card';

function CatalogPage() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hooks de navegación y store
  const navigate = useNavigate();
  const addComponent = useBuilderStore((state) => state.addComponent);

  // Cargar datos del Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/components');
        setComponents(response.data.data);
      } catch (error) {
        console.error("Error cargando catálogo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función manejadora: Agrega al store y vuelve al Builder
  const handleAddToBuild = (component) => {
    // 1. Guardar en el estado global
    addComponent('cpu', component);
    // 2. Redirigir al usuario a la página de armado
    navigate('/');
  };

  if (loading) return <div className="text-center p-10">Cargando componentes...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seleccionar Procesador</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {components.map((comp) => (
          // Pasamos una prop especial "onSelect" a la tarjeta
          <Card 
            key={comp._id} 
            component={comp} 
            onSelect={() => handleAddToBuild(comp)} 
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;