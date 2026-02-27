# 🔑 Fiche Récapitulative - Comptes de Démonstration

**Projet** : Vite & Gourmand  
**URL** : https://vite-gourmand.fr  
**Date** : Février 2026

---

## 👥 COMPTES DE TEST

### 1️⃣ Compte Administrateur

- **Email** : admin@demo.fr
- **Mot de passe** : Password123!
- **Rôle** : Administrateur
- **Fonctionnalités** :
  - ✅ Gestion des menus
  - ✅ Gestion des plats
  - ✅ Gestion des allergènes
  - ✅ Visualisation de toutes les commandes
  - ✅ Validation des avis

### 2️⃣ Compte Employé

- **Email** : employe@demo.fr
- **Mot de passe** : Password123!
- **Rôle** : Employé
- **Fonctionnalités** :
  - ✅ Dashboard des commandes
  - ✅ Changement de statut des commandes
  - ✅ Validation des avis

### 3️⃣ Compte Client

- **Email** : client@demo.fr
- **Mot de passe** : Password123!
- **Rôle** : Client / Utilisateur
- **Fonctionnalités** :
  - ✅ Parcourir les menus
  - ✅ Commander un menu
  - ✅ Voir ses commandes
  - ✅ Laisser des avis
  - ✅ Annuler une commande (si en_attente)

---

## 📦 DONNÉES DE TEST

### Menus (3)
1. Menu Bio Printemps
2. Menu Gastronomique
3. Menu Végétarien

### Plats (7)
- **Entrées** : Salade bio, Velouté de légumes
- **Plats** : Poulet rôti, Pavé de saumon, Risotto végétarien
- **Desserts** : Tarte tatin, Mousse au chocolat

### Allergènes (7)
🌾 Gluten | 🥛 Lactose | 🥚 Œufs | 🥜 Fruits à coque | 🐟 Poisson | 🦐 Crustacés | 🫘 Soja

### Commandes (3)
- **Commande #13** : Menu Bio - Acceptée → 350€
- **Commande #14** : Menu Gastronomique - En préparation → 400€
- **Commande #15** : Menu Végétarien - Livrée → 360€

---

## 🎯 SCÉNARIO DE DÉMONSTRATION (4 min)

### 1. Interface Client (1 min)
1. Connexion avec client@demo.fr
2. Parcourir le menu "Menu Bio Printemps"
3. Afficher "Mes commandes" (3 commandes visibles)

### 2. Interface Employé (1 min 30)
1. Déconnexion puis connexion avec employe@demo.fr
2. Dashboard → Visualiser les 3 commandes
3. Changer le statut d'une commande (Acceptée → En préparation)

### 3. Interface Admin (1 min 30)
1. Déconnexion puis connexion avec admin@demo.fr
2. Admin Plats → Voir les 7 plats
3. Admin Allergènes → Voir les 7 allergènes
4. Visualiser toutes les commandes

---

## 🔗 LIENS UTILES

- **Site web** : https://vite-gourmand.fr
- **GitHub** : https://github.com/yvesnet9/vite-gourmand
- **Backend API** : https://vite-gourmand.fr/api

---

## 📝 NOTES TECHNIQUES

### Technologies Utilisées
- **Frontend** : React 18, React Router, Tailwind CSS
- **Backend** : Laravel 11, PHP 8.2
- **Base de données** : PostgreSQL 14
- **Déploiement** : VPS OVH, Nginx, SSL Let's Encrypt

### Architecture
- **SPA (Single Page Application)** avec routing côté client
- **API RESTful** avec authentification Sanctum
- **Responsive Design** (mobile-first)
- **Sécurité** : HTTPS, CORS, CSRF protection, Rate limiting

---

## ⚠️ IMPORTANT POUR LA SOUTENANCE

✅ **Vérifier avant la soutenance** :
- [ ] Site accessible (https://vite-gourmand.fr)
- [ ] Les 3 comptes fonctionnent
- [ ] Les commandes de test sont présentes
- [ ] Cache navigateur vidé (`localStorage.clear()`)

✅ **Documents à apporter** :
- [ ] Dossier Projet (2 exemplaires imprimés)
- [ ] Cette fiche (imprimée)
- [ ] Clé USB avec tous les PDF
- [ ] PowerPoint de présentation

✅ **En cas de problème technique** :
- Vider le localStorage : `localStorage.clear()` dans la console
- Hard refresh : Cmd + Shift + R (Mac) ou Ctrl + Shift + R (Windows)
- Navigation privée en dernier recours

---

**Bonne chance pour votre soutenance ! 🎉**
