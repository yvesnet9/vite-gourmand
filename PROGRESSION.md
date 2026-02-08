# 📈 Progression - Vite & Gourmand

## Features
- [x] F01 - Configuration initiale ✅ (2025-02-06)
- [x] F02 - Backend API Base ✅ (2025-02-07)
- [x] F03 - Backend API Menus ✅ (2025-02-07)
- [x] F04 - Backend API Commandes ✅ (2025-02-08)
- [ ] F05 - Frontend Base
- [ ] F06 - Frontend Menus
- [ ] F07 - Frontend Utilisateur
- [ ] F08 - Frontend Employé & Admin
- [ ] F09 - Sécurité & RGPD
- [ ] F10 - Tests
- [ ] F11 - Déploiement
- [ ] F12 - Documentation

## Notes

### 2025-02-06: F01 terminée
- ✅ Configuration VS Code
- ✅ Repository GitHub
- ✅ Installation Laravel + React
- ✅ Configuration PostgreSQL + MongoDB
- ✅ Structure SQL initiale

### 2025-02-07: F02 terminée
- ✅ Migrations Laravel (12 tables)
- ✅ Modèles Eloquent avec relations
- ✅ Authentification API (Sanctum)
- ✅ Routes : register, login, logout, me
- ✅ Tests API réussis avec Thunder Client

### 2025-02-07: F03 terminée
- ✅ CRUD Menus (index, show, store, update, destroy)
- ✅ CRUD Plats (index, show, store, update, destroy)
- ✅ CRUD Allergènes (index, show, store, update, destroy)
- ✅ Filtres dynamiques (prix, thème, régime, nb_personnes)
- ✅ Relations Menu-Plat-Allergène fonctionnelles
- ✅ Tests Thunder Client validés
- ⚠️ Note importante : Utiliser 127.0.0.1 au lieu de localhost

### 2025-02-08: F04 terminée
- ✅ CRUD Commandes (index, show, store, update, destroy)
- ✅ Calcul automatique des prix (menu, livraison, réductions)
- ✅ Gestion des statuts (en_attente, accepte, en_preparation, etc.)
- ✅ Système de suivi des commandes (historique automatique)
- ✅ CRUD Avis avec validation admin
- ✅ Permissions par rôle (utilisateur/employé/admin)
- ✅ Tests Thunder Client validés