import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenusListPage from './pages/MenusListPage';
import MenuDetailPage from './pages/MenuDetailPage';
import CommanderPage from './pages/CommanderPage';
import MesCommandesPage from './pages/MesCommandesPage';
import CommandeDetailPage from './pages/CommandeDetailPage';
import DashboardEmployePage from './pages/DashboardEmployePage';
import MenusAdminPage from './pages/admin/MenusAdminPage';
import PlatsAdminPage from './pages/admin/PlatsAdminPage';
import AllergenesAdminPage from './pages/admin/AllergenesAdminPage';
import AvisAdminPage from './pages/admin/AvisAdminPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/menus" element={<MenusListPage />} />
            <Route path="/menus/:id" element={<MenuDetailPage />} />

            {/* Routes utilisateurs authentifiés */}
            <Route path="/commander/:menuId" element={
              <PrivateRoute>
                <CommanderPage />
              </PrivateRoute>
            } />
            <Route path="/mes-commandes" element={
              <PrivateRoute>
                <MesCommandesPage />
              </PrivateRoute>
            } />
            <Route path="/mes-commandes/:id" element={
              <PrivateRoute>
                <CommandeDetailPage />
              </PrivateRoute>
            } />

            {/* Routes employés/admins */}
            <Route path="/dashboard-employe" element={
              <PrivateRoute requireEmployee>
                <DashboardEmployePage />
              </PrivateRoute>
            } />
            <Route path="/admin/avis" element={
              <PrivateRoute requireEmployee>
                <AvisAdminPage />
              </PrivateRoute>
            } />

            {/* Routes admin uniquement */}
            <Route path="/admin/menus" element={
              <PrivateRoute requireAdmin>
                <MenusAdminPage />
              </PrivateRoute>
            } />
            <Route path="/admin/plats" element={
              <PrivateRoute requireAdmin>
                <PlatsAdminPage />
              </PrivateRoute>
            } />
            <Route path="/admin/allergenes" element={
              <PrivateRoute requireAdmin>
                <AllergenesAdminPage />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;