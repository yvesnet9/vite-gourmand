-- Données de test - Vite & Gourmand

INSERT INTO users (nom, prenom, email, password, gsm, adresse, role, active, email_verified_at) VALUES
('Martinez', 'José', 'jose@vitegourmand.fr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+33612345678', '15 Rue de la Cuisine, 33000 Bordeaux', 'administrateur', true, CURRENT_TIMESTAMP),
('Dupont', 'Julie', 'julie@vitegourmand.fr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+33612345679', '15 Rue de la Cuisine, 33000 Bordeaux', 'employe', true, CURRENT_TIMESTAMP),
('Martin', 'Sophie', 'sophie.martin@email.fr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+33612345681', '25 Avenue Victor Hugo, 33000 Bordeaux', 'utilisateur', true, CURRENT_TIMESTAMP);

INSERT INTO horaires (jour, heure_ouverture, heure_fermeture) VALUES
('lundi', '09:00', '18:00'),
('mardi', '09:00', '18:00'),
('mercredi', '09:00', '18:00'),
('jeudi', '09:00', '18:00'),
('vendredi', '09:00', '20:00'),
('samedi', '10:00', '20:00'),
('dimanche', '10:00', '16:00');

INSERT INTO menus (titre, description, theme, regime, nb_personne_min, prix_base, stock, conditions) VALUES
('Menu de Noël Traditionnel', 'Un menu festif pour célébrer Noël en famille', 'noel', 'classique', 6, 49.90, 10, 'Commande minimum 7 jours avant'),
('Menu Végétarien', 'Menu 100% végétarien', 'classique', 'vegetarien', 4, 34.90, 20, 'Commande minimum 3 jours avant');
