import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useBuilderStore } from '../stores/useBuilderStore';
import PriceTable from '../components/PriceTable';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addComponent = useBuilderStore((state) => state.addComponent);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/components/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToBuild = () => {
    if (product) {
      addComponent('cpu', product);
      navigate('/'); // Volver al dashboard
    }
  };

  if (loading) return <div className="text-center p-10">Cargando detalles...</div>;
  if (error || !product) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Botón Volver */}
      <button 
        onClick={() => navigate(-1)} 
        className="text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-2 font-medium"
      >
        ← Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center min-h-[300px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full max-h-[300px] object-contain"
            />
          </div>
        </div>

        {/* --- COLUMNA CENTRAL/DERECHA: INFO Y PRECIOS --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Encabezado del Producto */}
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className={`px-2 py-1 rounded text-xs font-bold text-white ${product.brand === 'AMD' ? 'bg-red-600' : 'bg-blue-600'}`}>
                 {product.brand}
               </span>
               <span className="text-gray-500 text-sm font-mono uppercase">{product.type}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div>
                <p className="text-xs text-gray-500 uppercase">Núcleos</p>
                <p className="font-semibold">{product.specs.core_count}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Frecuencia</p>
                <p className="font-semibold">{product.specs.core_clock}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Socket</p>
                <p className="font-semibold">{product.specs.socket || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">TDP</p>
                <p className="font-semibold">{product.specs.tdp}W</p>
              </div>
            </div>
          </div>

          {/* Botón Principal de Acción */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
             <div>
                <p className="text-sm text-blue-800">Mejor precio encontrado</p>
                <p className="text-3xl font-bold text-blue-900">${product.price}</p>
             </div>
             <button 
               onClick={handleAddToBuild}
               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition transform hover:scale-105"
             >
               + Añadir a mi Build
             </button>
          </div>

          {/* Tabla de Comparación (Mock) */}
          <PriceTable basePrice={product.price} />

        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;