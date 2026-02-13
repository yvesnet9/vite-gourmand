import api from './api';

const adminService = {
  // ============ MENUS ============
  
  // Liste tous les menus (admin)
  getAllMenus: async () => {
    const response = await api.get('/admin/menus');
    return response.data;
  },

  // Créer un menu
  createMenu: async (menuData) => {
    const response = await api.post('/admin/menus', menuData);
    return response.data;
  },

  // Modifier un menu
  updateMenu: async (id, menuData) => {
    const response = await api.put(`/admin/menus/${id}`, menuData);
    return response.data;
  },

  // Supprimer un menu
  deleteMenu: async (id) => {
    const response = await api.delete(`/admin/menus/${id}`);
    return response.data;
  },

  // ============ PLATS ============
  
  // Liste tous les plats (admin)
  getAllPlats: async () => {
    const response = await api.get('/admin/plats');
    return response.data;
  },

  // Créer un plat
  createPlat: async (platData) => {
    const response = await api.post('/admin/plats', platData);
    return response.data;
  },

  // Modifier un plat
  updatePlat: async (id, platData) => {
    const response = await api.put(`/admin/plats/${id}`, platData);
    return response.data;
  },

  // Supprimer un plat
  deletePlat: async (id) => {
    const response = await api.delete(`/admin/plats/${id}`);
    return response.data;
  },

  // ============ ALLERGÈNES ============
  
  // Liste tous les allergènes
  getAllAllergenes: async () => {
    const response = await api.get('/admin/allergenes');
    return response.data;
  },

  // Créer un allergène
  createAllergene: async (allergeneData) => {
    const response = await api.post('/admin/allergenes', allergeneData);
    return response.data;
  },

  // Modifier un allergène
  updateAllergene: async (id, allergeneData) => {
    const response = await api.put(`/admin/allergenes/${id}`, allergeneData);
    return response.data;
  },

  // Supprimer un allergène
  deleteAllergene: async (id) => {
    const response = await api.delete(`/admin/allergenes/${id}`);
    return response.data;
  },

  // ============ AVIS ============
  
  // Liste tous les avis en attente de validation
  getPendingAvis: async () => {
    const response = await api.get('/admin/avis/pending');
    return response.data;
  },

  // Valider un avis
  validerAvis: async (id) => {
    const response = await api.put(`/admin/avis/${id}/valider`);
    return response.data;
  },

  // Rejeter un avis
  rejeterAvis: async (id) => {
    const response = await api.delete(`/admin/avis/${id}`);
    return response.data;
  },
};

export default adminService;