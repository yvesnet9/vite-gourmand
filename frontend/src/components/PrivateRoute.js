import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requireAdmin = false, requireEmployee = false }) => {
  const { user, isAuthenticated, isAdmin, isEmployee, loading } = useAuth();

  // Attendre le chargement
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  // Vérifier aussi le token dans localStorage
  const token = localStorage.getItem('token');
  
  // Pas connecté -> redirection vers login
  if (!isAuthenticated() || !user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Requiert admin mais pas admin -> redirection accueil
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Requiert employé/admin mais pas employé/admin -> redirection accueil
  if (requireEmployee && !isEmployee()) {
    return <Navigate to="/" replace />;
  }

  // Autorisé -> afficher la page
  return children;
};

export default PrivateRoute;