import React from 'react';

const CgvPage = () => {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#333', marginBottom: '30px', borderBottom: '3px solid #667eea', paddingBottom: '15px' }}>
          Conditions Générales de Vente
        </h1>
        
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>
          En vigueur au {new Date().toLocaleDateString('fr-FR')}
        </p>

        {/* Article 1 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 1 - Objet
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre :
          </p>
          <ul style={{ color: '#666', lineHeight: '1.8', marginLeft: '20px' }}>
            <li>L'entreprise <strong>Vite & Gourmand</strong>, société de traiteur professionnel, ci-après dénommée "le Prestataire"</li>
            <li>Toute personne physique ou morale souhaitant bénéficier de nos services, ci-après dénommée "le Client"</li>
          </ul>
        </section>

        {/* Article 2 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 2 - Services proposés
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            Vite & Gourmand propose des prestations de traiteur incluant :
          </p>
          <ul style={{ color: '#666', lineHeight: '1.8', marginLeft: '20px' }}>
            <li>La conception et réalisation de menus personnalisés</li>
            <li>La livraison et l'installation sur site</li>
            <li>Le prêt de matériel (vaisselle, couverts, nappes)</li>
            <li>La gestion complète d'événements</li>
          </ul>
        </section>

        {/* Article 3 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 3 - Commandes
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            <strong>3.1 Passation de commande</strong><br />
            Les commandes peuvent être passées via notre plateforme en ligne ou par téléphone. Toute commande implique l'acceptation pleine et entière des présentes CGV.
          </p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            <strong>3.2 Nombre minimum de personnes</strong><br />
            Chaque menu comporte un nombre minimum de personnes indiqué sur la fiche produit. Les commandes en-deçà de ce minimum ne pourront être acceptées.
          </p>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            <strong>3.3 Délai de commande</strong><br />
            Les commandes doivent être passées au minimum 48 heures avant la date de prestation souhaitée.
          </p>
        </section>

        {/* Article 4 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 4 - Prix et paiement
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            <strong>4.1 Prix</strong><br />
            Les prix sont indiqués en euros TTC. Ils sont valables au jour de la commande et peuvent être modifiés à tout moment.
          </p>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            <strong>4.2 Modalités de paiement</strong><br />
            Un acompte de 30% est exigé à la confirmation de la commande. Le solde est réglé au plus tard 48h avant la date de prestation.
          </p>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            <strong>4.3 Moyens de paiement acceptés</strong><br />
            Carte bancaire, virement bancaire, chèque.
          </p>
        </section>

        {/* Article 5 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 5 - Livraison
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            <strong>5.1 Zone de livraison</strong><br />
            Nos livraisons sont effectuées dans un rayon de 50 km autour de Paris. Au-delà, des frais supplémentaires peuvent s'appliquer.
          </p>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            <strong>5.2 Horaires</strong><br />
            Le Client s'engage à être présent ou à désigner une personne habilitée à réceptionner la commande à l'heure convenue.
          </p>
        </section>

        {/* Article 6 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 6 - Annulation et modification
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '10px' }}>
            <strong>6.1 Modification</strong><br />
            Toute modification de commande doit être signalée au minimum 72 heures avant la date de prestation.
          </p>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            <strong>6.2 Annulation</strong><br />
            - Plus de 15 jours avant : remboursement intégral<br />
            - Entre 15 et 7 jours : retenue de 30%<br />
            - Moins de 7 jours : retenue de 50%<br />
            - Moins de 48h : aucun remboursement
          </p>
        </section>

        {/* Article 7 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 7 - Allergènes et régimes spéciaux
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            Le Client doit impérativement signaler toute allergie ou régime alimentaire spécial lors de la commande. Vite & Gourmand met tout en œuvre pour respecter ces contraintes mais ne peut garantir l'absence totale de traces.
          </p>
        </section>

        {/* Article 8 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 8 - Prêt de matériel
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            Le matériel prêté (vaisselle, couverts, nappes) reste la propriété de Vite & Gourmand. Le Client s'engage à le restituer dans l'état initial. Tout matériel manquant ou détérioré sera facturé au Client.
          </p>
        </section>

        {/* Article 9 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 9 - Réclamations
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            Toute réclamation doit être formulée par écrit dans les 48 heures suivant la prestation à l'adresse : contact@vite-gourmand.fr
          </p>
        </section>

        {/* Article 10 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 10 - Protection des données personnelles
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            Les données collectées sont utilisées uniquement dans le cadre de la prestation de services. Conformément au RGPD, le Client dispose d'un droit d'accès, de rectification et de suppression de ses données. Pour plus d'informations, consultez notre{' '}
            <a href="/rgpd/politique-confidentialite" style={{ color: '#667eea', textDecoration: 'none' }}>
              Politique de Confidentialité
            </a>.
          </p>
        </section>

        {/* Article 11 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 11 - Responsabilité
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            Vite & Gourmand ne pourra être tenue responsable en cas de force majeure ou d'événement indépendant de sa volonté empêchant l'exécution de la prestation.
          </p>
        </section>

        {/* Article 12 */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', fontSize: '22px', marginBottom: '15px' }}>
            Article 12 - Droit applicable et juridiction
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux de Paris seront seuls compétents.
          </p>
        </section>

        {/* Contact */}
        <section style={{ marginTop: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Contact</h3>
          <p style={{ color: '#666', lineHeight: '1.8', margin: 0 }}>
            <strong>Vite & Gourmand</strong><br />
            123 Rue de la Gastronomie<br />
            75001 Paris, France<br />
            Tél : 01 23 45 67 89<br />
            Email : contact@vite-gourmand.fr
          </p>
        </section>
      </div>
    </div>
  );
};

export default CgvPage;