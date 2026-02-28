import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import adminService from '../../services/adminService';

const PlatsAdminPage = () => {
  const { user, isAdmin } = useAuth();
  const [plats, setPlats] = useState([]);
  const [allergenes, setAllergenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPlat, setEditingPlat] = useState(null);
  const [filterType, setFilterType] = useState('');

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    type: '',
    allergenes: [],
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
    
    fetchData();
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const [platsData, allergenesData] = await Promise.all([
        adminService.getAllPlats(),
        adminService.getAllAllergenes(),
      ]);
      
      setPlats(platsData);
      setAllergenes(allergenesData);
    } catch (err) {
      setError('Erreur lors du chargement des données');
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

  const handleAllergenesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData({
      ...formData,
      allergenes: selectedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingPlat) {
        await adminService.updatePlat(editingPlat.id, formData);
        alert('Plat modifié avec succès');
      } else {
        await adminService.createPlat(formData);
        alert('Plat créé avec succès');
      }

      resetForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (plat) => {
    setEditingPlat(plat);
    setFormData({
      nom: plat.nom,
      description: plat.description || '',
      type: plat.type,
      allergenes: plat.allergenes?.map(a => a.id) || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      return;
    }

    try {
      await adminService.deletePlat(id);
      alert('Plat supprimé avec succès');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      description: '',
      type: '',
      allergenes: [],
    });
    setEditingPlat(null);
    setShowForm(false);
  };

  const getTypeLabel = (type) => {
    const labels = {
      'entree': '🥗 Entrée',
      'plat': '🍽️ Plat principal',
      'dessert': '🍰 Dessert',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      'entree': '#28a745',
      'plat': '#007bff',
      'dessert': '#ffc107',
    };
    return colors[type] || '#6c757d';
  };

  // Filtrage des plats
  const filteredPlats = plats.filter(plat => {
    if (filterType && plat.type !== filterType) {
      return false;
    }
    return true;
  });

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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>🍽️ Gestion des Plats</h1>
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
          {showForm ? '✖ Annuler' : '➕ Nouveau Plat'}
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
          <h2>{editingPlat ? 'Modifier le plat' : 'Créer un nouveau plat'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Nom * :
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Type * :
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="entree">Entrée</option>
                  <option value="plat">Plat principal</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Description :
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Allergènes :
              </label>
              <select
                multiple
                value={formData.allergenes}
                onChange={handleAllergenesChange}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  border: '1px solid #ccc',
                  minHeight: '120px'
                }}
              >
                {allergenes.map(allergene => (
                  <option key={allergene.id} value={allergene.id}>
                    {allergene.nom}
                  </option>
                ))}
              </select>
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                Maintenez Cmd (Mac) ou Ctrl (Windows) pour sélectionner plusieurs allergènes
              </small>
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
                {editingPlat ? 'Mettre à jour' : 'Créer'}
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

      {/* FILTRES */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>Filtres</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Type de plat :
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '4px', 
                border: '1px solid #ccc' 
              }}
            >
              <option value="">Tous les types</option>
              <option value="entree">🥗 Entrées</option>
              <option value="plat">🍽️ Plats principaux</option>
              <option value="dessert">🍰 Desserts</option>
            </select>
          </div>
          
          {filterType && (
            <button
              onClick={() => setFilterType('')}
              style={{
                padding: '10px 20px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '22px'
              }}
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* LISTE DES PLATS */}
      <div>
        <h2>Liste des plats ({filteredPlats.length} / {plats.length})</h2>
        {filteredPlats.length === 0 ? (
          <p>Aucun plat trouvé</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {filteredPlats.map(plat => (
              <div
                key={plat.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ marginBottom: '15px' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '5px 12px',
                      background: getTypeColor(plat.type),
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}
                  >
                    {getTypeLabel(plat.type)}
                  </div>
                  
                  <h3 style={{ margin: '10px 0' }}>{plat.nom}</h3>
                  
                  {plat.description && (
                    <p style={{ color: '#666', fontSize: '14px', margin: '10px 0' }}>
                      {plat.description}
                    </p>
                  )}

                  {plat.allergenes && plat.allergenes.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <strong style={{ fontSize: '13px', color: '#666' }}>Allergènes :</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                        {plat.allergenes.map(allergene => (
                          <span
                            key={allergene.id}
                            style={{
                              padding: '3px 8px',
                              background: '#dc3545',
                              color: 'white',
                              borderRadius: '12px',
                              fontSize: '11px'
                            }}
                          >
                            {allergene.nom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                  <button
                    onClick={() => handleEdit(plat)}
                    style={{
                      flex: 1,
                      padding: '8px 15px',
                      background: '#ffc107',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ✏️ Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(plat.id)}
                    style={{
                      flex: 1,
                      padding: '8px 15px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
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

export default PlatsAdminPage;