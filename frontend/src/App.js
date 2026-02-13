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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/menus" element={<MenusListPage />} />
            <Route path="/menus/:id" element={<MenuDetailPage />} />
            <Route path="/commander/:menuId" element={<CommanderPage />} />
            <Route path="/mes-commandes" element={<MesCommandesPage />} />
            <Route path="/mes-commandes/:id" element={<CommandeDetailPage />} />
            <Route path="/dashboard-employe" element={<DashboardEmployePage />} />
            <Route path="/admin/menus" element={<MenusAdminPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;