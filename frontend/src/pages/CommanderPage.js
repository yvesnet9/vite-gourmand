import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import menuService from '../services/menuService';
import commandeService from '../services/commandeService';

const CommanderPage = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nb_personnes: '',
    date_prestation: '',
    heure_prestation: '',
    adresse_livraison: user?.adresse || '',
    ville_livraison: '',
    code_postal: '',
    pret_materiel: false,
  });

  const [calcul, setCalcul] = useState({
    prix_menu: 0,
    prix_livraison: 0,
    prix_total: 0,
  });

  useEffect(() => {
    fetchMenu();
  }, [menuId]);

  useEffect(() => {
    calculerPrix();
  }, [formData.nb_personnes, menu]);

  const fetchMenu = async () => {
    try {
      const data = await menuService.getMenuById(menuId);
      setMenu(data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement du menu');
      setLoading(false);
    }
  };

  const calculerPrix = () => {
    if (!menu || !formData.nb_personnes) {
      setCalcul({ prix_menu: 0, prix_livraison: 0, prix_total: 0 });
      return;
    }

    const prixMenu = menu.prix_base * parseInt(formData.nb_personnes);
    // Calcul simplifié de la livraison (5€ + distance fictive)
    const prixLivraison = 5 + (Math.random() * 20); // Simplification
    const prixTotal = prixMenu + prixLivraison;

    setCalcul({
      prix_menu: prixMenu.toFixed(2),
      prix_livraison: prixLivraison.toFixed(2),
      prix_total: prixTotal.toFixed(2),
    });
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const commandeData = {
        menu_id: parseInt(menuId),
        ...formData,
        nb_personnes: parseInt(formData.nb_personnes),
      };

      const result = await commandeService.createCommande(commandeData);
      
      alert('Commande créée avec succès !');
      navigate('/mes-commandes');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de la commande');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (!menu) {
    return <div style={{ padding: '20px' }}>Menu introuvable</div>;
  }

  // Date minimale : demain
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Commander : {menu.titre}</h1>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <p><strong>Prix :</strong> {menu.prix_base} € / personne</p>
        <p><strong>Minimum :</strong> {menu.nb_personne_min} personnes</p>
      </div>

      {error && (
        <div style={{ 
          padding: '15px', 
          background: '#f8d7da', 
          color: '#721c24',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nombre de personnes * :
          </label>
          <input
            type="number"
            name="nb_personnes"
            value={formData.nb_personnes}
            onChange={handleChange}
            min={menu.nb_personne_min}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <small style={{ color: '#666' }}>Minimum {menu.nb_personne_min} personnes</small>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Date de prestation * :
          </label>
          <input
            type="date"
            name="date_prestation"
            value={formData.date_prestation}
            onChange={handleChange}
            min={minDateStr}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Heure de prestation * :
          </label>
          <input
            type="time"
            name="heure_prestation"
            value={formData.heure_prestation}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Adresse de livraison * :
          </label>
          <input
            type="text"
            name="adresse_livraison"
            value={formData.adresse_livraison}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Ville * :
            </label>
            <input
              type="text"
              name="ville_livraison"
              value={formData.ville_livraison}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Code postal * :
            </label>
            <input
              type="text"
              name="code_postal"
              value={formData.code_postal}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="pret_materiel"
              checked={formData.pret_materiel}
              onChange={handleChange}
              style={{ marginRight: '10px' }}
            />
            <span>Prêt de matériel (vaisselle, couverts, nappes)</span>
          </label>
        </div>

        {/* Récapitulatif des prix */}
        {formData.nb_personnes && (
          <div style={{ 
            background: '#e7f3ff', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Récapitulatif</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Menu ({formData.nb_personnes} personnes) :</span>
              <strong>{calcul.prix_menu} €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Livraison :</span>
              <strong>{calcul.prix_livraison} €</strong>
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
              <span><strong>Total :</strong></span>
              <strong style={{ color: '#28a745' }}>{calcul.prix_total} €</strong>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            background: submitting ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {submitting ? 'Envoi en cours...' : 'Valider la commande'}
        </button>
      </form>
    </div>
  );
};

export default CommanderPage;