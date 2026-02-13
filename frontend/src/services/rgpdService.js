import api from './api';

const rgpdService = {
  // Exporter toutes les données de l'utilisateur
  exportData: async () => {
    try {
      const response = await api.get('/rgpd/export-data');
      
      // Créer un fichier JSON téléchargeable
      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: 'application/json'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mes-donnees-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Supprimer le compte
  deleteAccount: async (password) => {
    try {
      const response = await api.delete('/rgpd/delete-account', {
        data: { password }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour le consentement
  updateConsent: async (newsletter) => {
    try {
      const response = await api.put('/rgpd/consent', { newsletter });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer la politique de confidentialité
  getPolitiqueConfidentialite: async () => {
    try {
      const response = await api.get('/rgpd/politique-confidentialite');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les mentions légales
  getMentionsLegales: async () => {
    try {
      const response = await api.get('/rgpd/mentions-legales');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default rgpdService;