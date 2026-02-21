# 🎓 Guide de Présentation pour le Jury

**Projet :** Vite & Gourmand  
**Auteur :** Yves Mukuna  
**Date :** Février 2025

---

## 1. Structure de la Présentation Recommandée

### ⏱️ Durée Totale : 20-30 minutes

**Répartition suggérée :**
- **Introduction** : 2 min
- **Contexte & Besoins** : 3 min
- **Architecture & Choix Techniques** : 5 min
- **Fonctionnalités Principales** : 5 min
- **Sécurité & RGPD** : 3 min
- **Déploiement** : 2 min
- **Démonstration Live** : 5 min
- **Difficultés & Solutions** : 3 min
- **Conclusion** : 2 min
- **Questions du Jury** : 10-15 min

---

## 2. Plan Détaillé de Présentation

### 📌 Slide 1 : Page de Titre

**Contenu :**
```
🍽️ VITE & GOURMAND
Application Web de Traiteur Événementiel

Présenté par : Yves Mukuna
Formation : [Nom de votre formation]
Date : [Date de soutenance]
URL : https://vite-gourmand.fr
```

**À dire :**
- Bonjour, je suis Yves Mukuna
- Je vais vous présenter mon projet de fin de formation
- Une application web complète pour un service de traiteur

---

### 📌 Slide 2 : Sommaire

**Contenu :**
1. Contexte du projet
2. Analyse des besoins
3. Architecture technique
4. Fonctionnalités développées
5. Sécurité & RGPD
6. Déploiement
7. Démonstration
8. Bilan & perspectives

---

### 📌 Slide 3 : Contexte du Projet

**Contenu :**
- **Problématique** : Un traiteur événementiel souhaite digitaliser son activité
- **Objectifs** :
  - Permettre aux clients de consulter et commander des menus en ligne
  - Faciliter la gestion des commandes pour l'équipe
  - Offrir un outil de gestion admin complet
- **Durée** : 12 jours (06/02/2025 - 18/02/2025)
- **Résultat** : Application en production sur https://vite-gourmand.fr

**À dire :**
- Le projet consiste à créer une plateforme complète de commande en ligne
- L'objectif était de développer une solution professionnelle, sécurisée et conforme RGPD
- L'application est actuellement déployée et fonctionnelle

---

### 📌 Slide 4 : Analyse des Besoins

**Contenu :**
**Acteurs identifiés :**
- 👥 **Visiteurs** : Consultation menus, inscription
- 👤 **Clients** : Commandes, suivi, avis
- 👨‍💼 **Employés** : Gestion commandes, validation avis
- 🔧 **Administrateurs** : Gestion complète (menus, plats, utilisateurs)

**Fonctionnalités clés :**
- Catalogue de menus avec informations détaillées
- Système de commande en ligne
- Gestion des allergènes
- Système d'avis clients
- Conformité RGPD (export données, droit à l'oubli)

**À dire :**
- J'ai identifié 4 types d'acteurs avec des besoins différents
- Le système propose 29 cas d'usage au total
- Un accent particulier a été mis sur la sécurité et le RGPD

---

### 📌 Slide 5 : Modèle de Données (MCD)

**Contenu :**
**13 tables principales :**
- Users, Menus, Plats, Allergènes
- Commandes, Avis, Contacts
- Tables associatives (menu_plat, plat_allergene)

**Relations clés :**
```
User (1) ───< Commandes (N)
User (1) ───< Avis (N)
Menu (1) ───< Commandes (N)
Menu (N) >──< Plats (N)
Plats (N) >──< Allergènes (N)
```

**Points techniques :**
- Normalisation 3NF respectée
- Intégrité référentielle (CASCADE/RESTRICT)
- Index sur colonnes critiques

**À dire :**
- Le modèle de données compte 13 tables
- J'ai respecté les formes normales pour éviter la redondance
- Les relations sont optimisées avec des index

---

### 📌 Slide 6 : Architecture Technique

**Contenu :**
**Architecture 3-tiers :**

```
┌──────────────────┐
│   Frontend       │
│   React SPA      │
└────────┬─────────┘
         │ HTTPS (API REST)
         ▼
┌──────────────────┐
│   Backend        │
│   Laravel 10     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Base de Données │
│  PostgreSQL 14   │
└──────────────────┘
```

**Stack Technique :**
- **Frontend** : React 18, React Router, Axios
- **Backend** : Laravel 10 (PHP 8.2), Sanctum
- **BDD** : PostgreSQL 14
- **Serveur** : Nginx, VPS OVH Ubuntu 22.04

**À dire :**
- J'ai choisi une architecture découplée pour la flexibilité
- Le frontend et le backend communiquent via API REST
- Cette architecture permet l'évolutivité du système

---

### 📌 Slide 7 : Choix Techniques Justifiés

**Contenu :**

| Technologie | Justification |
|------------|---------------|
| **React** | Framework moderne, composants réutilisables, écosystème riche |
| **Laravel** | Framework PHP robuste, ORM Eloquent, sécurité intégrée |
| **PostgreSQL** | SGBD relationnel performant, intégrité des données |
| **Sanctum** | Authentification API simple et sécurisée |
| **Nginx** | Serveur web performant, proxy inverse efficace |

**À dire :**
- Chaque choix technologique a été réfléchi
- React pour une expérience utilisateur fluide (SPA)
- Laravel pour sa robustesse et ses fonctionnalités de sécurité
- PostgreSQL pour la fiabilité des données

---

### 📌 Slide 8 : Fonctionnalités Développées

**Contenu :**
**Côté Client :**
- ✅ Inscription / Connexion sécurisée
- ✅ Consultation catalogue menus
- ✅ Passage de commandes
- ✅ Suivi commandes en temps réel
- ✅ Système d'avis (note + commentaire)
- ✅ Gestion données personnelles (RGPD)

**Côté Administration :**
- ✅ Dashboard employé
- ✅ Gestion des commandes (statuts)
- ✅ Validation avis clients
- ✅ CRUD Menus / Plats / Allergènes
- ✅ Gestion utilisateurs

**À dire :**
- L'application couvre toute la chaîne de valeur
- Les clients peuvent commander et suivre leurs commandes
- L'équipe dispose d'outils de gestion complets

---

### 📌 Slide 9 : Sécurité Implémentée

**Contenu :**
**Mesures de sécurité :**

🔒 **Authentification :**
- Tokens Sanctum (API)
- Mots de passe hashés (bcrypt)
- Validation complexité (10+ caractères, majuscules, chiffres, symboles)

🔒 **Protection des données :**
- HTTPS obligatoire (Let's Encrypt)
- Headers HTTP sécurisés (CSP, HSTS, X-Frame-Options)
- CORS configuré strictement

🔒 **Contrôle d'accès :**
- Policies Laravel (autorisations)
- FormRequests (validation entrées)
- Rate Limiting (5 login/min, 60 API/min)

**À dire :**
- La sécurité a été une priorité dès le départ
- Plusieurs couches de protection (transport, application, données)
- Protection contre les attaques courantes (XSS, CSRF, injection SQL)

---

### 📌 Slide 10 : Conformité RGPD

**Contenu :**
**Droits implémentés :**

📋 **Transparence :**
- Politique de confidentialité accessible
- Consentement explicite à l'inscription

📋 **Contrôle des données :**
- Export complet des données (JSON)
- Droit à l'effacement (suppression compte)
- Gestion consentement newsletter

**Données collectées :**
- Strictement nécessaires au service
- Stockage sécurisé (PostgreSQL)
- Suppression en cascade lors de suppression compte

**À dire :**
- L'application est pleinement conforme au RGPD
- Les utilisateurs ont un contrôle total sur leurs données
- Les données sont supprimées de manière définitive sur demande

---

### 📌 Slide 11 : Déploiement en Production

**Contenu :**
**Infrastructure :**
- VPS OVH (Ubuntu 22.04)
- Domaine : vite-gourmand.fr
- HTTPS avec certificat SSL automatique

**Processus de déploiement :**
1. Configuration serveur (Nginx, PHP, PostgreSQL)
2. Clone repository GitHub
3. Installation dépendances (Composer, npm)
4. Configuration environnement (.env)
5. Migrations base de données
6. Build frontend React
7. Installation SSL (Certbot)

**URL de production :** https://vite-gourmand.fr

**À dire :**
- L'application est déployée et accessible en ligne
- Le processus de déploiement est documenté et reproductible
- Le renouvellement SSL est automatique

---

### 📌 Slide 12 : Tests Implémentés

**Contenu :**
**15 tests automatisés :**

**Tests Authentification (9 tests) :**
- Inscription (avec/sans RGPD, email unique, mot de passe)
- Connexion (succès, échec, compte désactivé)
- Déconnexion

**Tests Menus (3 tests) :**
- Liste publique
- Création (admin uniquement)
- Autorisations

**Tests RGPD (6 tests) :**
- Export données
- Suppression compte
- Consentement newsletter
- Pages publiques

**Commande :** `php artisan test` → 15 tests passent ✅

**À dire :**
- J'ai développé des tests pour valider les fonctionnalités critiques
- Les tests garantissent la non-régression lors des évolutions
- Tous les tests passent avec succès

---

### 📌 Slide 13 : Démonstration Live

**Contenu :**
**Scénario de démonstration :**

1. **Page d'accueil** : Présenter l'interface
2. **Consultation menus** : Parcourir le catalogue
3. **Inscription** : Créer un compte (montrer validation RGPD)
4. **Connexion** : Se connecter
5. **Passer une commande** : Démontrer le processus
6. **Espace client** : Voir "Mes Commandes"
7. **RGPD** : Montrer export données
8. **Admin** : Connexion admin → Dashboard

**À dire :**
- "Je vais maintenant vous faire une démonstration en direct"
- "Vous pouvez voir que l'application est réactive et intuitive"
- Commenter chaque action pour expliciter la logique

---

### 📌 Slide 14 : Difficultés Rencontrées

**Contenu :**
**Problèmes majeurs & solutions :**

1. **Accès SSH au VPS**
   - Problème : Impossibilité de se connecter en mode normal
   - Solution : Création utilisateur en mode rescue, réinitialisation mot de passe

2. **Configuration API Frontend**
   - Problème : URL API en dur (localhost)
   - Solution : Variables d'environnement (.env.production)

3. **Routing Nginx API**
   - Problème : Routes API 404
   - Solution : Configuration location blocks adaptée

4. **Tests automatisés**
   - Problème : Dépendances incompatibles (MongoDB)
   - Solution : Ignore platform requirements, SQLite pour tests

**À dire :**
- Chaque difficulté a été l'occasion d'apprendre
- J'ai dû faire preuve de débrouillardise et de persévérance
- La résolution de problèmes fait partie intégrante du développement

---

### 📌 Slide 15 : Métriques du Projet

**Contenu :**
**Quantitatif :**
- 📅 **Durée** : 12 jours
- 💻 **Lignes de code** : ~5000 (Backend) + ~3000 (Frontend)
- 📊 **Tables BDD** : 13 tables
- 🛣️ **Routes API** : 46 routes
- 🧪 **Tests** : 15 tests automatisés
- 📄 **Pages** : 15+ pages/composants React

**Qualitatif :**
- ✅ Application fonctionnelle en production
- ✅ Code organisé et documenté
- ✅ Sécurité robuste
- ✅ RGPD compliant
- ✅ Responsive design

**À dire :**
- Le projet représente un travail conséquent
- Toutes les fonctionnalités planifiées ont été implémentées
- L'application est prête pour une utilisation réelle

---

### 📌 Slide 16 : Compétences Acquises

**Contenu :**
**Techniques :**
- Développement Frontend (React, SPA)
- Développement Backend (Laravel, API REST)
- Gestion BDD relationnelle (PostgreSQL)
- Sécurité web (HTTPS, authentification, RGPD)
- Déploiement (VPS, Nginx, SSL)

**Méthodologiques :**
- Gestion de projet (planification, suivi)
- Résolution de problèmes
- Débogage et tests
- Documentation

**Soft Skills :**
- Autonomie
- Persévérance
- Capacité d'apprentissage

**À dire :**
- Ce projet m'a permis de valider mes compétences full-stack
- J'ai appris à gérer un projet de A à Z
- Je suis maintenant capable de livrer une application en production

---

### 📌 Slide 17 : Perspectives d'Évolution

**Contenu :**
**Améliorations possibles :**

**Fonctionnelles :**
- 💳 Paiement en ligne (Stripe)
- 📧 Notifications par email
- 📱 Application mobile (React Native)
- 📊 Tableau de bord statistiques
- 🎨 Personnalisation menus

**Techniques :**
- ⚡ Cache Redis
- 📈 Monitoring (logs, métriques)
- 🔄 CI/CD automatisé
- 🌍 Internationalisation
- ♿ Accessibilité (WCAG)

**À dire :**
- L'application est évolutive
- De nombreuses fonctionnalités peuvent être ajoutées
- L'architecture actuelle le permet facilement

---

### 📌 Slide 18 : Conclusion

**Contenu :**
**Objectifs atteints :**
✅ Application web complète et fonctionnelle  
✅ Stack technique moderne et professionnelle  
✅ Sécurité et conformité RGPD  
✅ Déployée en production  
✅ Testée et documentée  

**Bilan personnel :**
- Projet enrichissant et formateur
- Validation des compétences full-stack
- Capacité à mener un projet complet

**Remerciements :**
- Formateurs
- Camarades de promotion
- Jury

**À dire :**
- Ce projet représente l'aboutissement de ma formation
- Je suis fier du résultat obtenu
- Je suis maintenant prêt à intégrer le monde professionnel
- Merci pour votre attention, je suis à votre disposition pour vos questions

---

## 3. Conseils pour la Présentation

### 🎤 Expression Orale

**À FAIRE :**
- ✅ Parler clairement et à un rythme modéré
- ✅ Regarder les membres du jury
- ✅ Montrer votre enthousiasme pour le projet
- ✅ Expliquer avec vos propres mots (pas réciter)
- ✅ Utiliser des exemples concrets
- ✅ Être précis sur les choix techniques

**À ÉVITER :**
- ❌ Lire les slides mot à mot
- ❌ Parler trop vite
- ❌ Utiliser trop de jargon technique
- ❌ Dire "euh..." à répétition
- ❌ S'excuser pour le projet

### 💻 Démonstration Technique

**Préparation :**
- Tester la démo plusieurs fois avant
- Préparer un compte de test
- Avoir un plan B (vidéo) si problème réseau
- Nettoyer la base de test

**Pendant la démo :**
- Narrer chaque action
- Montrer les validations
- Montrer le responsive
- Ouvrir la console développeur si besoin

### 🗣️ Gestion des Questions

**Types de questions attendues :**

**Questions Techniques :**
- "Pourquoi Laravel plutôt que Symfony ?"
- "Comment gérez-vous la sécurité ?"
- "Quelle est votre stratégie de tests ?"

**Questions Méthodologiques :**
- "Comment avez-vous géré votre temps ?"
- "Quelle a été la partie la plus difficile ?"

**Questions Conceptuelles :**
- "Comment avez-vous modélisé les données ?"
- "Pourquoi cette architecture ?"

**Réponse type :**
1. Reformuler la question
2. Répondre clairement
3. Donner un exemple si possible
4. Demander si la réponse est suffisante

**Si vous ne savez pas :**
- "Je n'ai pas approfondi ce point précis"
- "C'est une perspective intéressante que je n'avais pas envisagée"
- "Je peux vous expliquer ce que j'ai fait à la place"

---

## 4. Checklist Jour J

### Avant la Présentation

- [ ] Slides prêts (PowerPoint, PDF, Google Slides)
- [ ] Application accessible en ligne
- [ ] Compte de test créé
- [ ] Démo testée
- [ ] Documents techniques imprimés (ou sur clé USB)
- [ ] Tenue professionnelle
- [ ] Arriver 15 minutes en avance
- [ ] Téléphone en mode silencieux

### Matériel à Apporter

- [ ] Ordinateur portable chargé
- [ ] Chargeur
- [ ] Souris (optionnel)
- [ ] Adaptateur HDMI/VGA si nécessaire
- [ ] Documents imprimés :
  - CV
  - MCD/MLD
  - Cas d'usage
  - Architecture technique
- [ ] Clé USB de secours (présentation + vidéo démo)

### Pendant la Présentation

- [ ] Respirer, rester calme
- [ ] Sourire
- [ ] Regarder les jurés
- [ ] Gérer son temps
- [ ] Boire un peu d'eau si besoin
- [ ] Remercier le jury

---

## 5. Questions Fréquentes du Jury

### Q1 : "Pourquoi avez-vous choisi React plutôt que Vue ou Angular ?"

**Réponse suggérée :**
"J'ai choisi React pour plusieurs raisons :
1. C'est le framework le plus utilisé dans l'industrie, ce qui me donne des perspectives d'emploi
2. Sa philosophie basée sur les composants facilite la réutilisabilité du code
3. L'écosystème est très riche (React Router, nombreuses bibliothèques)
4. Je l'avais déjà utilisé dans des projets précédents, ce qui m'a permis d'être plus efficace"

### Q2 : "Comment assurez-vous la sécurité de l'application ?"

**Réponse suggérée :**
"J'ai mis en place plusieurs couches de sécurité :
- Au niveau transport : HTTPS obligatoire avec certificat SSL
- Au niveau authentification : tokens Sanctum, mots de passe hashés avec bcrypt
- Au niveau validation : FormRequests Laravel qui valident toutes les entrées
- Au niveau autorisations : Policies qui vérifient les droits d'accès
- Protection contre les abus : Rate limiting (5 tentatives login/min)
- Headers HTTP sécurisés : CSP, X-Frame-Options, HSTS
Toutes ces mesures combinées offrent une protection robuste."

### Q3 : "Qu'est-ce que le RGPD et comment l'avez-vous implémenté ?"

**Réponse suggérée :**
"Le RGPD est le Règlement Général sur la Protection des Données, qui encadre le traitement des données personnelles en Europe.
J'ai implémenté les droits principaux :
- Droit à l'information : politique de confidentialité accessible
- Droit d'accès : export de toutes les données en JSON
- Droit à l'oubli : possibilité de supprimer son compte
- Consentement : explicite à l'inscription
Les données sont supprimées de manière définitive et irréversible sur demande."

### Q4 : "Quelle a été la partie la plus difficile du projet ?"

**Réponse suggérée :**
"La partie la plus difficile a été le déploiement en production. J'ai rencontré des problèmes d'accès SSH au serveur VPS, ce qui m'a obligé à utiliser le mode rescue pour créer un nouvel utilisateur. J'ai également dû résoudre des problèmes de configuration Nginx pour router correctement les requêtes API. Ces difficultés m'ont appris l'importance de bien comprendre l'infrastructure et m'ont poussé à développer mes compétences en administration système."

### Q5 : "Si vous aviez plus de temps, que feriez-vous ?"

**Réponse suggérée :**
"Si j'avais plus de temps, j'ajouterais :
1. Un système de paiement en ligne (Stripe ou PayPal)
2. Des notifications email automatiques (confirmation commande, changement statut)
3. Un tableau de bord avec des statistiques pour l'admin
4. Une application mobile avec React Native
5. Plus de tests automatisés pour couvrir davantage de scénarios
Mais je suis satisfait de ce qui a été réalisé dans les délais impartis."

### Q6 : "Pourquoi PostgreSQL plutôt que MySQL ?"

**Réponse suggérée :**
"J'ai choisi PostgreSQL pour plusieurs raisons :
1. Meilleur respect des standards SQL
2. Types de données plus riches (JSON, Arrays)
3. Gestion avancée des contraintes d'intégrité
4. Performances excellentes sur les requêtes complexes
5. Licence open-source plus permissive
Bien que MySQL soit également un excellent choix, PostgreSQL correspondait mieux aux besoins du projet."

---

## 6. Auto-Évaluation Avant Soutenance

### Questions à se poser :

✅ **Technique :**
- Puis-je expliquer chaque choix technologique ?
- Puis-je dessiner l'architecture de mémoire ?
- Connais-je les principales routes API ?
- Puis-je expliquer le flux d'une commande ?

✅ **Fonctionnel :**
- Puis-je décrire les cas d'usage principaux ?
- Connais-je le rôle de chaque acteur ?
- Puis-je expliquer les règles métier ?

✅ **Sécurité :**
- Quelles mesures de sécurité sont en place ?
- Comment sont stockés les mots de passe ?
- Comment fonctionne l'authentification ?

✅ **RGPD :**
- Quels sont les droits implémentés ?
- Comment un utilisateur peut-il exporter ses données ?
- Que se passe-t-il lors d'une suppression de compte ?

---

## 📝 Conclusion

**Clés de réussite :**
- ✅ Bien connaître son projet
- ✅ Savoir justifier ses choix
- ✅ Être honnête sur les limites
- ✅ Montrer son enthousiasme
- ✅ Rester calme et professionnel

**N'oubliez pas :**
- Vous êtes le spécialiste de VOTRE projet
- Le jury veut évaluer vos compétences, pas vous piéger
- Respirez, souriez, et faites-vous confiance !

**BONNE CHANCE ! 🍀**
