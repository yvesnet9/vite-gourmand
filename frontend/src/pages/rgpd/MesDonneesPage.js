import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rgpdService from '../../services/rgpdService';
import { useAuth } from '../../contexts/AuthContext';

const MesDonneesPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleExportData = async () => {
    setLoading(true);
    setMessage('');

    try {
      await rgpdService.exportData();
      setMessage('Vos données ont été téléchargées avec succès !');
    } catch (error) {
      setMessage('Erreur lors de l\'export des données.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>Mes Données Personnelles</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Conformément au RGPD, vous avez le droit d'accéder à vos données personnelles, 
        de les rectifier ou de les supprimer.
      </p>

      {message && (
        <div style={{
          padding: '15px',
          background: message.includes('Erreur') ? '#f8d7da' : '#d4edda',
          color: message.includes('Erreur') ? '#721c24' : '#155724',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      {/* Informations actuelles */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '30px' 
      }}>
        <h2 style={{ marginBottom: '15px' }}>Vos informations</h2>
        <p><strong>Nom :</strong> {user?.nom}</p>
        <p><strong>Prénom :</strong> {user?.prenom}</p>
        <p><strong>Email :</strong> {user?.email}</p>
        <p><strong>Téléphone :</strong> {user?.gsm}</p>
        <p><strong>Adresse :</strong> {user?.adresse}</p>
      </div>

      {/* Actions */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '15px' }}>Actions disponibles</h2>

        {/* Télécharger mes données */}
        <div style={{ 
          border: '1px solid #dee2e6', 
          padding: '20px', 
          borderRadius: '5px',
          marginBottom: '15px' 
        }}>
          <h3 style={{ marginBottom: '10px' }}>📥 Télécharger mes données</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Téléchargez toutes vos données personnelles au format JSON.
          </p>
          <button
            onClick={handleExportData}
            disabled={loading}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Téléchargement...' : 'Télécharger mes données'}
          </button>
        </div>

        {/* Modifier mes données */}
        <div style={{ 
          border: '1px solid #dee2e6', 
          padding: '20px', 
          borderRadius: '5px',
          marginBottom: '15px' 
        }}>
          <h3 style={{ marginBottom: '10px' }}>✏️ Modifier mes informations</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Modifiez vos informations personnelles (nom, adresse, etc.).
          </p>
          <button
            onClick={() => navigate('/profile')}
            style={{
              padding: '10px 20px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Modifier mes informations
          </button>
        </div>

        {/* Supprimer mon compte */}
        <div style={{ 
          border: '1px solid #dc3545', 
          padding: '20px', 
          borderRadius: '5px',
          background: '#fff5f5'
        }}>
          <h3 style={{ marginBottom: '10px', color: '#dc3545' }}>🗑️ Supprimer mon compte</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Supprimer définitivement votre compte et toutes vos données. 
            <strong> Cette action est irréversible.</strong>
          </p>
          <button
            onClick={() => navigate('/supprimer-compte')}
            style={{
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>

      {/* Informations RGPD */}
      <div style={{ 
        background: '#e7f3ff', 
        padding: '20px', 
        borderRadius: '5px',
        marginTop: '30px'
      }}>
        <h3 style={{ marginBottom: '10px' }}>ℹ️ Vos droits RGPD</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Droit d'accès :</strong> Vous pouvez télécharger toutes vos données</li>
          <li><strong>Droit de rectification :</strong> Vous pouvez modifier vos informations</li>
          <li><strong>Droit à l'effacement :</strong> Vous pouvez supprimer votre compte</li>
          <li><strong>Droit à la portabilité :</strong> Vos données sont exportables en JSON</li>
        </ul>
      </div>
    </div>
  );
};

export default MesDonneesPage;