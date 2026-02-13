import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import adminService from '../../services/adminService';

const AvisAdminPage = () => {
  const { user, isEmployee } = useAuth();
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      return;
    }
    
    if (!isEmployee()) {
      setError('Accès non autorisé - Employé/Admin uniquement');
      setLoading(false);
      return;
    }
    
    fetchAvis();
  }, [user, isEmployee]);

  const fetchAvis = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await adminService.getPendingAvis();
      setAvis(data);
    } catch (err) {
      setError('Erreur lors du chargement des avis');
    } finally {
      setLoading(false);
    }
  };

  const handleValider = async (id) => {
    if (!window.confirm('Valider cet avis ?')) {
      return;
    }

    try {
      await adminService.validerAvis(id);
      alert('Avis validé avec succès');
      fetchAvis();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la validation');
    }
  };

  const handleRejeter = async (id) => {
    if (!window.confirm('Rejeter cet avis ? Il sera supprimé définitivement.')) {
      return;
    }

    try {
      await adminService.rejeterAvis(id);
      alert('Avis rejeté avec succès');
      fetchAvis();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors du rejet');
    }
  };

  const renderStars = (note) => {
    return '⭐'.repeat(note) + '☆'.repeat(5 - note);
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (error && !isEmployee()) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>⭐ Validation des Avis</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Avis en attente de validation ({avis.length})
      </p>

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

      {avis.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            ✅ Aucun avis en attente de validation
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {avis.map(avisItem => (
            <div
              key={avisItem.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '25px',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {/* En-tête */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'start',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                    {renderStars(avisItem.note)}
                  </div>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                    Par <strong>{avisItem.user?.prenom} {avisItem.user?.nom}</strong>
                  </p>
                  <p style={{ margin: '5px 0', color: '#999', fontSize: '13px' }}>
                    Le {new Date(avisItem.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <div>
                  <span style={{
                    padding: '5px 12px',
                    background: '#ffc107',
                    color: '#000',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    En attente
                  </span>
                </div>
              </div>

              {/* Commande */}
              <div style={{ 
                background: '#f8f9fa', 
                padding: '12px 15px', 
                borderRadius: '6px',
                marginBottom: '15px'
              }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  <strong>Commande #{avisItem.commande?.id}</strong> - {avisItem.commande?.menu?.titre}
                </p>
              </div>

              {/* Commentaire */}
              {avisItem.commentaire && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ 
                    fontSize: '15px', 
                    lineHeight: '1.6',
                    color: '#333',
                    fontStyle: 'italic',
                    margin: 0
                  }}>
                    "{avisItem.commentaire}"
                  </p>
                </div>
              )}

              {/* Boutons d'action */}
              <div style={{ 
                display: 'flex', 
                gap: '10px',
                paddingTop: '15px',
                borderTop: '1px solid #eee'
              }}>
                <button
                  onClick={() => handleValider(avisItem.id)}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ Valider
                </button>

                <button
                  onClick={() => handleRejeter(avisItem.id)}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 'bold'
                  }}
                >
                  ❌ Rejeter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvisAdminPage;