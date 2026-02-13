import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import adminService from '../../services/adminService';

const MenusAdminPage = () => {
  const { user, isAdmin } = useAuth();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix_base: '',
    nb_personne_min: '',
    stock: '',
    theme: '',
    regime: '',
    conditions: '',
  });

  useEffect(() => {
    if (!user) {
      // Attendre que l'utilisateur soit chargé
      return;
    }
    
    if (!isAdmin()) {
      setError('Accès non autorisé - Admin uniquement');
      setLoading(false);
      return;
    }
    
    fetchMenus();
  }, [user, isAdmin]);

  const fetchMenus = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await adminService.getAllMenus();
      setMenus(data);
    } catch (err) {
      setError('Erreur lors du chargement des menus');
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
      if (editingMenu) {
        await adminService.updateMenu(editingMenu.id, formData);
        alert('Menu modifié avec succès');
      } else {
        await adminService.createMenu(formData);
        alert('Menu créé avec succès');
      }

      resetForm();
      fetchMenus();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setFormData({
      titre: menu.titre,
      description: menu.description,
      prix_base: menu.prix_base,
      nb_personne_min: menu.nb_personne_min,
      stock: menu.stock,
      theme: menu.theme,
      regime: menu.regime,
      conditions: menu.conditions || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) {
      return;
    }

    try {
      await adminService.deleteMenu(id);
      alert('Menu supprimé avec succès');
      fetchMenus();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      titre: '',
      description: '',
      prix_base: '',
      nb_personne_min: '',
      stock: '',
      theme: '',
      regime: '',
      conditions: '',
    });
    setEditingMenu(null);
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>📋 Gestion des Menus</h1>
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
          {showForm ? '✖ Annuler' : '➕ Nouveau Menu'}
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
          <h2>{editingMenu ? 'Modifier le menu' : 'Créer un nouveau menu'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Titre * :
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Prix de base (€/pers) * :
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="prix_base"
                  value={formData.prix_base}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Nb personnes min * :
                </label>
                <input
                  type="number"
                  name="nb_personne_min"
                  value={formData.nb_personne_min}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Stock * :
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Thème * :
                </label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="noel">Noël</option>
                  <option value="paques">Pâques</option>
                  <option value="anniversaire">Anniversaire</option>
                  <option value="mariage">Mariage</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Régime * :
                </label>
                <select
                  name="regime"
                  value={formData.regime}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="classique">Classique</option>
                  <option value="vegetarien">Végétarien</option>
                  <option value="vegan">Vegan</option>
                  <option value="sans_gluten">Sans gluten</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Description * :
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Conditions :
              </label>
              <textarea
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                rows="2"
                placeholder="Ex: Commande minimum 48h à l'avance"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
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
                {editingMenu ? 'Mettre à jour' : 'Créer'}
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

      {/* LISTE DES MENUS */}
      <div>
        <h2>Liste des menus ({menus.length})</h2>
        {menus.length === 0 ? (
          <p>Aucun menu trouvé</p>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {menus.map(menu => (
              <div
                key={menu.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>{menu.titre}</h3>
                    <p style={{ color: '#666', marginBottom: '10px' }}>{menu.description}</p>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ 
                        padding: '5px 10px', 
                        background: '#007bff', 
                        color: 'white', 
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {menu.theme}
                      </span>
                      <span style={{ 
                        padding: '5px 10px', 
                        background: '#28a745', 
                        color: 'white', 
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {menu.regime}
                      </span>
                    </div>

                    <div style={{ color: '#666', fontSize: '14px' }}>
                      <p style={{ margin: '5px 0' }}>💰 {menu.prix_base} € / personne</p>
                      <p style={{ margin: '5px 0' }}>👥 Minimum {menu.nb_personne_min} personnes</p>
                      <p style={{ margin: '5px 0' }}>📦 Stock: {menu.stock}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(menu)}
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
                      onClick={() => handleDelete(menu.id)}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenusAdminPage;