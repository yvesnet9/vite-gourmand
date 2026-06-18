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
      background: '#f5ecdd',
      padding: '15px 20px',
      color: '#241b13',
      borderBottom: '1px solid #e3d5bf',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: '#241b13', textDecoration: 'none', fontSize: '21px', fontWeight: 700, fontFamily: "'Fraunces', Georgia, serif", letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'center', gap: '9px' }} onClick={closeMenu}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#b1492a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><circle cx="14" cy="14" r="5.5" /><path d="M4 4v4 M6 4v4 M5 8v16" /><path d="M24 4c-1.6 0-2.6 2.2-2.6 4.8 0 1.7 1 2.6 2 2.8 M23.4 11.6V24" /></svg>
          Vite & Gourmand
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Ouvrir le menu de navigation"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-mobile"
          style={{
            background: 'none',
            border: 'none',
            color: '#241b13',
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
          <Link to="/menus" style={{ color: '#241b13', textDecoration: 'none' }}>
            Menus
          </Link>

          {isAuthenticated() ? (
            <>
              {!isEmployee() && (
                <Link to="/mes-commandes" style={{ color: '#241b13', textDecoration: 'none' }}>
                  Mes Commandes
                </Link>
              )}

              {isEmployee() && (
                <Link to="/dashboard-employe" style={{ color: '#241b13', textDecoration: 'none' }}>
                  🏢 Dashboard
                </Link>
              )}

              {user?.role === 'administrateur' && (
                <>
                  <Link to="/admin/menus" style={{ color: '#241b13', textDecoration: 'none' }}>
                    ⚙️ Admin Menus
                  </Link>
                  <Link to="/admin/plats" style={{ color: '#241b13', textDecoration: 'none' }}>
                    🍽️ Admin Plats
                  </Link>

                 <Link to="/admin/stats" style={{ color: '#241b13', textDecoration: 'none' }}>
                 📊 Statistiques
                  </Link>

                  <Link to="/admin/allergenes" style={{ color: '#241b13', textDecoration: 'none' }}>
                    🥜 Admin Allergènes
                  </Link>
                </>
              )}

              {isEmployee() && (
                <Link to="/admin/avis" style={{ color: '#241b13', textDecoration: 'none' }}>
                  ⭐ Avis
                </Link>
              )}

              <span style={{ color: '#7d6f5c' }}>
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
              <Link to="/login" style={{ color: '#241b13', textDecoration: 'none' }}>
                Connexion
              </Link>
              <Link to="/register" style={{
                background: '#b1492a',
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
          borderTop: '1px solid #e3d5bf'
        }} className="mobile-menu" id="navbar-mobile">
          <Link to="/menus" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
            Menus
          </Link>

          {isAuthenticated() ? (
            <>
              {!isEmployee() && (
                <Link to="/mes-commandes" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                  Mes Commandes
                </Link>
              )}

              {isEmployee() && (
                <Link to="/dashboard-employe" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                  🏢 Dashboard
                </Link>
              )}

              {user?.role === 'administrateur' && (
                <>
                  <Link to="/admin/menus" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                    ⚙️ Admin Menus
                  </Link>
                  <Link to="/admin/plats" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                    🍽️ Admin Plats
                  </Link>
                 <Link to="/admin/stats" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                📊 Statistiques
                  </Link>
                  <Link to="/admin/allergenes" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                    🥜 Admin Allergènes
                  </Link>
                </>
              )}

              {isEmployee() && (
                <Link to="/admin/avis" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                  ⭐ Avis
                </Link>
              )}

              <span style={{ color: '#7d6f5c' }}>
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
              <Link to="/login" style={{ color: '#241b13', textDecoration: 'none' }} onClick={closeMenu}>
                Connexion
              </Link>
              <Link to="/register" style={{
                background: '#b1492a',
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
