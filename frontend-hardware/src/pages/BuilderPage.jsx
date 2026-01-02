import { Link } from 'react-router-dom';
import { useBuilderStore } from '../stores/useBuilderStore'; // Importar Store

function BuilderPage() {
  // Leemos el estado global
  const { selectedComponents, totalPrice, removeComponent } = useBuilderStore();
  const cpu = selectedComponents.cpu;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Tu PC Gamer</h1>
      <p className="text-gray-500 mb-8">Selecciona los componentes para armar tu presupuesto.</p>
      
      {/* --- SLOT DE CPU --- */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Procesador</h3>
        
        {cpu ? (
          // ESTADO: COMPONENTE SELECCIONADO
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center gap-4">
            {/* Foto pequeña */}
            <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center p-2">
              <img src={cpu.image} alt={cpu.name} className="max-h-full object-contain" />
            </div>
            
            {/* Info */}
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800">{cpu.name}</h4>
              <p className="text-sm text-gray-500">{cpu.specs.core_count} Cores | {cpu.specs.core_clock}</p>
            </div>

            {/* Precio */}
            <div className="text-right mr-4">
              <p className="font-bold text-green-700 text-lg">${cpu.price}</p>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col gap-2">
               <Link to="/catalog" className="text-blue-600 text-sm hover:underline">Cambiar</Link>
               <button 
                 onClick={() => removeComponent('cpu')}
                 className="text-red-500 text-sm hover:underline"
               >
                 Quitar
               </button>
            </div>
          </div>
        ) : (
          // ESTADO: SLOT VACÍO
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-between hover:bg-gray-100 transition-colors">
             <div className="flex items-center gap-3">
               <span className="text-3xl opacity-30">🧠</span>
               <div>
                 <p className="font-medium text-gray-600">Procesador (CPU)</p>
                 <p className="text-xs text-gray-400">El cerebro de tu computadora</p>
               </div>
             </div>
             
             <Link 
               to="/catalog" 
               className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 shadow-sm transition-all transform hover:scale-105"
             >
               + Agregar
             </Link>
          </div>
        )}
      </div>

      {/* --- RESUMEN TOTAL --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none md:mt-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center bg-gray-900 text-white p-5 md:rounded-xl">
          <div>
            <p className="text-gray-400 text-sm">Costo Estimado</p>
            <p className="text-3xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition shadow-lg">
            Guardar Cotización
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;