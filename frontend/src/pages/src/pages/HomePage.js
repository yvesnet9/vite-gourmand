import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import avisService from '../services/avisService';

const HomePage = () => {
  const [avis, setAvis] = useState([]);

  useEffect(() => {
    fetchAvis();
  }, []);

  const fetchAvis = async () => {
    try {
      const data = await avisService.getAvis();
      // Prendre seulement les 3 derniers avis validés
      setAvis(data.slice(0, 3));
    } catch (err) {
      console.error('Erreur chargement avis:', err);
    }
  };

  return (
    <div style={{ background: '#f5f5f5' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
            🍽️ Vite & Gourmand
          </h1>
          <p style={{ fontSize: '24px', marginBottom: '40px', opacity: 0.9 }}>
            Votre traiteur professionnel pour tous vos événements
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/menus"
              style={{
                padding: '15px 40px',
                background: 'white',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Découvrir nos menus
            </Link>
            <Link
              to="/register"
              style={{
                padding: '15px 40px',
                background: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '2px solid white'
              }}
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </section>

      {/* Présentation de l'entreprise */}
      <section style={{
        background: 'white',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333'
          }}>
            À propos de Vite & Gourmand
          </h2>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#666',
            textAlign: 'center'
          }}>
            <p style={{ marginBottom: '20px' }}>
              Depuis plus de 10 ans, <strong>Vite & Gourmand</strong> met son expertise culinaire au service de vos événements professionnels et privés.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Notre équipe de chefs passionnés sélectionne avec soin des produits frais et de saison pour vous offrir une expérience gastronomique unique.
            </p>
            <p>
              Que ce soit pour un mariage, un séminaire d'entreprise, un anniversaire ou tout autre événement, nous créons des menus sur mesure adaptés à vos besoins et à votre budget.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section style={{
        background: '#f5f5f5',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#333'
          }}>
            Notre Équipe Professionnelle
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {/* Membre 1 */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                👨‍🍳
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
                Chef Pierre Martin
              </h3>
              <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '15px' }}>
                Chef Exécutif
              </p>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                15 ans d'expérience dans la gastronomie française. Formé dans les plus grandes maisons parisiennes.
              </p>
            </div>

            {/* Membre 2 */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                👩‍🍳
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
                Sophie Dubois
              </h3>
              <p style={{ color: '#f5576c', fontWeight: 'bold', marginBottom: '15px' }}>
                Chef Pâtissière
              </p>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Spécialiste des desserts raffinés. Créatrice de pièces montées uniques pour vos événements.
              </p>
            </div>

            {/* Membre 3 */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                🎯
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
                Marc Leroy
              </h3>
              <p style={{ color: '#00f2fe', fontWeight: 'bold', marginBottom: '15px' }}>
                Responsable Événementiel
              </p>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Expert en organisation d'événements. Coordonne chaque détail pour une prestation parfaite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avis Clients */}
      <section style={{
        background: 'white',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#333'
          }}>
            Ils Nous Font Confiance
          </h2>
          
          {avis.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '18px' }}>
              Aucun avis pour le moment
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {avis.map(avisItem => (
                <div
                  key={avisItem.id}
                  style={{
                    background: '#f9f9f9',
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    borderLeft: '4px solid #667eea'
                  }}
                >
                  <div style={{ marginBottom: '15px' }}>
                    {'⭐'.repeat(avisItem.note)}
                  </div>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#666',
                    marginBottom: '20px',
                    fontStyle: 'italic'
                  }}>
                    "{avisItem.commentaire}"
                  </p>
                  <p style={{ color: '#333', fontWeight: 'bold' }}>
                    {avisItem.user?.prenom || 'Client'}
                  </p>
                  <p style={{ color: '#999', fontSize: '14px' }}>
                    {new Date(avisItem.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>
            Prêt à Organiser Votre Événement ?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
            Découvrez nos menus et réservez dès aujourd'hui
          </p>
          <Link
            to="/menus"
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              background: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            Voir nos menus
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;