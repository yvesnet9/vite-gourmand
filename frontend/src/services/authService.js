import api from './api';

const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      // Nettoyer le token des guillemets éventuels
      const token = String(response.data.token).replace(/^["']|["']$/g, '');
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    
    // Nettoyer le token des guillemets éventuels
    const token = String(response.data.token).replace(/^["']|["']$/g, '');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Obtenir l'utilisateur connecté
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Vérifier si connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;