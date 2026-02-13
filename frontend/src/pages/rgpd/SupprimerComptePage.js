import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rgpdService from '../../services/rgpdService';
import { useAuth } from '../../contexts/AuthContext';

const SupprimerComptePage = () => {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Vérifier la confirmation
    if (confirmation !== 'SUPPRIMER') {
      setError('Vous devez taper "SUPPRIMER" pour confirmer.');
      return;
    }

    if (!password) {
      setError('Le mot de passe est requis.');
      return;
    }

    setLoading(true);

    try {
      await rgpdService.deleteAccount(password);
      
      // Déconnexion et redirection
      logout();
      navigate('/');
      
      alert('Votre compte a été supprimé avec succès.');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression du compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ color: '#dc3545' }}>⚠️ Supprimer mon compte</h1>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107',
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <h3 style={{ marginTop: 0 }}>Attention !</h3>
        <p>
          La suppression de votre compte est <strong>définitive et irréversible</strong>.
        </p>
        <p>
          Toutes vos données seront supprimées, y compris :
        </p>
        <ul>
          <li>Vos informations personnelles</li>
          <li>Votre historique de commandes</li>
          <li>Vos avis</li>
          <li>Tous les autres données associées à votre compte</li>
        </ul>
      </div>

      {error && (
        <div style={{ 
          padding: '15px',
          background: '#f8d7da',
          color: '#721c24',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Tapez "SUPPRIMER" pour confirmer :
          </label>
          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="SUPPRIMER"
            required
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ced4da',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Entrez votre mot de passe :
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ced4da',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate('/mes-donnees')}
            style={{
              flex: 1,
              padding: '12px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Suppression...' : 'Supprimer définitivement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupprimerComptePage;