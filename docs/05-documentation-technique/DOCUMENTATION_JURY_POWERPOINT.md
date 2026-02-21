# 📊 Plan PowerPoint Détaillé

**Projet :** Vite & Gourmand  
**Auteur :** Yves Mukuna  
**Date :** Février 2025

---

## Structure de la Présentation

**Total : 18 slides (+ slides bonus optionnelles)**  
**Durée : 20-25 minutes**

---

## SLIDE 1 : Page de Titre

### Contenu Visuel
```
┌─────────────────────────────────────────┐
│                                         │
│         🍽️                              │
│    VITE & GOURMAND                      │
│                                         │
│  Application Web de Traiteur            │
│       Événementiel                      │
│                                         │
│  ─────────────────────────────          │
│                                         │
│  Présenté par : Yves Mukuna             │
│  Formation : [Votre formation]          │
│  Date : [Date de soutenance]            │
│                                         │
│  🌐 https://vite-gourmand.fr            │
└─────────────────────────────────────────┘
```

### Design
- **Fond** : Dégradé vert nature (#2C5F2D → #48BB78)
- **Texte** : Blanc (#FFFFFF)
- **Icône** : Emoji 🍽️ grande taille
- **Footer** : URL en petit

### Notes Présentateur
"Bonjour, je suis Yves Mukuna. Je vais vous présenter mon projet de fin de formation : Vite & Gourmand, une application web complète pour un service de traiteur événementiel. L'application est actuellement en ligne et accessible à l'adresse indiquée."

---

## SLIDE 2 : Sommaire

### Contenu
```
┌─────────────────────────────────────────┐
│  SOMMAIRE                               │
│                                         │
│  1. Contexte & Objectifs                │
│  2. Analyse des Besoins                 │
│  3. Modélisation des Données (MCD)      │
│  4. Architecture Technique              │
│  5. Fonctionnalités Développées         │
│  6. Sécurité & RGPD                     │
│  7. Tests Automatisés                   │
│  8. Déploiement en Production           │
│  9. Démonstration Live                  │
│  10. Bilan & Perspectives               │
└─────────────────────────────────────────┘
```

### Design
- Liste numérotée claire
- Icônes à gauche de chaque point (optionnel)
- Texte aligné à gauche

### Notes Présentateur
"Voici le plan de ma présentation. Je vais d'abord vous présenter le contexte, puis l'analyse technique, les fonctionnalités, et enfin une démonstration en direct de l'application."

---

## SLIDE 3 : Contexte du Projet

### Contenu
```
┌─────────────────────────────────────────┐
│  CONTEXTE DU PROJET                     │
│                                         │
│  🎯 Problématique                       │
│  Un traiteur événementiel souhaite      │
│  digitaliser son activité               │
│                                         │
│  📋 Objectifs                           │
│  • Permettre aux clients de commander  │
│    des menus en ligne                  │
│  • Faciliter la gestion des commandes  │
│  • Offrir un outil admin complet       │
│  • Assurer la sécurité et conformité   │
│                                         │
│  ⏱️ Durée : 12 jours                   │
│  📅 Février 2025                        │
└─────────────────────────────────────────┘
```

### Design
- Icônes pour chaque section
- Points clés en bullet points
- Encadré "Info" pour la durée

### Notes Présentateur
"Le projet consiste à créer une plateforme de commande en ligne pour un service de traiteur. L'objectif était de développer une solution complète, sécurisée et conforme au RGPD en 12 jours."

---

## SLIDE 4 : Analyse des Besoins

### Contenu
```
┌─────────────────────────────────────────┐
│  ANALYSE DES BESOINS                    │
│                                         │
│  Acteurs Identifiés                     │
│                                         │
│  👥 Visiteurs                           │
│  Consultation menus, Inscription        │
│                                         │
│  👤 Clients (Utilisateurs)              │
│  Commandes, Suivi, Avis                 │
│                                         │
│  👨‍💼 Employés                            │
│  Gestion commandes, Validation avis     │
│                                         │
│  🔧 Administrateurs                     │
│  Gestion complète (menus, plats, users) │
│                                         │
│  📊 Total : 29 cas d'usage              │
└─────────────────────────────────────────┘
```

### Design
- Icônes pour chaque acteur
- Couleurs différentes par rôle
- Chiffre clé en bas

### Notes Présentateur
"J'ai identifié 4 types d'acteurs avec des besoins spécifiques. Chaque acteur dispose de fonctionnalités adaptées à son rôle, pour un total de 29 cas d'usage implémentés."

---

## SLIDE 5 : Modèle de Données (MCD)

### Contenu
```
┌─────────────────────────────────────────┐
│  MODÈLE CONCEPTUEL DE DONNÉES          │
│                                         │
│  📦 13 Tables Principales               │
│                                         │
│  [SCHÉMA MCD SIMPLIFIÉ]                │
│                                         │
│  Users ──< Commandes >── Menus         │
│    │         │                          │
│    └───< Avis                          │
│                                         │
│  Menus >──< Plats >──< Allergènes     │
│                                         │
│  ✅ Normalisation 3NF                  │
│  ✅ Intégrité référentielle            │
│  ✅ Index sur colonnes critiques        │
└─────────────────────────────────────────┘
```

### Design
- Schéma visuel simple avec flèches
- Badges de validation en bas
- Couleurs pour différencier entités

### Notes Présentateur
"Le modèle de données compte 13 tables. J'ai respecté les formes normales pour éviter la redondance. Les relations clés sont : un utilisateur peut avoir plusieurs commandes, un menu peut être commandé plusieurs fois, et les menus sont composés de plats."

---

## SLIDE 6 : Architecture 3-Tiers

### Contenu
```
┌─────────────────────────────────────────┐
│  ARCHITECTURE TECHNIQUE                 │
│                                         │
│  ┌───────────────────┐                 │
│  │   Frontend        │                 │
│  │   React 18 (SPA)  │                 │
│  └─────────┬─────────┘                 │
│            │ API REST (HTTPS)           │
│            ▼                            │
│  ┌───────────────────┐                 │
│  │   Backend         │                 │
│  │   Laravel 10      │                 │
│  │   PHP 8.2         │                 │
│  └─────────┬─────────┘                 │
│            │                            │
│            ▼                            │
│  ┌───────────────────┐                 │
│  │  Base de Données  │                 │
│  │  PostgreSQL 14    │                 │
│  └───────────────────┘                 │
│                                         │
│  Serveur : Nginx (VPS OVH)             │
└─────────────────────────────────────────┘
```

### Design
- Schéma en blocs empilés
- Flèches pour montrer flux
- Fond dégradé pour chaque tier

### Notes Présentateur
"J'ai opté pour une architecture 3-tiers découplée. Le frontend React communique avec le backend Laravel via une API REST sécurisée en HTTPS. Cette architecture permet l'évolutivité et la séparation des responsabilités."

---

## SLIDE 7 : Choix Techniques Justifiés

### Contenu
```
┌─────────────────────────────────────────┐
│  JUSTIFICATION DES CHOIX TECHNIQUES     │
│                                         │
│  🎨 React 18                            │
│  → Composants réutilisables, écosystème│
│    riche, expérience SPA fluide        │
│                                         │
│  ⚙️ Laravel 10                          │
│  → Framework PHP robuste, Eloquent ORM, │
│    sécurité intégrée, documentation    │
│                                         │
│  🗄️ PostgreSQL 14                      │
│  → SGBD fiable, respect standards SQL, │
│    intégrité des données               │
│                                         │
│  🔐 Laravel Sanctum                     │
│  → Authentification API simple et       │
│    sécurisée par tokens                │
│                                         │
│  🌐 Nginx                               │
│  → Serveur performant, proxy inverse   │
└─────────────────────────────────────────┘
```

### Design
- Icônes tech à gauche
- Justification en 1-2 lignes
- Séparation visuelle entre items

### Notes Présentateur
"Chaque choix technologique a été réfléchi. React pour l'expérience utilisateur, Laravel pour sa robustesse et ses fonctionnalités de sécurité, PostgreSQL pour la fiabilité, Sanctum pour l'authentification, et Nginx pour les performances."

---

## SLIDE 8 : Fonctionnalités Client

### Contenu
```
┌─────────────────────────────────────────┐
│  FONCTIONNALITÉS CÔTÉ CLIENT           │
│                                         │
│  [SCREENSHOT : Page d'accueil]         │
│                                         │
│  ✅ Inscription / Connexion sécurisée   │
│  ✅ Consultation catalogue menus        │
│  ✅ Passage de commandes                │
│  ✅ Suivi commandes en temps réel       │
│  ✅ Système d'avis (note + commentaire) │
│  ✅ Gestion données RGPD                │
└─────────────────────────────────────────┘
```

### Design
- Screenshot en haut (50% du slide)
- Liste checkmarks en bas
- Couleur verte pour ✅

### Notes Présentateur
"Voici l'interface client. Les utilisateurs peuvent parcourir les menus, passer des commandes, suivre leur statut, laisser des avis, et gérer leurs données personnelles conformément au RGPD."

---

## SLIDE 9 : Fonctionnalités Administration

### Contenu
```
┌─────────────────────────────────────────┐
│  FONCTIONNALITÉS ADMINISTRATION         │
│                                         │
│  [SCREENSHOT : Dashboard admin]        │
│                                         │
│  👨‍💼 Employés                            │
│  • Gestion des commandes (statuts)     │
│  • Validation avis clients             │
│                                         │
│  🔧 Administrateurs                     │
│  • CRUD Menus / Plats / Allergènes     │
│  • Gestion utilisateurs                │
│  • Statistiques & rapports             │
└─────────────────────────────────────────┘
```

### Design
- Screenshot dashboard en haut
- Séparation visuelle employé/admin
- Icônes pour différencier rôles

### Notes Présentateur
"L'interface d'administration permet aux employés de gérer les commandes et valider les avis. Les administrateurs ont accès à des fonctionnalités étendues comme la gestion complète des menus, plats, allergènes et utilisateurs."

---

## SLIDE 10 : Sécurité Implémentée

### Contenu
```
┌─────────────────────────────────────────┐
│  MESURES DE SÉCURITÉ                    │
│                                         │
│  🔒 Authentification                    │
│  • Tokens Sanctum (API)                │
│  • Mots de passe hashés (bcrypt)       │
│  • Complexité : 10+ caractères         │
│                                         │
│  🔒 Protection des Données              │
│  • HTTPS obligatoire (SSL)             │
│  • Headers HTTP sécurisés              │
│  • CORS configuré strictement          │
│                                         │
│  🔒 Contrôle d'Accès                    │
│  • Policies (autorisations)            │
│  • FormRequests (validation)           │
│  • Rate Limiting (5 login/min)         │
└─────────────────────────────────────────┘
```

### Design
- 3 sections avec icônes cadenas
- Bullet points clairs
- Fond légèrement grisé pour chaque bloc

### Notes Présentateur
"La sécurité a été une priorité. J'ai mis en place plusieurs couches : authentification par tokens, mots de passe hashés avec validation stricte, HTTPS obligatoire, protection contre les attaques courantes, et contrôle d'accès granulaire avec les policies."

---

## SLIDE 11 : Conformité RGPD

### Contenu
```
┌─────────────────────────────────────────┐
│  CONFORMITÉ RGPD                        │
│                                         │
│  [SCREENSHOT : Page Mes Données]       │
│                                         │
│  📋 Droits Implémentés                  │
│                                         │
│  ✅ Transparence                        │
│  Politique de confidentialité + Consent │
│                                         │
│  ✅ Accès & Portabilité                 │
│  Export complet des données (JSON)      │
│                                         │
│  ✅ Droit à l'Oubli                     │
│  Suppression définitive du compte       │
└─────────────────────────────────────────┘
```

### Design
- Screenshot page RGPD en haut
- 3 blocs avec checkmarks
- Icônes pour chaque droit

### Notes Présentateur
"L'application est pleinement conforme au RGPD. Les utilisateurs peuvent consulter la politique de confidentialité, exporter toutes leurs données au format JSON, et supprimer leur compte de manière définitive et irréversible."

---

## SLIDE 12 : Tests Automatisés

### Contenu
```
┌─────────────────────────────────────────┐
│  TESTS AUTOMATISÉS                      │
│                                         │
│  📊 15 Tests Implémentés                │
│                                         │
│  🧪 Authentification (9 tests)          │
│  • Inscription (validation RGPD)       │
│  • Connexion (succès/échec)            │
│  • Déconnexion                          │
│                                         │
│  🧪 Menus CRUD (3 tests)                │
│  • Liste publique                       │
│  • Création admin                       │
│  • Autorisations                        │
│                                         │
│  🧪 RGPD (6 tests)                      │
│  • Export données                       │
│  • Suppression compte                   │
│  • Consentement                         │
│                                         │
│  ✅ Tous les tests passent              │
└─────────────────────────────────────────┘
```

### Design
- Chiffre 15 en gros
- 3 catégories avec icônes éprouvette
- Badge "✅ Tous passent" en vert

### Notes Présentateur
"J'ai développé 15 tests automatisés couvrant les fonctionnalités critiques : authentification, menus, et RGPD. Les tests sont exécutables avec PHPUnit et garantissent la non-régression."

---

## SLIDE 13 : Déploiement Production

### Contenu
```
┌─────────────────────────────────────────┐
│  DÉPLOIEMENT EN PRODUCTION              │
│                                         │
│  🖥️ Infrastructure                      │
│  • VPS OVH (Ubuntu 22.04)              │
│  • Domaine : vite-gourmand.fr          │
│  • IP : 37.59.124.193                  │
│                                         │
│  🔐 SSL/HTTPS                           │
│  • Certificat Let's Encrypt            │
│  • Renouvellement automatique          │
│  • HTTPS obligatoire                    │
│                                         │
│  ⚙️ Stack Serveur                       │
│  • Nginx (proxy inverse)               │
│  • PHP-FPM 8.2                         │
│  • PostgreSQL 14                        │
│                                         │
│  🌐 https://vite-gourmand.fr           │
└─────────────────────────────────────────┘
```

### Design
- Icônes pour chaque section
- URL en gros en bas
- Fond avec capture cadenas SSL

### Notes Présentateur
"L'application est déployée sur un VPS OVH avec Ubuntu. J'ai configuré Nginx comme serveur web, installé un certificat SSL avec Let's Encrypt pour le HTTPS, et tout est accessible sur vite-gourmand.fr."

---

## SLIDE 14 : Métriques du Projet

### Contenu
```
┌─────────────────────────────────────────┐
│  MÉTRIQUES DU PROJET                    │
│                                         │
│  Quantitatif                            │
│                                         │
│  ⏱️  12 jours                           │
│  💻  ~8000 lignes de code               │
│  📊  13 tables de base de données       │
│  🛣️  46 routes API                      │
│  🧪  15 tests automatisés               │
│  📄  15+ pages/composants React         │
│                                         │
│  Qualitatif                             │
│                                         │
│  ✅ Application fonctionnelle           │
│  ✅ Code organisé et documenté          │
│  ✅ Sécurité robuste                    │
│  ✅ Conforme RGPD                       │
│  ✅ Responsive design                   │
└─────────────────────────────────────────┘
```

### Design
- 2 colonnes : Quantitatif / Qualitatif
- Icônes pour chaque métrique
- Chiffres en gras

### Notes Présentateur
"Quelques chiffres clés : 12 jours de développement, environ 8000 lignes de code, 13 tables, 46 routes API, 15 tests. Qualitativement, l'application est fonctionnelle, sécurisée, et conforme RGPD."

---

## SLIDE 15 : Démonstration Live

### Contenu
```
┌─────────────────────────────────────────┐
│  DÉMONSTRATION EN DIRECT                │
│                                         │
│         🖥️                              │
│                                         │
│  Scénario :                             │
│                                         │
│  1️⃣ Page d'accueil & Navigation        │
│  2️⃣ Consultation des menus             │
│  3️⃣ Inscription d'un utilisateur       │
│  4️⃣ Connexion                           │
│  5️⃣ Passage d'une commande             │
│  6️⃣ Espace "Mes Commandes"             │
│  7️⃣ Export données RGPD                │
│  8️⃣ Interface admin (bonus)            │
│                                         │
│  🌐 https://vite-gourmand.fr           │
└─────────────────────────────────────────┘
```

### Design
- Icône ordinateur au centre
- Liste numérotée claire
- URL en évidence en bas

### Notes Présentateur
"Je vais maintenant vous faire une démonstration en direct de l'application. Je vais créer un compte, passer une commande, et vous montrer les fonctionnalités principales."

**ACTION : Ouvrir le navigateur et faire la démo**

---

## SLIDE 16 : Difficultés & Solutions

### Contenu
```
┌─────────────────────────────────────────┐
│  DIFFICULTÉS RENCONTRÉES                │
│                                         │
│  ⚠️ Accès SSH au VPS                   │
│  Problème : Mot de passe non accepté   │
│  Solution : Mode rescue + création user │
│                                         │
│  ⚠️ Configuration API Frontend          │
│  Problème : URL hardcodée (localhost)  │
│  Solution : Variables d'environnement   │
│                                         │
│  ⚠️ Routing Nginx                       │
│  Problème : Routes API 404             │
│  Solution : Configuration location      │
│                                         │
│  💡 Apprentissages                      │
│  • Résolution de problèmes             │
│  • Administration système               │
│  • Débrouillardise & persévérance      │
└─────────────────────────────────────────┘
```

### Design
- Icônes warning pour problèmes
- Icône ampoule pour apprentissages
- Alternance fond clair/foncé

### Notes Présentateur
"J'ai rencontré plusieurs difficultés, notamment l'accès SSH au serveur et la configuration Nginx. Chaque obstacle a été l'occasion d'apprendre. J'ai dû faire preuve de débrouillardise et de persévérance pour résoudre ces problèmes."

---

## SLIDE 17 : Perspectives d'Évolution

### Contenu
```
┌─────────────────────────────────────────┐
│  PERSPECTIVES D'ÉVOLUTION               │
│                                         │
│  Fonctionnelles                         │
│  💳 Paiement en ligne (Stripe)         │
│  📧 Notifications email                 │
│  📱 Application mobile (React Native)  │
│  📊 Dashboard statistiques avancé      │
│                                         │
│  Techniques                             │
│  ⚡ Cache Redis                         │
│  📈 Monitoring (logs, métriques)       │
│  🔄 CI/CD automatisé                   │
│  🌍 Internationalisation (i18n)        │
│  ♿ Accessibilité (WCAG)               │
│                                         │
│  L'architecture actuelle permet         │
│  ces évolutions facilement              │
└─────────────────────────────────────────┘
```

### Design
- 2 colonnes distinctes
- Icônes pour chaque amélioration
- Message positif en bas

### Notes Présentateur
"L'application est évolutive. De nombreuses améliorations sont possibles : paiement en ligne, notifications, application mobile, dashboard avancé. L'architecture actuelle permet d'ajouter ces fonctionnalités sans refonte majeure."

---

## SLIDE 18 : Conclusion

### Contenu
```
┌─────────────────────────────────────────┐
│  CONCLUSION                             │
│                                         │
│  Objectifs Atteints ✅                  │
│                                         │
│  ✓ Application complète et fonctionnelle│
│  ✓ Stack technique moderne              │
│  ✓ Sécurité & RGPD respectés           │
│  ✓ Déployée en production              │
│  ✓ Testée et documentée                 │
│                                         │
│  Bilan Personnel                        │
│                                         │
│  💪 Compétences full-stack validées     │
│  📚 Apprentissages nombreux             │
│  🎯 Projet mené de A à Z                │
│  🚀 Prêt pour le monde professionnel    │
│                                         │
│  Merci pour votre attention ! 🙏        │
│                                         │
│  Questions ?                            │
└─────────────────────────────────────────┘
```

### Design
- 2 sections : Objectifs / Bilan
- Checkmarks verts
- Icônes illustratives
- "Questions ?" en gros à la fin

### Notes Présentateur
"En conclusion, tous les objectifs ont été atteints. Ce projet représente l'aboutissement de ma formation et m'a permis de valider mes compétences en développement full-stack. Je suis maintenant prêt à intégrer le monde professionnel. Merci pour votre attention, je suis à votre disposition pour vos questions."

---

## SLIDES BONUS (Optionnels)

### BONUS 1 : Cas d'Usage Détaillé

```
┌─────────────────────────────────────────┐
│  CAS D'USAGE : PASSER UNE COMMANDE     │
│                                         │
│  [DIAGRAMME DE SÉQUENCE]               │
│                                         │
│  Client → Frontend → Backend → BDD     │
│                                         │
│  1. Sélection menu                      │
│  2. Formulaire commande                 │
│  3. Validation données                  │
│  4. Vérification autorisations          │
│  5. Enregistrement BDD                  │
│  6. Confirmation client                 │
└─────────────────────────────────────────┘
```

### BONUS 2 : Comparaison Technologies

```
┌─────────────────────────────────────────┐
│  POURQUOI LARAVEL ET PAS SYMFONY ?     │
│                                         │
│  Laravel                    Symfony     │
│  ✅ Plus simple            ✅ Plus robuste│
│  ✅ Eloquent ORM           ✅ Doctrine   │
│  ✅ Communauté active      ✅ Enterprise │
│  ✅ Sanctum intégré        ⚠️ Config++   │
│                                         │
│  Choix : Laravel pour rapidité et       │
│  simplicité dans le cadre du projet     │
└─────────────────────────────────────────┘
```

### BONUS 3 : Code Exemple

```
┌─────────────────────────────────────────┐
│  EXTRAIT DE CODE                        │
│                                         │
│  // CommandePolicy.php                  │
│  public function create(User $user)     │
│  {                                      │
│      return $user->role !== 'visiteur';│
│  }                                      │
│                                         │
│  // CommandeController.php              │
│  public function store(Request $request)│
│  {                                      │
│      $this->authorize('create',         │
│                      Commande::class);  │
│      // ...                             │
│  }                                      │
│                                         │
│  Démontre : Contrôle d'accès granulaire │
└─────────────────────────────────────────┘
```

---

## Guide d'Utilisation

### Comment Créer les Slides dans PowerPoint

**1. Ouvrir PowerPoint**
- Nouveau document
- Thème : **Simple** ou **Ion** (modernes)

**2. Choisir la Palette de Couleurs**
- Conception → Couleurs → Personnaliser
- Primary : #2C5F2D (Vert)
- Accent : #F4A261 (Orange)

**3. Pour Chaque Slide**
- Suivre le plan ci-dessus
- Titre en haut (taille 36-44)
- Contenu au centre
- Pas trop de texte (règle des 6x6 : max 6 points, 6 mots par point)

**4. Insérer les Screenshots**
- Insertion → Images
- Redimensionner (ne pas déformer)
- Optionnel : ombre légère pour profondeur

**5. Transitions (Optionnel)**
- Transitions → Fondu ou Aucune
- Ne PAS utiliser d'animations complexes (distrayant)

**6. Notes du Présentateur**
- Affichage → Notes
- Copier les "Notes Présentateur" ci-dessus

---

## Conseils de Design

### ✅ À FAIRE

- **Cohérence** : Même mise en page pour slides similaires
- **Lisibilité** : Texte suffisamment gros (min 24pt)
- **Contraste** : Texte foncé sur fond clair ou inverse
- **Images** : Qualité HD, bien cadrées
- **Icônes** : Style uniforme (flat design)

### ❌ À ÉVITER

- **Surcharge** : Trop de texte par slide
- **Animations** : Effets flashy qui distraient
- **Polices** : Plus de 2 polices différentes
- **Couleurs** : Arc-en-ciel (max 3 couleurs)
- **Cliparts** : Images de mauvaise qualité

---

## Checklist Finale PowerPoint

### Avant la Soutenance
- [ ] 18 slides créés
- [ ] Screenshots insérés et de qualité
- [ ] Notes du présentateur remplies
- [ ] Orthographe vérifiée
- [ ] Transitions testées
- [ ] Durée : 20-25 minutes (chronométré)
- [ ] Export en PDF (backup)
- [ ] Fichier sur clé USB + cloud

### Format de Fichier
- [ ] .pptx (PowerPoint)
- [ ] .pdf (backup si problème de compatibilité)

### Test Final
- [ ] Présenter devant quelqu'un
- [ ] Vérifier que le diaporama fonctionne
- [ ] Tester sur l'ordinateur de présentation si possible

---

## 📝 Résumé

**18 slides structurés** pour une présentation professionnelle :

1-3 : Introduction & Contexte  
4-7 : Architecture & Technique  
8-12 : Fonctionnalités & Sécurité  
13-14 : Déploiement & Métriques  
15 : Démonstration Live  
16-18 : Bilan & Questions  

**Durée totale : 20-25 minutes**

**Avec ce plan, vous êtes prêt pour une présentation claire, structurée et professionnelle devant le jury !** 🎓

**Bonne chance ! 🍀**
