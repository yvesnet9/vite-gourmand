import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import menuService from '../services/menuService';

const MenuDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenu();
  }, [id]);

  const fetchMenu = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await menuService.getMenuById(id);
      setMenu(data);
    } catch (err) {
      setError('Erreur lors du chargement du menu');
    } finally {
      setLoading(false);
    }
  };

  const handleCommander = () => {
    if (!isAuthenticated()) {
      alert('Vous devez être connecté pour commander');
      navigate('/login');
      return;
    }
    navigate(`/commander/${menu.id}`);
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <Link to="/menus">← Retour aux menus</Link>
      </div>
    );
  }

  if (!menu) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Menu introuvable</p>
        <Link to="/menus">← Retour aux menus</Link>
      </div>
    );
  }

  // Regrouper les plats par type
  const platsParType = {
    entree: [],
    plat: [],
    dessert: []
  };

  menu.plats?.forEach(plat => {
    if (platsParType[plat.type]) {
      platsParType[plat.type].push(plat);
    }
  });

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/menus" style={{ color: '#007bff', textDecoration: 'none' }}>
        ← Retour aux menus
      </Link>

      <div style={{ marginTop: '20px' }}>
        <h1>{menu.titre}</h1>
        
        <div style={{ margin: '15px 0' }}>
          <span style={{ 
            background: '#e7f3ff', 
            padding: '8px 15px', 
            borderRadius: '4px',
            fontSize: '14px',
            marginRight: '10px'
          }}>
            📅 {menu.theme}
          </span>
          <span style={{ 
            background: '#fff3cd', 
            padding: '8px 15px', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            🥗 {menu.regime}
          </span>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginTop: '20px' }}>
          {menu.description}
        </p>

        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
            {menu.prix_base} €
            <span style={{ fontSize: '16px', fontWeight: 'normal', color: '#666' }}>
              {' '}/ personne
            </span>
          </div>
          <p style={{ marginTop: '10px', color: '#666' }}>
            👥 Minimum {menu.nb_personne_min} personnes
          </p>
          {menu.stock && (
            <p style={{ color: '#666' }}>
              📦 Stock disponible : {menu.stock}
            </p>
          )}
        </div>

        {menu.conditions && (
          <div style={{ 
            background: '#fff3cd', 
            padding: '15px', 
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <strong>⚠️ Conditions :</strong>
            <p style={{ marginTop: '5px' }}>{menu.conditions}</p>
          </div>
        )}

        {/* Composition du menu */}
        <div style={{ marginTop: '30px' }}>
          <h2>Composition du menu</h2>

          {/* Entrées */}
          {platsParType.entree.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#007bff' }}>🥗 Entrées</h3>
              {platsParType.entree.map(plat => (
                <div key={plat.id} style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <h4>{plat.nom}</h4>
                  <p style={{ color: '#666', fontSize: '14px' }}>{plat.description}</p>
                  
                  {plat.allergenes && plat.allergenes.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <small style={{ color: '#dc3545' }}>
                        ⚠️ Allergènes : {plat.allergenes.map(a => a.nom).join(', ')}
                      </small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Plats */}
          {platsParType.plat.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#007bff' }}>🍽️ Plats</h3>
              {platsParType.plat.map(plat => (
                <div key={plat.id} style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <h4>{plat.nom}</h4>
                  <p style={{ color: '#666', fontSize: '14px' }}>{plat.description}</p>
                  
                  {plat.allergenes && plat.allergenes.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <small style={{ color: '#dc3545' }}>
                        ⚠️ Allergènes : {plat.allergenes.map(a => a.nom).join(', ')}
                      </small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Desserts */}
          {platsParType.dessert.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#007bff' }}>🍰 Desserts</h3>
              {platsParType.dessert.map(plat => (
                <div key={plat.id} style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <h4>{plat.nom}</h4>
                  <p style={{ color: '#666', fontSize: '14px' }}>{plat.description}</p>
                  
                  {plat.allergenes && plat.allergenes.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <small style={{ color: '#dc3545' }}>
                        ⚠️ Allergènes : {plat.allergenes.map(a => a.nom).join(', ')}
                      </small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bouton Commander */}
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center',
          paddingBottom: '40px'
        }}>
          <button
            onClick={handleCommander}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🛒 Commander ce menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailPage;