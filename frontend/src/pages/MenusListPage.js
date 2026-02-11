import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import menuService from '../services/menuService';

const MenusListPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtres
  const [filters, setFilters] = useState({
    prix_max: '',
    theme: '',
    regime: '',
    nb_personnes: '',
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await menuService.getMenus(filters);
      setMenus(data);
    } catch (err) {
      setError('Erreur lors du chargement des menus');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchMenus();
  };

  const resetFilters = () => {
    setFilters({
      prix_max: '',
      theme: '',
      regime: '',
      nb_personnes: '',
    });
    setTimeout(fetchMenus, 100);
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Nos Menus</h1>
      
      {/* Filtres */}
      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h3>Filtres</h3>
        <form onSubmit={handleFilterSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            
            <div>
              <label>Prix maximum (€) :</label>
              <input
                type="number"
                name="prix_max"
                value={filters.prix_max}
                onChange={handleFilterChange}
                placeholder="Ex: 50"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div>
              <label>Thème :</label>
              <select
                name="theme"
                value={filters.theme}
                onChange={handleFilterChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="">Tous</option>
                <option value="noel">Noël</option>
                <option value="paques">Pâques</option>
                <option value="anniversaire">Anniversaire</option>
                <option value="mariage">Mariage</option>
                <option value="entreprise">Entreprise</option>
              </select>
            </div>

            <div>
              <label>Régime :</label>
              <select
                name="regime"
                value={filters.regime}
                onChange={handleFilterChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="">Tous</option>
                <option value="classique">Classique</option>
                <option value="vegetarien">Végétarien</option>
                <option value="vegan">Vegan</option>
                <option value="sans_gluten">Sans gluten</option>
              </select>
            </div>

            <div>
              <label>Nombre de personnes :</label>
              <input
                type="number"
                name="nb_personnes"
                value={filters.nb_personnes}
                onChange={handleFilterChange}
                placeholder="Ex: 10"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Filtrer
            </button>
            
            <button
              type="button"
              onClick={resetFilters}
              style={{
                padding: '10px 20px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Réinitialiser
            </button>
          </div>
        </form>
      </div>

      {/* Liste des menus */}
      {menus.length === 0 ? (
        <p>Aucun menu trouvé avec ces critères.</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
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
              <h3>{menu.titre}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{menu.description}</p>
              
              <div style={{ margin: '15px 0' }}>
                <span style={{ 
                  background: '#e7f3ff', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginRight: '5px'
                }}>
                  {menu.theme}
                </span>
                <span style={{ 
                  background: '#fff3cd', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {menu.regime}
                </span>
              </div>

              <div style={{ marginTop: '10px' }}>
                <strong style={{ fontSize: '20px', color: '#28a745' }}>
                  {menu.prix_base} €
                </strong>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  {' '}/ personne
                </span>
              </div>

              <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                Min. {menu.nb_personne_min} personnes
              </p>

              <Link
                to={`/menus/${menu.id}`}
                style={{
                  display: 'inline-block',
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                Voir le détail
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenusListPage;