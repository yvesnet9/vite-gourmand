import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import commandeService from '../services/commandeService';

const CommandeDetailPage = () => {
  const { id } = useParams();
  const [commande, setCommande] = useState(null);
  const [suivis, setSuivis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCommandeDetails();
  }, [id]);

  const fetchCommandeDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const [commandeData, suivisData] = await Promise.all([
        commandeService.getCommandeById(id),
        commandeService.getSuivisCommande(id)
      ]);
      
      setCommande(commandeData);
      setSuivis(suivisData);
    } catch (err) {
      setError('Erreur lors du chargement des détails');
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
      'en_attente': '⏳ En attente de validation',
      'accepte': '✅ Acceptée',
      'en_preparation': '👨‍🍳 En cours de préparation',
      'en_cours_livraison': '🚚 En cours de livraison',
      'livre': '📦 Livrée',
      'en_attente_retour_materiel': '🔄 En attente de retour du matériel',
      'terminee': '✅ Terminée',
      'annulee': '❌ Annulée',
    };
    return labels[statut] || statut;
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (error || !commande) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: 'red' }}>{error || 'Commande introuvable'}</p>
        <Link to="/mes-commandes">← Retour à mes commandes</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/mes-commandes" style={{ color: '#007bff', textDecoration: 'none' }}>
        ← Retour à mes commandes
      </Link>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Commande #{commande.id}</h1>
          <div
            style={{
              padding: '10px 20px',
              background: getStatutColor(commande.statut),
              color: 'white',
              borderRadius: '20px',
              fontWeight: 'bold'
            }}
          >
            {getStatutLabel(commande.statut)}
          </div>
        </div>

        {/* Informations du menu */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h3>🍽️ Menu commandé</h3>
          <p><strong>{commande.menu?.titre}</strong></p>
          <p style={{ color: '#666' }}>{commande.menu?.description}</p>
        </div>

        {/* Détails de la commande */}
        <div style={{ 
          background: 'white',
          border: '1px solid #ddd',
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h3>📋 Détails de la prestation</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <p><strong>📅 Date :</strong> {new Date(commande.date_prestation).toLocaleDateString('fr-FR')}</p>
              <p><strong>🕐 Heure :</strong> {commande.heure_prestation}</p>
              <p><strong>👥 Nombre de personnes :</strong> {commande.nb_personnes}</p>
            </div>
            <div>
              <p><strong>📍 Adresse :</strong></p>
              <p style={{ color: '#666' }}>
                {commande.adresse_livraison}<br />
                {commande.code_postal} {commande.ville_livraison}
              </p>
              {commande.pret_materiel && (
                <p><strong>🍽️ Prêt de matériel :</strong> Oui</p>
              )}
            </div>
          </div>
        </div>

        {/* Détails des prix */}
        <div style={{ 
          background: '#e7f3ff',
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h3>💰 Détail des prix</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <span>Menu ({commande.nb_personnes} personnes) :</span>
            <strong>{commande.prix_menu} €</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span>Livraison ({commande.distance_km} km) :</span>
            <strong>{commande.prix_livraison} €</strong>
          </div>
          {commande.reduction > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', color: '#28a745' }}>
              <span>Réduction :</span>
              <strong>-{commande.reduction} €</strong>
            </div>
          )}
          <hr style={{ margin: '15px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px' }}>
            <strong>Total :</strong>
            <strong style={{ color: '#28a745' }}>{commande.prix_total} €</strong>
          </div>
        </div>

        {/* Historique des suivis */}
        <div style={{ marginTop: '30px' }}>
          <h3>📜 Historique de la commande</h3>
          <div style={{ marginTop: '15px' }}>
            {suivis.map((suivi, index) => (
              <div
                key={suivi.id}
                style={{
                  borderLeft: '3px solid #007bff',
                  paddingLeft: '15px',
                  marginBottom: '15px',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '5px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: index === 0 ? '#007bff' : '#ccc'
                }}></div>
                
                <p style={{ margin: '0', fontWeight: 'bold' }}>
                  {getStatutLabel(suivi.nouveau_statut)}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                  {new Date(suivi.created_at).toLocaleString('fr-FR')}
                </p>
                {suivi.commentaire && (
                  <p style={{ margin: '5px 0', fontSize: '14px', fontStyle: 'italic' }}>
                    {suivi.commentaire}
                  </p>
                )}
                {suivi.createur && (
                  <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>
                    Par : {suivi.createur.prenom} {suivi.createur.nom}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Laisser un avis si terminée */}
        {commande.statut === 'terminee' && !commande.avis && (
          <div style={{ 
            marginTop: '30px',
            textAlign: 'center',
            padding: '20px',
            background: '#fff3cd',
            borderRadius: '8px'
          }}>
            <p>Votre prestation est terminée !</p>
            <Link
              to={`/avis/${commande.id}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '10px 20px',
                background: '#ffc107',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}
            >
              ⭐ Laisser un avis
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandeDetailPage;