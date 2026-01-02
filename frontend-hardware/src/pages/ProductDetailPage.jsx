import { useParams, useNavigate } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams(); // Capturamos el ID de la URL
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="text-gray-500 hover:text-gray-900 mb-4 flex items-center gap-1"
      >
        ← Volver
      </button>
      
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900">Detalle del Producto</h1>
        <p className="text-gray-500 mt-2">Viendo el ID del producto: <span className="font-mono bg-gray-100 p-1 rounded">{id}</span></p>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p>Aquí haremos el Scraping de precios en tiempo real para este ID.</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;