import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import commandeService from '../services/commandeService';

const MesCommandesPage = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await commandeService.getMesCommandes();
      setCommandes(data);
    } catch (err) {
      setError('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const getStatutColor = (statut) => {
    const colors = {
      'en_attente': '#ffc107',
      'accepte': '#17a2b8',
      'en_preparation': '#007bff',
      'en_cours_livraison': '#6f42c1',
      'livre': '#28a745',
      'en_attente_retour_materiel': '#fd7e14',
      'terminee': '#28a745',
      'annulee': '#dc3545',
    };
    return colors[statut] || '#6c757d';
  };

  const getStatutLabel = (statut) => {
    const labels = {
      'en_attente': '⏳ En attente',
      'accepte': '✅ Acceptée',
      'en_preparation': '👨‍🍳 En préparation',
      'en_cours_livraison': '🚚 En livraison',
      'livre': '📦 Livrée',
      'en_attente_retour_materiel': '🔄 Retour matériel',
      'terminee': '✅ Terminée',
      'annulee': '❌ Annulée',
    };
    return labels[statut] || statut;
  };

  const handleAnnulerCommande = async (commandeId) => {
    try {
      await commandeService.annulerCommande(commandeId);
      alert('Commande annulée avec succès');
      fetchCommandes();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'annulation');
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Mes Commandes</h1>

      {commandes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>Vous n'avez pas encore de commandes</p>
          <Link
            to="/menus"
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Découvrir nos menus
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {commandes.map(commande => (
            <div
              key={commande.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0' }}>
                    Commande #{commande.id} - {commande.menu?.titre}
                  </h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    📅 {new Date(commande.date_prestation).toLocaleDateString('fr-FR')} à {commande.heure_prestation}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    👥 {commande.nb_personnes} personnes
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '8px 15px',
                      background: getStatutColor(commande.statut),
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}
                  >
                    {getStatutLabel(commande.statut)}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                    {commande.prix_total} €
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '4px',
                marginBottom: '15px'
              }}>
                <p style={{ margin: '5px 0' }}>
                  <strong>📍 Livraison :</strong> {commande.adresse_livraison}, {commande.ville_livraison}
                </p>
                {commande.pret_materiel && (
                  <p style={{ margin: '5px 0' }}>
                    <strong>🍽️ Prêt de matériel :</strong> Oui
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to={`/mes-commandes/${commande.id}`}
                  style={{
                    padding: '10px 20px',
                    background: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}
                >
                  Voir le détail
                </Link>

                {(commande.statut === 'en_attente' || commande.statut === 'accepte') && (
                  <button
                    onClick={() => {
                      if (window.confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
                        handleAnnulerCommande(commande.id);
                      }
                    }}
                    style={{
                      padding: '10px 20px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MesCommandesPage;