-- Structure de base de données PostgreSQL - Vite & Gourmand

DROP TABLE IF EXISTS avis CASCADE;
DROP TABLE IF EXISTS suivi_commandes CASCADE;
DROP TABLE IF EXISTS commandes CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS menu_plat CASCADE;
DROP TABLE IF EXISTS plat_allergene CASCADE;
DROP TABLE IF EXISTS images_menu CASCADE;
DROP TABLE IF EXISTS plats CASCADE;
DROP TABLE IF EXISTS allergenes CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS horaires CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gsm VARCHAR(20) NOT NULL,
    adresse TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('visiteur', 'utilisateur', 'employe', 'administrateur')),
    active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE TABLE horaires (
    id SERIAL PRIMARY KEY,
    jour VARCHAR(10) NOT NULL UNIQUE,
    heure_ouverture TIME NOT NULL,
    heure_fermeture TIME NOT NULL,
    ferme BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    theme VARCHAR(50) NOT NULL,
    regime VARCHAR(50) NOT NULL,
    nb_personne_min INTEGER NOT NULL,
    prix_base DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    conditions TEXT,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images_menu (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER NOT NULL,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    ordre INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
);

CREATE TABLE allergenes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE NOT NULL,
    icone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plats (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL,
    image_url VARCHAR(500),
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plat_allergene (
    id SERIAL PRIMARY KEY,
    plat_id INTEGER NOT NULL,
    allergene_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plat_id) REFERENCES plats(id) ON DELETE CASCADE,
    FOREIGN KEY (allergene_id) REFERENCES allergenes(id) ON DELETE CASCADE,
    UNIQUE(plat_id, allergene_id)
);

CREATE TABLE menu_plat (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER NOT NULL,
    plat_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
    FOREIGN KEY (plat_id) REFERENCES plats(id) ON DELETE CASCADE,
    UNIQUE(menu_id, plat_id)
);

CREATE TABLE commandes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    menu_id INTEGER NOT NULL,
    nb_personnes INTEGER NOT NULL,
    date_prestation DATE NOT NULL,
    heure_prestation TIME NOT NULL,
    adresse_livraison TEXT NOT NULL,
    ville_livraison VARCHAR(100) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    distance_km DECIMAL(10, 2) DEFAULT 0,
    prix_menu DECIMAL(10, 2) NOT NULL,
    prix_livraison DECIMAL(10, 2) DEFAULT 0,
    reduction DECIMAL(10, 2) DEFAULT 0,
    prix_total DECIMAL(10, 2) NOT NULL,
    statut VARCHAR(50) NOT NULL DEFAULT 'en_attente',
    pret_materiel BOOLEAN DEFAULT FALSE,
    date_retour_materiel DATE NULL,
    motif_annulation TEXT NULL,
    mode_contact_annulation VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE RESTRICT
);

CREATE TABLE suivi_commandes (
    id SERIAL PRIMARY KEY,
    commande_id INTEGER NOT NULL,
    ancien_statut VARCHAR(50),
    nouveau_statut VARCHAR(50) NOT NULL,
    commentaire TEXT,
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE avis (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    commande_id INTEGER NOT NULL UNIQUE,
    note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
    commentaire TEXT NOT NULL,
    valide BOOLEAN DEFAULT FALSE,
    date_validation TIMESTAMP NULL,
    validateur_id INTEGER NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (validateur_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    traite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
