import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isEmployee, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav style={{
      background: '#333',
      padding: '15px 20px',
      color: 'white',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} onClick={closeMenu}>
          🍽️ Vite & Gourmand
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '28px',
            cursor: 'pointer',
            display: 'none',
            padding: '5px'
          }}
          className="hamburger-menu"
        >
          ☰
        </button>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="desktop-menu">
          <Link to="/menus" style={{ color: 'white', textDecoration: 'none' }}>
            Menus
          </Link>

          {isAuthenticated() ? (
            <>
              {!isEmployee() && (
                <Link to="/mes-commandes" style={{ color: 'white', textDecoration: 'none' }}>
                  Mes Commandes
                </Link>
              )}

              {isEmployee() && (
                <Link to="/dashboard-employe" style={{ color: 'white', textDecoration: 'none' }}>
                  🏢 Dashboard
                </Link>
              )}

              {user?.role === 'administrateur' && (
                <>
                  <Link to="/admin/menus" style={{ color: 'white', textDecoration: 'none' }}>
                    ⚙️ Admin Menus
                  </Link>
                  <Link to="/admin/plats" style={{ color: 'white', textDecoration: 'none' }}>
                    🍽️ Admin Plats
                  </Link>
                  <Link to="/admin/allergenes" style={{ color: 'white', textDecoration: 'none' }}>
                    🥜 Admin Allergènes
                  </Link>
                </>
              )}

              {isEmployee() && (
                <Link to="/admin/avis" style={{ color: 'white', textDecoration: 'none' }}>
                  ⭐ Avis
                </Link>
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
      </div>

      {isMenuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid #555'
        }} className="mobile-menu">
          <Link to="/menus" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
            Menus
          </Link>

          {isAuthenticated() ? (
            <>
              {!isEmployee() && (
                <Link to="/mes-commandes" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
                  Mes Commandes
                </Link>
              )}

              {isEmployee() && (
                <Link to="/dashboard-employe" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
                  🏢 Dashboard
                </Link>
              )}

              {user?.role === 'administrateur' && (
                <>
                  <Link to="/admin/menus" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
                    ⚙️ Admin Menus
                  </Link>
                  <Link to="/admin/plats" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
                    🍽️ Admin Plats
                  </Link>
                  <Link to="/admin/allergenes" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
                    🥜 Admin Allergènes
                  </Link>
                </>
              )}

              {isEmployee() && (
                <Link to="/admin/avis" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
                  ⭐ Avis
                </Link>
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
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>
                Connexion
              </Link>
              <Link to="/register" style={{
                background: '#28a745',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '4px',
                textDecoration: 'none',
                textAlign: 'center'
              }} onClick={closeMenu}>
                Inscription
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger-menu {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;