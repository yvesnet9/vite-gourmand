import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#241b13',
      color: '#f5ecdd',
      padding: '60px 20px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Contenu principal du footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          
          {/* Colonne 1 : À propos */}
          <div>
            <h3 style={{
              fontSize: '21px',
              marginBottom: '20px',
              fontWeight: 700,
              fontFamily: "'Fraunces', Georgia, serif",
              borderBottom: '2px solid #b1492a',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              Vite & Gourmand
            </h3>
            <p style={{
              lineHeight: '1.8',
              color: '#e8dcc8',
              marginTop: '20px'
            }}>
              Votre traiteur professionnel pour tous vos événements. 
              Des produits frais, une équipe passionnée, un service irréprochable.
            </p>
          </div>

          {/* Colonne 2 : Horaires */}
          <div>
            <h3 style={{
              fontSize: '21px',
              marginBottom: '20px',
              fontWeight: 700,
              fontFamily: "'Fraunces', Georgia, serif",
              borderBottom: '2px solid #b1492a',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              Nos Horaires
            </h3>
            <div style={{ marginTop: '20px', lineHeight: '2', color: '#e8dcc8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Lundi :</span>
                <span style={{ fontWeight: 'bold', color: '#f5ecdd' }}>9h00 - 18h00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Mardi :</span>
                <span style={{ fontWeight: 'bold', color: '#f5ecdd' }}>9h00 - 18h00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Mercredi :</span>
                <span style={{ fontWeight: 'bold', color: '#f5ecdd' }}>9h00 - 18h00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Jeudi :</span>
                <span style={{ fontWeight: 'bold', color: '#f5ecdd' }}>9h00 - 18h00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Vendredi :</span>
                <span style={{ fontWeight: 'bold', color: '#f5ecdd' }}>9h00 - 18h00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Samedi :</span>
                <span style={{ fontWeight: 'bold', color: '#f5ecdd' }}>10h00 - 16h00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Dimanche :</span>
                <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>Fermé</span>
              </div>
            </div>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <h3 style={{
              fontSize: '21px',
              marginBottom: '20px',
              fontWeight: 700,
              fontFamily: "'Fraunces', Georgia, serif",
              borderBottom: '2px solid #b1492a',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              Contact
            </h3>
            <div style={{ marginTop: '20px', lineHeight: '2', color: '#e8dcc8' }}>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', color: '#f5ecdd', marginBottom: '5px' }}>
                  📍 Adresse
                </div>
                <div>123 Rue de la Gastronomie</div>
                <div>75001 Paris, France</div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', color: '#f5ecdd', marginBottom: '5px' }}>
                  📞 Téléphone
                </div>
                <div>01 23 45 67 89</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#f5ecdd', marginBottom: '5px' }}>
                  ✉️ Email
                </div>
                <div>contact@vite-gourmand.fr</div>
              </div>
            </div>
          </div>

          {/* Colonne 4 : Liens rapides */}
          <div>
            <h3 style={{
              fontSize: '21px',
              marginBottom: '20px',
              fontWeight: 700,
              fontFamily: "'Fraunces', Georgia, serif",
              borderBottom: '2px solid #b1492a',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              Liens Rapides
            </h3>
            <div style={{ marginTop: '20px', lineHeight: '2.5' }}>
              <div>
                <Link
                  to="/menus"
                  style={{
                    color: '#e8dcc8',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#b1492a'}
                  onMouseLeave={(e) => e.target.style.color = '#e8dcc8'}
                >
                  → Nos Menus
                </Link>
              </div>
              <div>
                <Link
                  to="/rgpd/mentions-legales"
                  style={{
                    color: '#e8dcc8',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#b1492a'}
                  onMouseLeave={(e) => e.target.style.color = '#e8dcc8'}
                >
                  → Mentions Légales
                </Link>
              </div>
              <div>
                <Link
                  to="/rgpd/politique-confidentialite"
                  style={{
                    color: '#e8dcc8',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#b1492a'}
                  onMouseLeave={(e) => e.target.style.color = '#e8dcc8'}
                >
                  → Politique de Confidentialité
                </Link>
              </div>
              <div>
                <Link
                  to="/rgpd/cgv"
                  style={{
                    color: '#e8dcc8',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#b1492a'}
                  onMouseLeave={(e) => e.target.style.color = '#e8dcc8'}
                >
                  → Conditions Générales de Vente
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div style={{
          borderTop: '1px solid #3a2f24',
          paddingTop: '20px',
          marginTop: '40px',
          textAlign: 'center',
          color: '#e8dcc8',
          fontSize: '14px'
        }}>
          <p>
            © {new Date().getFullYear()} Vite & Gourmand. Tous droits réservés.
          </p>
          <p style={{ marginTop: '10px' }}>
            Développé avec ❤️ pour l'excellence culinaire
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;