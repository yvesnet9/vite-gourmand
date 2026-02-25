import api from './api';

const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/register', userData);
    
    if (response.data && response.data.token && response.data.user) {
      const token = String(response.data.token).replace(/^["']|["']$/g, '');
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    
    if (response.data && response.data.token && response.data.user) {
      const token = String(response.data.token).replace(/^["']|["']$/g, '');
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } else {
      console.error('Login response invalid:', response.data);
      throw new Error('Réponse de connexion invalide');
    }
    
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
    if (userStr && userStr !== 'undefined') {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  },

  // Vérifier si connecté
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!(token && token !== 'undefined');
  },
};

export default authService;
