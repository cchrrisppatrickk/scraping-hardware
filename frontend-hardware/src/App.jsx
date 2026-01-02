import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BuilderPage from './pages/BuilderPage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout envuelve a todas las rutas internas */}
        <Route path="/" element={<Layout />}>
          
          {/* Ruta Principal: El Armador de PC */}
          <Route index element={<BuilderPage />} />
          
          {/* Ruta Catálogo: Lista de productos */}
          <Route path="catalog" element={<CatalogPage />} />
          
          {/* Ruta Detalle: :id es dinámico (ej: /product/abc-123) */}
          <Route path="product/:id" element={<ProductDetailPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;