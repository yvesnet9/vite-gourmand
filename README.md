cd ~/Developer/vite-gourmand

# Créer le nouveau README
cat > README.md << 'EOF'
# 🍽️ Vite & Gourmand

Application web de traiteur événementiel développée avec Laravel 10 (Backend) et React 18 (Frontend).

## 📖 Description

Vite & Gourmand est une plateforme permettant à un service de traiteur événementiel de gérer ses menus, commandes et clients en ligne. L'application offre :

- **Espace Public** : Consultation des menus avec filtres (thème, régime alimentaire)
- **Espace Client** : Commande en ligne, suivi, avis, gestion RGPD
- **Espace Employé** : Gestion des commandes et validation des avis
- **Espace Admin** : CRUD complet (menus, plats, allergènes, utilisateurs)

---

## 🚀 Fonctionnalités

✅ Authentification sécurisée (Laravel Sanctum)  
✅ Gestion complète des menus et plats  
✅ Système de commandes avec workflow  
✅ Avis clients avec modération  
✅ Conformité RGPD (export données, droit à l'oubli)  
✅ Interface responsive (mobile et desktop)  
✅ Tests automatisés (15 tests)  
✅ Déployé en production avec HTTPS  

---

## 🛠️ Technologies

### Backend
- **Laravel 10** (PHP 8.2)
- **PostgreSQL 14**
- **Laravel Sanctum** (authentification API)
- **PHPUnit** (tests)

### Frontend
- **React 18**
- **React Router v6**
- **Axios**
- **Context API** (gestion d'état)

### Infrastructure
- **Nginx** (serveur web)
- **VPS OVH** (Ubuntu 22.04)
- **Let's Encrypt** (SSL)

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

## 📚 Documentation

Documentation complète pour la soutenance disponible dans le dossier [`docs/`](./docs/)

### Documents Principaux

- **ECF STUDI** : [`docs/01-ecf-studi/`](./docs/01-ecf-studi/) - Document à rendre à l'école (15 pages)
- **Dossier Projet** : [`docs/02-dossier-jury/`](./docs/02-dossier-jury/) - Pour le jury DREETS (75 pages)
- **Présentation** : [`docs/03-presentation/`](./docs/03-presentation/) - PowerPoint 18 slides
- **Screenshots** : [`docs/04-screenshots/`](./docs/04-screenshots/) - 11 captures d'écran
- **Docs Techniques** : [`docs/05-documentation-technique/`](./docs/05-documentation-technique/) - 10 fichiers MD

### Liens Utiles

- **Application** : https://vite-gourmand.fr
- **Trello** : https://trello.com/b/TmPyFsmL/vite-gourmand-projet-dwwm
- **GitHub** : https://github.com/yvesnet9/vite-gourmand

### Comptes de Démo

- **Admin** : admin@demo.fr / Password123!
- **Employé** : employe@demo.fr / Password123!
- **Client** : client@demo.fr / Password123!

---

## 👨‍💻 Auteur

**Jamesy MUKUNA MUKENKETAYI**
- GitHub : [@yvesnet9](https://github.com/yvesnet9)
- Email : yvesnet9@gmail.com
- Projet : https://github.com/yvesnet9/vite-gourmand

---

## 📅 Informations

- **Date de début** : 06/02/2025
- **Date de fin** : 18/02/2025
- **Durée** : 12 jours
- **Type** : Projet de Titre Professionnel DWWM
- **Formation** : STUDI - Paris
- **Session** : Juin-Juillet 2026

---

## 📄 Licence

Projet académique - Formation développement web
EOF

echo "✅ README principal mis à jour !"
cat README.md