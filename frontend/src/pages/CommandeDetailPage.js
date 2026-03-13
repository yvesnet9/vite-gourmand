import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import commandeService from '../services/commandeService';
import avisService from '../services/avisService';

const CommandeDetailPage = () => {
  const { id } = useParams();
  const [commande, setCommande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // État pour le formulaire d'avis
  const [avisForm, setAvisForm] = useState({
    note: 5,
    commentaire: ''
  });
  const [avisLoading, setAvisLoading] = useState(false);
  const [avisMessage, setAvisMessage] = useState('');

  useEffect(() => {
    fetchCommandeDetail();
  }, [id]);

  const fetchCommandeDetail = async () => {
    try {
      const data = await commandeService.getCommandeById(id);
      setCommande(data);
    } catch (err) {
      setError('Erreur lors du chargement de la commande');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAvis = async (e) => {
    e.preventDefault();
    setAvisLoading(true);
    setAvisMessage('');

    try {
      await avisService.createAvis({
        commande_id: commande.id,
        note: avisForm.note,
        commentaire: avisForm.commentaire
      });
      setAvisMessage('Merci pour votre avis ! Il sera publié après validation.');
      setAvisForm({ note: 5, commentaire: '' });
    } catch (err) {
      setAvisMessage('Erreur lors de l\'envoi de l\'avis.');
      console.error(err);
    } finally {
      setAvisLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;
  if (!commande) return <div style={{ textAlign: 'center', padding: '50px' }}>Commande introuvable</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <Link to="/mes-commandes" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← Retour à mes commandes
      </Link>

      <h1 style={{ marginBottom: '30px' }}>Détail de la commande #{commande.id}</h1>

      {/* Informations de la commande */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '15px' }}>Informations générales</h2>
        <p><strong>Menu :</strong> {commande.menu?.titre}</p>
        <p><strong>Nombre de personnes :</strong> {commande.nb_personnes}</p>
        <p><strong>Date de prestation :</strong> {new Date(commande.date_prestation).toLocaleDateString('fr-FR')}</p>
        <p><strong>Heure :</strong> {commande.heure_prestation}</p>
        <p><strong>Statut :</strong> <span style={{ 
          padding: '5px 10px', 
          borderRadius: '4px',
          background: commande.statut === 'livre' ? '#d4edda' : commande.statut === 'en_attente' ? '#fff3cd' : '#cce5ff',
          color: commande.statut === 'livre' ? '#155724' : commande.statut === 'en_attente' ? '#856404' : '#004085'
        }}>{commande.statut.replace('_', ' ')}</span></p>
        <p><strong>Prix total :</strong> {commande.prix_total} €</p>
      </div>

      {/* Adresse de livraison */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '15px' }}>Adresse de livraison</h2>
        <p>{commande.adresse_livraison}</p>
        <p>{commande.code_postal} {commande.ville_livraison}</p>
      </div>

      {/* Détail du menu */}
      {commande.menu && (
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Détail du menu</h2>
          <p><strong>{commande.menu.titre}</strong></p>
          <p style={{ color: '#666' }}>{commande.menu.description}</p>
          
          {commande.menu.plats && commande.menu.plats.length > 0 && (
            <div style={{ marginTop: '15px' }}>
              <strong>Plats :</strong>
              <ul>
                {commande.menu.plats.map(plat => (
                  <li key={plat.id}>{plat.nom}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Formulaire d'avis (seulement si commande livrée) */}
    
        {commande.statut === 'livre' && (
        <div style={{ 
          background: '#e7f3ff', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '30px'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Laisser un avis</h2>
          
          {avisMessage && (
            <div style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '4px',
              background: avisMessage.includes('Erreur') ? '#f8d7da' : '#d4edda',
              color: avisMessage.includes('Erreur') ? '#721c24' : '#155724'
            }}>
              {avisMessage}
            </div>
          )}

          <form onSubmit={handleSubmitAvis}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Note :
              </label>
              <div style={{ fontSize: '24px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    onClick={() => setAvisForm({ ...avisForm, note: star })}
                    style={{ 
                      cursor: 'pointer', 
                      color: star <= avisForm.note ? '#ffc107' : '#ddd',
                      marginRight: '5px'
                    }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Commentaire :
              </label>
              <textarea
                value={avisForm.commentaire}
                onChange={(e) => setAvisForm({ ...avisForm, commentaire: e.target.value })}
                rows="4"
                required
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  border: '1px solid #ccc',
                  fontSize: '14px'
                }}
                placeholder="Partagez votre expérience..."
              />
            </div>

            <button
              type="submit"
              disabled={avisLoading}
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: avisLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px'
              }}
            >
              {avisLoading ? 'Envoi...' : 'Envoyer mon avis'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommandeDetailPage;