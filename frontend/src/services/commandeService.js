import api from './api';

const commandeService = {
  // Créer une commande
  createCommande: async (commandeData) => {
    const response = await api.post('/commandes', commandeData);
    return response.data;
  },

  // Liste des commandes de l'utilisateur
  getMesCommandes: async () => {
    const response = await api.get('/commandes');
    return response.data;
  },

  // Liste de TOUTES les commandes (admin/employé uniquement)
  getAllCommandes: async () => {
    const response = await api.get('/commandes/all');
    return response.data;
  },

  // Détail d'une commande
  getCommandeById: async (id) => {
    const response = await api.get(`/commandes/${id}`);
    return response.data;
  },

  // Mettre à jour une commande (changement de statut)
  updateCommande: async (id, data) => {
    const response = await api.put(`/commandes/${id}`, data);
    return response.data;
  },

  // Annuler une commande
  annulerCommande: async (id) => {
    const response = await api.delete(`/commandes/${id}`);
    return response.data;
  },

  // Obtenir l'historique des suivis
  getSuivisCommande: async (commandeId) => {
    const response = await api.get(`/commandes/${commandeId}/suivis`);
    return response.data;
  },
};

export default commandeService;
