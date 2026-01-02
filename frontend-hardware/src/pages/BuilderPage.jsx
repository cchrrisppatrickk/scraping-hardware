import { Link } from 'react-router-dom';

function BuilderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tu Configuración Actual</h1>
      
      {/* Simulación de un Slot Vacío */}
      <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Procesador (CPU)</h3>
          <p className="text-sm text-gray-500">No has seleccionado ningún componente.</p>
        </div>
        <Link 
          to="/catalog?category=cpu" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Agregar CPU
        </Link>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded text-right">
        <p className="text-xl font-bold">Total Estimado: $0.00</p>
      </div>
    </div>
  );
}

export default BuilderPage;