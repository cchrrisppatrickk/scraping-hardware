import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barra de Navegación Fija */}
      <nav className="bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <span className="text-2xl font-extrabold text-gray-900">
                  Hardware<span className="text-blue-600">Tracker</span>
                </span>
              </Link>
            </div>

            {/* Enlaces del Menú */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                🛠️ Armar PC
              </Link>
              <Link to="/catalog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                📦 Catálogo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Dinámico (Aquí se cargarán las páginas) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer sencillo */}
      <footer className="bg-gray-900 text-white py-6 text-center text-sm">
        <p>© 2026 HardwareTracker - Proyecto de Aprendizaje</p>
      </footer>
    </div>
  );
}

export default Layout;