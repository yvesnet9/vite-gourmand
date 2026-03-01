import api from './api';

const avisService = {
  // Récupérer tous les avis validés
  getAvis: async () => {
    const response = await api.get('/avis');
    return response.data;
  },

  // Créer un nouvel avis
  createAvis: async (avisData) => {
    const response = await api.post('/avis', avisData);
    return response.data;
  },
};

export default avisService;