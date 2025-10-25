import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Home from './views/Home';
import ProductDetail from './components/ProductDetail';
import Register from './views/Register';
import Login from './views/Login';
import Profile from './components/users/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './views/Dashboard';
import HomeDashboard from './components/dashboard/HomeDashboard';
import ProductoManagement from './components/dashboard/ProductoManagement';
import CategoriesManagement from './components/dashboard/CategoriesManagement';
import PromotionsManagement from './components/dashboard/PromotionsManagement';
import UsuarioManagement from './components/dashboard/UsuarioManagement';
import WhatsAppButton from './components/WhatsAppButton';

interface ProtectedRouteProps {
  roleRequired?: "ADMIN" | "USER";
  children: React.ReactNode;
}

// Componente para rutas protegidas
const ProtectedRoute = ({ roleRequired, children }: ProtectedRouteProps) => {
  const { user, isLoggedIn }= useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isLoggedIn || !user) {
    // Redirigir al login y guardar la ubicación a la que intentaba acceder
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  // Si el usuario no tiene el rol correcto, lo manda a "No autorizado"
  if (roleRequired && user.rol !== roleRequired) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { pathname } = useLocation();
  const showHeader = pathname !== '/register' 
  && pathname !== '/admin' 
  && pathname !== '/admin/productos' 
  && pathname !== '/admin/categorias' 
  && pathname !== '/admin/promociones' 
  && pathname !== '/admin/usuarios';

  const showFooter = pathname !== '/register' 
  && pathname !== '/admin' 
  && pathname !== '/admin/productos' 
  && pathname !== '/admin/categorias' 
  && pathname !== '/admin/promociones' 
  && pathname !== '/admin/usuarios';

  return (
    <div >
      <main >
        {showHeader && <Header />}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Rutas protegidas (requieren autenticación) */}
          <Route path="/user/profile" 
          element={
            <ProtectedRoute roleRequired="USER">
              <Profile />
            </ProtectedRoute>
          } />
          {/* Rutas protegidas (requieren rol de administrador) */}
          <Route path="/admin/*" 
              element={
                <ProtectedRoute roleRequired="ADMIN">
                <Dashboard />
                </ProtectedRoute>
              }>
                <Route index element={<HomeDashboard/>} />
                <Route path="productos" element={<ProductoManagement />} />
                <Route path="categorias" element={<CategoriesManagement />} />
                <Route path="promociones" element={<PromotionsManagement />} />
                <Route path="usuarios" element={<UsuarioManagement />} />
          </Route>
                  
          {/* Ruta para manejar URLs no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {showFooter && <Footer />}
        <WhatsAppButton />
      </main>
    </div>
  );
}

export default App;
