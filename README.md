# 🍽️ Vite & Gourmand

Application web de traiteur événementiel - Projet de fin de formation

**URL de production :** [https://vite-gourmand.fr](https://vite-gourmand.fr)

---

## 📋 Description

Vite & Gourmand est une plateforme de commande en ligne pour un service de traiteur événementiel. L'application permet aux clients de parcourir des menus, passer des commandes, et laisser des avis. Les employés et administrateurs disposent d'interfaces de gestion dédiées.

---

## 🚀 Technologies

### Backend
- **Laravel 10** (PHP 8.2)
- **PostgreSQL 14**
- **Sanctum** (Authentification API)
- **Nginx** (Serveur web)

### Frontend
- **React 18** (Create React App)
- **React Router** (Navigation)
- **Axios** (Requêtes HTTP)

### Déploiement
- **VPS OVH** (Ubuntu 22.04)
- **Let's Encrypt** (Certificat SSL)
- **GitHub** (Gestion de version)

---

## ✨ Fonctionnalités

### 👤 Utilisateurs
- ✅ Inscription / Connexion avec validation sécurisée
- ✅ Consultation des menus disponibles
- ✅ Passage de commandes avec suivi
- ✅ Gestion des avis sur les menus
- ✅ Export des données personnelles (RGPD)
- ✅ Suppression de compte

### 👨‍💼 Employés
- ✅ Gestion des commandes (statuts, suivi)
- ✅ Validation des avis clients
- ✅ Création et modification de menus

### 🔧 Administrateurs
- ✅ Gestion complète des menus et plats
- ✅ Gestion des allergènes
- ✅ Gestion des utilisateurs
- ✅ Accès à toutes les fonctionnalités

---

## 🔒 Sécurité

- **Authentification** : Laravel Sanctum (tokens API)
- **Validation** : FormRequests avec règles strictes
- **Autorisations** : Policies pour contrôle d'accès
- **Rate Limiting** : Protection contre les abus (5 req/min login, 60 req/min API)
- **Headers HTTP** : X-Frame-Options, CSP, HSTS, etc.
- **HTTPS** : Certificat SSL Let's Encrypt
- **Mots de passe** : Hashage bcrypt, validation complexité (10+ caractères)
- **RGPD** : Export données, suppression compte, consentement

---

## 📦 Installation (Développement)

### Prérequis
- PHP 8.2+
- PostgreSQL 14+
- Node.js 18+
- Composer
- Git

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🌐 Déploiement (Production)

Le projet est déployé sur **https://vite-gourmand.fr**

### Infrastructure
- **Serveur** : VPS OVH (Ubuntu 22.04)
- **Domaine** : vite-gourmand.fr (OVH)
- **SSL** : Let's Encrypt (automatique)

### Stack
- **Backend** : `/var/www/vite-gourmand/backend`
- **Frontend** : `/var/www/vite-gourmand/frontend/build`
- **Base de données** : PostgreSQL 14 (`vite_gourmand_prod`)

---

## 📊 Progression

**Projet terminé à 100% ✅**

- [x] F01 - Configuration initiale
- [x] F02 - Modèles et migrations
- [x] F03 - Seeders et factories
- [x] F04 - API CRUD Backend
- [x] F05 - Frontend React
- [x] F06 - Authentification
- [x] F07 - Gestion commandes
- [x] F08 - Interfaces admin/employé
- [x] F09 - Sécurité & RGPD
- [x] F10 - Tests (15 tests)
- [x] F11 - Déploiement
- [x] F12 - Documentation

---

## 👨‍💻 Auteur

**Yves Mukuna**

- GitHub : [@yvesnet9](https://github.com/yvesnet9)
- Projet : https://github.com/yvesnet9/vite-gourmand

---

## 📅 Informations

- **Date de début** : 06/02/2025
- **Date de fin** : 18/02/2025
- **Durée** : 12 jours
- **Type** : Projet de fin de formation

---

## 📄 Licence

Projet académique - Formation développement web