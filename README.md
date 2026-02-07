# 🍽️ Vite & Gourmand

Application web de traiteur événementiel

**Stack :** Laravel + React + PostgreSQL + MongoDB

## 📦 Installation

### Backend
```bash
cd backend
composer install
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🔑 Comptes de test
- **Admin :** jose@vitegourmand.fr / Password123!
- **Employé :** julie@vitegourmand.fr / Password123!
- **Client :** sophie.martin@email.fr / Password123!

## 📊 Progression
Voir [PROGRESSION.md](PROGRESSION.md)
# 📈 Progression - Vite & Gourmand

## Features
- [x] F01 - Configuration initiale ✅ (2025-02-06)
- [x] F02 - Backend API Base ✅ (2025-02-07)
- [ ] F03 - Backend API Menus
- [ ] F04 - Backend API Commandes
- [ ] F05 - Frontend Base
- [ ] F06 - Frontend Menus
- [ ] F07 - Frontend Utilisateur
- [ ] F08 - Frontend Employé & Admin
- [ ] F09 - Sécurité & RGPD
- [ ] F10 - Tests
- [ ] F11 - Déploiement
- [ ] F12 - Documentation

## Notes
- 2025-02-06: F01 terminée
- 2025-02-07: F02 terminée
  - ✅ Migrations Laravel (12 tables)
  - ✅ Modèles Eloquent avec relations
  - ✅ Authentification API (Sanctum)
  - ✅ Routes : register, login, logout, me
  - ✅ Tests API réussis avec Thunder Client