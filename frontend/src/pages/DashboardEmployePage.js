import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import commandeService from '../services/commandeService';

const DashboardEmployePage = () => {
  const { user, isEmployee } = useAuth();
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isEmployee()) {
      setError('Accès non autorisé');
      setLoading(false);
      return;
    }
    fetchCommandes();
  }, [isEmployee]);

  const fetchCommandes = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await commandeService.getAllCommandes();
      setCommandes(data);
    } catch (err) {
      setError('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatut = async (commandeId, newStatut) => {
    if (!window.confirm(`Changer le statut en "${newStatut}" ?`)) {
      return;
    }

    try {
      await commandeService.updateCommande(commandeId, { statut: newStatut });
      alert('Statut mis à jour avec succès');
      fetchCommandes();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la mise à jour');
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

  // Filtrage des commandes
  const filteredCommandes = commandes.filter(commande => {
    if (filter !== 'all' && commande.statut !== filter) {
      return false;
    }
    return true;
  });

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <Link to="/">← Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🏢 Dashboard {user?.role === 'administrateur' ? 'Administrateur' : 'Employé'}</h1>
      <p>Bienvenue {user?.prenom} - Gestion des commandes</p>

      {/* Filtres */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filtrer par statut :</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="all">Tous ({commandes.length})</option>
          <option value="en_attente">En attente</option>
          <option value="accepte">Acceptées</option>
          <option value="en_preparation">En préparation</option>
          <option value="en_cours_livraison">En livraison</option>
          <option value="livre">Livrées</option>
          <option value="terminee">Terminées</option>
        </select>
        {filter !== 'all' && (
          <span style={{ marginLeft: '10px', color: '#666' }}>
            ({filteredCommandes.length} résultat{filteredCommandes.length > 1 ? 's' : ''})
          </span>
        )}
      </div>

      {/* Liste des commandes */}
      {filteredCommandes.length === 0 ? (
        <p>Aucune commande trouvée</p>
      ) : (
        <div>
          {filteredCommandes.map(commande => (
            <div
              key={commande.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0' }}>
                    Commande #{commande.id} - {commande.menu?.titre}
                  </h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    👤 {commande.user?.prenom} {commande.user?.nom}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    📅 {new Date(commande.date_prestation).toLocaleDateString('fr-FR')} à {commande.heure_prestation}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    👥 {commande.nb_personnes} personnes
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    📍 {commande.ville_livraison}
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
                    {commande.statut}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                    {commande.prix_total} €
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link
                  to={`/mes-commandes/${commande.id}`}
                  style={{
                    padding: '8px 15px',
                    background: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  Voir détail
                </Link>

                {commande.statut === 'en_attente' && (
                  <>
                    <button
                      onClick={() => handleChangeStatut(commande.id, 'accepte')}
                      style={{
                        padding: '8px 15px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ✅ Accepter
                    </button>
                    <button
                      onClick={() => handleChangeStatut(commande.id, 'annulee')}
                      style={{
                        padding: '8px 15px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ❌ Rejeter
                    </button>
                  </>
                )}

                {commande.statut === 'accepte' && (
                  <button
                    onClick={() => handleChangeStatut(commande.id, 'en_preparation')}
                    style={{
                      padding: '8px 15px',
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    👨‍🍳 En préparation
                  </button>
                )}

                {commande.statut === 'en_preparation' && (
                  <button
                    onClick={() => handleChangeStatut(commande.id, 'en_cours_livraison')}
                    style={{
                      padding: '8px 15px',
                      background: '#6f42c1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🚚 En livraison
                  </button>
                )}

                {commande.statut === 'en_cours_livraison' && (
                  <button
                    onClick={() => handleChangeStatut(commande.id, 'livre')}
                    style={{
                      padding: '8px 15px',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    📦 Livrée
                  </button>
                )}

                {commande.statut === 'livre' && commande.pret_materiel && (
                  <button
                    onClick={() => handleChangeStatut(commande.id, 'en_attente_retour_materiel')}
                    style={{
                      padding: '8px 15px',
                      background: '#fd7e14',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🔄 Attente retour
                  </button>
                )}

                {(commande.statut === 'livre' || commande.statut === 'en_attente_retour_materiel') && (
                  <button
                    onClick={() => handleChangeStatut(commande.id, 'terminee')}
                    style={{
                      padding: '8px 15px',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ✅ Terminer
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

export default DashboardEmployePage;