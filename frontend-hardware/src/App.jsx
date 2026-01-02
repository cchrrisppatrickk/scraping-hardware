// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';

function App() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta una sola vez cuando carga la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacemos la petición a tu Backend Local
        const response = await axios.get('http://localhost:3000/api/v1/components');
        
        // Guardamos los datos en el estado
        setComponents(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error conectando al backend:", err);
        setError("No se pudo conectar con el servidor. ¿Está encendido?");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8">
      {/* Encabezado */}
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Hardware<span className="text-blue-600">Price</span>Tracker
        </h1>
        <p className="text-gray-600">Comparador de precios en tiempo real</p>
      </header>

      {/* Estados de Carga y Error */}
      {loading && <p className="text-center text-xl">Cargando componentes...</p>}
      
      {error && (
        <div className="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Grilla de Productos */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {components.map((comp) => (
          <Card key={comp._id} component={comp} />
        ))}
      </main>
    </div>
  );
}

export default App;