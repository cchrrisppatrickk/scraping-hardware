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
  
  // Estados para agregar link
  const [newLink, setNewLink] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [addError, setAddError] = useState(null);

  // Función para cargar datos (Reutilizable para recargar después de agregar)
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/components/${id}`);
      setProduct(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // MANEJADOR: Agregar nuevo link
  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!newLink) return;

    setIsAddingLink(true);
    setAddError(null);

    try {
      // Llamada al endpoint que creaste en Fase 2
      await axios.post(`http://localhost:3000/api/v1/components/${id}/add-link`, {
        url: newLink
      });
      
      // Si funciona: Limpiamos input y recargamos los datos para ver la tabla actualizada
      setNewLink('');
      await fetchProduct(); 
      alert("¡Enlace agregado y precio extraído con éxito!");
      
    } catch (err) {
      console.error(err);
      setAddError(err.response?.data?.error || "Error al agregar el enlace. Verifica que sea válido.");
    } finally {
      setIsAddingLink(false);
    }
  };

  const handleAddToBuild = () => {
    if (product) {
      addComponent('cpu', product);
      navigate('/'); 
    }
  };

  if (loading) return <div className="text-center p-10">Cargando...</div>;
  if (!product) return <div className="text-center p-10 text-red-500">Producto no encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-2">
        ← Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- IZQUIERDA: IMAGEN --- */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center min-h-[300px]">
            <img src={product.image} alt={product.name} className="max-w-full max-h-[300px] object-contain" />
          </div>
        </div>

        {/* --- DERECHA: DATOS --- */}
        <div className="lg:col-span-2 space-y-8">
          
          <div>
            <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded uppercase">{product.brand}</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-4">{product.name}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
               <div><p className="text-xs text-gray-500">Núcleos</p><p className="font-bold">{product.specs.core_count}</p></div>
               <div><p className="text-xs text-gray-500">Reloj</p><p className="font-bold">{product.specs.core_clock}</p></div>
               <div><p className="text-xs text-gray-500">Socket</p><p className="font-bold">{product.specs.socket || 'N/A'}</p></div>
               <div><p className="text-xs text-gray-500">Precio Ref.</p><p className="font-bold">${product.price}</p></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
             <button 
               onClick={handleAddToBuild}
               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 w-full md:w-auto"
             >
               + Añadir a mi Build
             </button>
          </div>

          <hr className="border-gray-200" />

          {/* --- SECCIÓN TRACKING --- */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Rastreador de Precios</h2>
            
            {/* Tabla Real */}
            <PriceTable stores={product.tracked_stores} />

            {/* Formulario Agregar Link */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2 text-sm">¿Encontraste un mejor precio?</h4>
              <form onSubmit={handleAddLink} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="url" 
                  placeholder="Pega aquí el link del producto (ej: CyberPuerta, Amazon...)" 
                  className="flex-grow border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  disabled={isAddingLink}
                  className={`px-4 py-2 rounded text-white text-sm font-bold ${isAddingLink ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800'}`}
                >
                  {isAddingLink ? 'Analizando...' : 'Rastrear'}
                </button>
              </form>
              {addError && <p className="text-red-500 text-xs mt-2">{addError}</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;