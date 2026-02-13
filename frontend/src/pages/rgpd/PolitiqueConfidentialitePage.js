import React, { useEffect, useState } from 'react';
import rgpdService from '../../services/rgpdService';

const PolitiqueConfidentialitePage = () => {
  const [politique, setPolitique] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolitique = async () => {
      try {
        const data = await rgpdService.getPolitiqueConfidentialite();
        setPolitique(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la politique', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolitique();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (!politique) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Erreur de chargement</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>{politique.titre}</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Dernière mise à jour : {politique.date_mise_a_jour}
      </p>

      {politique.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>
            {section.titre}
          </h2>
          <p style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {section.contenu}
          </p>
        </div>
      ))}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '5px' 
      }}>
        <h3>Contact</h3>
        <p>
          Pour toute question concernant vos données personnelles ou cette politique de confidentialité, 
          vous pouvez nous contacter à : <strong>contact@vite-gourmand.fr</strong>
        </p>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialitePage;