import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenusListPage from './pages/MenusListPage';
import MenuDetailPage from './pages/MenuDetailPage.js';

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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;