import api from './api';

const avisService = {
  // Récupérer tous les avis validés
  getAvis: async () => {
    const response = await api.get('/avis');
    return response.data;
  },

  // Récupérer les avis en attente de validation (employé/admin)
  getPendingAvis: async () => {
    const response = await api.get('/avis/pending');
    return response.data;
  },

  // Créer un nouvel avis
  createAvis: async (avisData) => {
    const response = await api.post('/avis', avisData);
    return response.data;
  },

  // Valider un avis (employé/admin)
  validateAvis: async (id) => {
    const response = await api.put(`/avis/${id}`, { valide: true });
    return response.data;
  },

  // Refuser/Supprimer un avis (employé/admin)
  deleteAvis: async (id) => {
    const response = await api.delete(`/avis/${id}`);
    return response.data;
  },
};

export default avisService;