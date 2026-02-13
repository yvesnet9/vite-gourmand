import React, { useEffect, useState } from 'react';
import rgpdService from '../../services/rgpdService';

const MentionsLegalesPage = () => {
  const [mentions, setMentions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentions = async () => {
      try {
        const data = await rgpdService.getMentionsLegales();
        setMentions(data);
      } catch (error) {
        console.error('Erreur lors du chargement des mentions légales', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentions();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Chargement...</div>;
  }

  if (!mentions) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Erreur de chargement</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>{mentions.titre}</h1>

      {mentions.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>
            {section.titre}
          </h2>
          <p style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {section.contenu}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MentionsLegalesPage;