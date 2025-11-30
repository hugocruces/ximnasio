import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ClasesPage } from './pages/ClasesPage';
import { InstalacionesPage } from './pages/InstalacionesPage';
import { PreciosPage } from './pages/PreciosPage';
import { ContactoPage } from './pages/ContactoPage';
import { LoginPage } from './pages/LoginPage';

// User Pages
import { DashboardPage } from './pages/user/DashboardPage';
import { PerfilPage } from './pages/user/PerfilPage';
import { MisReservasPage } from './pages/user/MisReservasPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsuariosPage } from './pages/admin/AdminUsuariosPage';
import { AdminClasesPage } from './pages/admin/AdminClasesPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/clases" element={<ClasesPage />} />
            <Route path="/instalaciones" element={<InstalacionesPage />} />
            <Route path="/precios" element={<PreciosPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* User Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <PerfilPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mis-reservas"
              element={
                <ProtectedRoute>
                  <MisReservasPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminUsuariosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clases"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminClasesPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
