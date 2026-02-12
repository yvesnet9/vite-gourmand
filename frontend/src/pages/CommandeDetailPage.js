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
    fetchCommandeDetail();
  }, [id]);

  const fetchCommandeDetail = async () => {
    setLoading(true);
    setError('');

    try {
      const commandeData = await commandeService.getCommandeById(id);
      setCommande(commandeData);

      const suivisData = await commandeService.getSuivisCommande(id);
      setSuivis(suivisData);
    } catch (err) {
      setError('Erreur lors du chargement de la commande');
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
      <div style={{ marginBottom: '20px' }}>
        <Link to="/mes-commandes" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Retour à mes commandes
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>Commande #{commande.id}</h1>
        <div
          style={{
            padding: '10px 20px',
            background: getStatutColor(commande.statut),
            color: 'white',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {getStatutLabel(commande.statut)}
        </div>
      </div>

      {/* Menu */}
      <div style={{ 
        background: 'white', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2>📋 Menu</h2>
        <h3>{commande.menu?.titre}</h3>
        <p style={{ color: '#666' }}>{commande.menu?.description}</p>
      </div>

      {/* Détails de la prestation */}
      <div style={{ 
        background: 'white', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2>🎯 Détails de la prestation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <p><strong>📅 Date :</strong> {new Date(commande.date_prestation).toLocaleDateString('fr-FR')}</p>
            <p><strong>🕐 Heure :</strong> {commande.heure_prestation}</p>
            <p><strong>👥 Nombre de personnes :</strong> {commande.nb_personnes}</p>
          </div>
          <div>
            <p><strong>📍 Adresse :</strong> {commande.adresse_livraison}</p>
            <p><strong>🏙️ Ville :</strong> {commande.ville_livraison} ({commande.code_postal})</p>
            <p><strong>🍽️ Prêt de matériel :</strong> {commande.pret_materiel ? 'Oui' : 'Non'}</p>
          </div>
        </div>
      </div>

      {/* Prix */}
      <div style={{ 
        background: 'white', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2>💰 Tarification</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Menu ({commande.nb_personnes} personnes) :</span>
          <strong>{commande.prix_menu} €</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Livraison {commande.distance_km && `(${commande.distance_km} km)`} :</span>
          <strong>{commande.prix_livraison} €</strong>
        </div>
        {commande.reduction > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#28a745' }}>
            <span>Réduction :</span>
            <strong>- {commande.reduction} €</strong>
          </div>
        )}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
          <span><strong>Total :</strong></span>
          <strong style={{ color: '#28a745' }}>{commande.prix_total} €</strong>
        </div>
      </div>

      {/* Historique */}
      {suivis.length > 0 && (
        <div style={{ 
          background: 'white', 
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h2>📜 Historique</h2>
          <div style={{ position: 'relative', paddingLeft: '30px' }}>
            {suivis.map((suivi, index) => (
              <div key={suivi.id} style={{ marginBottom: '20px', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-30px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: index === 0 ? '#007bff' : '#ccc',
                    border: '2px solid white',
                    boxShadow: '0 0 0 2px #ddd'
                  }}
                />
                {index < suivis.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '-24px',
                      top: '12px',
                      width: '2px',
                      height: 'calc(100% + 20px)',
                      background: '#ddd'
                    }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 'bold', color: getStatutColor(suivi.statut) }}>
                    {getStatutLabel(suivi.statut)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    {new Date(suivi.created_at).toLocaleString('fr-FR')}
                  </div>
                  {suivi.commentaire && (
                    <p style={{ margin: '5px 0', color: '#333' }}>{suivi.commentaire}</p>
                  )}
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    Par : {suivi.createur?.prenom} {suivi.createur?.nom}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton Avis */}
      {commande.statut === 'terminee' && !commande.avis && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link
            to={`/mes-commandes/${commande.id}/avis`}
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              background: '#ffc107',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            ⭐ Laisser un avis
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommandeDetailPage;