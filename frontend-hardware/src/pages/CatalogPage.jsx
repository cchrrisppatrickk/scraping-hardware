import { Link } from 'react-router-dom';

function CatalogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Componentes</h1>
      <p className="mb-4 text-gray-600">Aquí cargaremos la lista desde la API...</p>
      
      {/* Ejemplo de link a detalle */}
      <Link to="/product/123" className="text-blue-600 underline">
        Ver ejemplo de detalle de producto
      </Link>
    </div>
  );
}

export default CatalogPage;