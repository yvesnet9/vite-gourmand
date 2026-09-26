// Libellés et couleurs des statuts de commande (source unique, réutilisée partout)

export const STATUT_LABELS = {
  en_attente: '⏳ En attente',
  accepte: '✅ Acceptée',
  en_preparation: '👨‍🍳 En préparation',
  en_cours_livraison: '🚚 En livraison',
  livre: '📦 Livrée',
  en_attente_retour_materiel: '🔄 Retour matériel',
  terminee: '✅ Terminée',
  annulee: '❌ Annulée',
};

export const STATUT_COLORS = {
  en_attente: '#ffc107',
  accepte: '#17a2b8',
  en_preparation: '#007bff',
  en_cours_livraison: '#6f42c1',
  livre: '#28a745',
  en_attente_retour_materiel: '#fd7e14',
  terminee: '#28a745',
  annulee: '#dc3545',
};

export const getStatutLabel = (statut) => STATUT_LABELS[statut] || statut;
export const getStatutColor = (statut) => STATUT_COLORS[statut] || '#6c757d';