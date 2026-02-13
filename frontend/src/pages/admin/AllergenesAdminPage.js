import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import adminService from '../../services/adminService';

const AllergenesAdminPage = () => {
  const { user, isAdmin } = useAuth();
  const [allergenes, setAllergenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAllergene, setEditingAllergene] = useState(null);

  const [formData, setFormData] = useState({
    nom: '',
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    
    if (!isAdmin()) {
      setError('Accès non autorisé - Admin uniquement');
      setLoading(false);
      return;
    }
    
    fetchAllergenes();
  }, [user, isAdmin]);

  const fetchAllergenes = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await adminService.getAllAllergenes();
      setAllergenes(data);
    } catch (err) {
      setError('Erreur lors du chargement des allergènes');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingAllergene) {
        await adminService.updateAllergene(editingAllergene.id, formData);
        alert('Allergène modifié avec succès');
      } else {
        await adminService.createAllergene(formData);
        alert('Allergène créé avec succès');
      }

      resetForm();
      fetchAllergenes();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (allergene) => {
    setEditingAllergene(allergene);
    setFormData({
      nom: allergene.nom,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet allergène ?')) {
      return;
    }

    try {
      await adminService.deleteAllergene(id);
      alert('Allergène supprimé avec succès');
      fetchAllergenes();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
    });
    setEditingAllergene(null);
    setShowForm(false);
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (error && !isAdmin()) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>🥜 Gestion des Allergènes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            background: showForm ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {showForm ? '✖ Annuler' : '➕ Nouvel Allergène'}
        </button>
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

      {/* FORMULAIRE */}
      {showForm && (
        <div style={{ 
          background: '#f8f9fa', 
          padding: '30px', 
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h2>{editingAllergene ? 'Modifier l\'allergène' : 'Créer un nouvel allergène'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nom * :
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Ex: Gluten, Œufs, Lait..."
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '12px 30px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {editingAllergene ? 'Mettre à jour' : 'Créer'}
              </button>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '12px 30px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTE DES ALLERGÈNES */}
      <div>
        <h2>Liste des allergènes ({allergenes.length})</h2>
        {allergenes.length === 0 ? (
          <p>Aucun allergène trouvé</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {allergenes.map(allergene => (
              <div
                key={allergene.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>
                    <span style={{ 
                      padding: '8px 15px', 
                      background: '#dc3545', 
                      color: 'white', 
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {allergene.nom}
                    </span>
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleEdit(allergene)}
                    style={{
                      padding: '8px 15px',
                      background: '#ffc107',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ✏️ Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(allergene.id)}
                    style={{
                      padding: '8px 15px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllergenesAdminPage;