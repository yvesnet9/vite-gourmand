import api from './api';

const menuService = {
  // Liste tous les menus avec filtres optionnels
  getMenus: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.prix_max) params.append('prix_max', filters.prix_max);
    if (filters.prix_min) params.append('prix_min', filters.prix_min);
    if (filters.theme) params.append('theme', filters.theme);
    if (filters.regime) params.append('regime', filters.regime);
    if (filters.nb_personnes) params.append('nb_personnes', filters.nb_personnes);
    
    const response = await api.get(`/menus?${params.toString()}`);
    return response.data;
  },

  // Obtenir un menu par son ID
  getMenuById: async (id) => {
    const response = await api.get(`/menus/${id}`);
    return response.data;
  },
};

export default menuService;