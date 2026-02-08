import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🍽️ Vite & Gourmand</h1>
      <p>Service de traiteur professionnel</p>
      
      <div style={{ marginTop: '40px' }}>
        <h2>Nos Services</h2>
        <p>Découvrez nos menus pour tous vos événements</p>
        
        <div style={{ marginTop: '20px' }}>
          <Link to="/menus" style={{ 
            padding: '10px 20px', 
            background: '#007bff', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px',
            margin: '0 10px'
          }}>
            Voir les menus
          </Link>
          
          <Link to="/register" style={{ 
            padding: '10px 20px', 
            background: '#28a745', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px',
            margin: '0 10px'
          }}>
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;