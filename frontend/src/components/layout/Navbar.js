import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isEmployee, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: '#333',
      padding: '15px 20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
          🍽️ Vite & Gourmand
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/menus" style={{ color: 'white', textDecoration: 'none' }}>
          Menus
        </Link>

        {isAuthenticated() ? (
          <>
            {/* Lien Mes Commandes pour utilisateurs */}
            {!isEmployee() && (
              <Link to="/mes-commandes" style={{ color: 'white', textDecoration: 'none' }}>
                Mes Commandes
              </Link>
            )}

            {/* Lien Dashboard pour employés/admins */}
{isEmployee() && (
  <>
    <Link to="/dashboard-employe" style={{ color: 'white', textDecoration: 'none' }}>
      🏢 Dashboard
    </Link>
    
    {/* Lien Admin pour admins uniquement */}
    {user?.role === 'admin' && (
      <Link to="/admin/menus" style={{ color: 'white', textDecoration: 'none' }}>
        ⚙️ Admin Menus
      </Link>
    )}
  </>
)}
            
            <span style={{ color: '#aaa' }}>
              Bonjour {user?.prenom} {isEmployee() && `(${user?.role})`}
            </span>
            
            <button
              onClick={handleLogout}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              Connexion
            </Link>
            <Link to="/register" style={{
              background: '#28a745',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '4px',
              textDecoration: 'none'
            }}>
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;