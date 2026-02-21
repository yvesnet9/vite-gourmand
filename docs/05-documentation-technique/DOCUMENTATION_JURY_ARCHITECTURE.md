# 🏗️ Architecture Technique

**Projet :** Vite & Gourmand  
**Auteur :** Yves Mukuna  
**Date :** Février 2025

---

## 1. Vue d'Ensemble de l'Architecture

### 🎯 Type d'Architecture

**Architecture 3-tiers découplée :**
- **Tier 1** : Frontend (React SPA)
- **Tier 2** : Backend API REST (Laravel)
- **Tier 3** : Base de données (PostgreSQL)

### 📐 Schéma Global

```
┌─────────────────────────────────────────────────────────┐
│                      UTILISATEURS                        │
│              (Navigateurs Web : Chrome, Firefox)         │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS
                        │ (Port 443)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    SERVEUR WEB                           │
│                    Nginx 1.18.0                          │
│   ┌────────────────────┬────────────────────────────┐   │
│   │   Frontend React   │     Backend Laravel        │   │
│   │   (Static Files)   │   (API REST + PHP-FPM)    │   │
│   │   /build/          │   /backend/public/        │   │
│   └────────────────────┴────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              BASE DE DONNÉES PostgreSQL                  │
│                   (Port 5432)                            │
│              vite_gourmand_prod                          │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Architecture Frontend (React)

### 🎨 Structure du Projet

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── layout/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   └── PrivateRoute.js
│   ├── contexts/            # Context API React
│   │   └── AuthContext.js
│   ├── pages/               # Pages/Vues de l'application
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── MenusListPage.js
│   │   ├── MenuDetailPage.js
│   │   ├── CommanderPage.js
│   │   ├── MesCommandesPage.js
│   │   ├── admin/
│   │   │   ├── MenusAdminPage.js
│   │   │   ├── PlatsAdminPage.js
│   │   │   └── AvisAdminPage.js
│   │   └── rgpd/
│   │       ├── PolitiqueConfidentialitePage.js
│   │       ├── MesDonneesPage.js
│   │       └── SupprimerComptePage.js
│   ├── services/            # Services API
│   │   ├── api.js           # Instance Axios configurée
│   │   ├── authService.js
│   │   ├── menuService.js
│   │   └── rgpdService.js
│   ├── App.js               # Composant racine + Routes
│   └── index.js             # Point d'entrée
├── package.json
└── .env.production          # Variables d'environnement
```

### 🔧 Technologies et Bibliothèques

**Core :**
- **React 18** : Framework UI
- **React Router v6** : Navigation SPA
- **Context API** : Gestion d'état global (authentification)

**HTTP & API :**
- **Axios** : Client HTTP avec intercepteurs

**Build & Dev :**
- **Create React App** : Configuration et build
- **npm** : Gestionnaire de paquets

### 🌐 Routing (Routes Principales)

```javascript
// Routes publiques
/ → HomePage
/login → LoginPage
/register → RegisterPage
/menus → MenusListPage
/menus/:id → MenuDetailPage
/politique-confidentialite → PolitiqueConfidentialitePage
/mentions-legales → MentionsLegalesPage

// Routes protégées (utilisateur connecté)
/commander/:menuId → CommanderPage
/mes-commandes → MesCommandesPage
/mes-commandes/:id → CommandeDetailPage
/mes-donnees → MesDonneesPage
/supprimer-compte → SupprimerComptePage

// Routes protégées (employé/admin)
/dashboard-employe → DashboardEmployePage
/admin/avis → AvisAdminPage

// Routes protégées (admin uniquement)
/admin/menus → MenusAdminPage
/admin/plats → PlatsAdminPage
/admin/allergenes → AllergenesAdminPage
```

### 🔐 Gestion de l'Authentification

**Flux d'authentification :**

1. **Connexion** :
   - User → LoginPage → authService.login()
   - API retourne {user, token}
   - Token stocké dans localStorage
   - User stocké dans AuthContext
   - Redirection vers page d'accueil

2. **Requêtes Authentifiées** :
   - Intercepteur Axios ajoute automatiquement `Authorization: Bearer {token}`
   - Si 401 → Déconnexion automatique

3. **Routes Protégées** :
   - Composant `<PrivateRoute>` vérifie AuthContext
   - Si non connecté → Redirection vers /login
   - Si rôle insuffisant → Redirection vers /

### 📡 Communication avec l'API

**Configuration Axios :**

```javascript
// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'https://vite-gourmand.fr/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur Request : Ajoute le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur Response : Gère les erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré → Déconnexion
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 3. Architecture Backend (Laravel)

### 🏗️ Structure du Projet

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php
│   │   │       ├── MenuController.php
│   │   │       ├── PlatController.php
│   │   │       ├── CommandeController.php
│   │   │       ├── AvisController.php
│   │   │       ├── AllergeneController.php
│   │   │       └── RgpdController.php
│   │   ├── Requests/             # FormRequests (validation)
│   │   │   ├── RegisterRequest.php
│   │   │   ├── LoginRequest.php
│   │   │   ├── StoreMenuRequest.php
│   │   │   ├── UpdateMenuRequest.php
│   │   │   └── ...
│   │   ├── Middleware/
│   │   │   └── SecurityHeaders.php
│   │   └── Kernel.php            # Configuration middleware
│   ├── Models/                   # Eloquent Models
│   │   ├── User.php
│   │   ├── Menu.php
│   │   ├── Plat.php
│   │   ├── Commande.php
│   │   ├── Avis.php
│   │   └── Allergene.php
│   ├── Policies/                 # Autorisations
│   │   ├── MenuPolicy.php
│   │   ├── PlatPolicy.php
│   │   ├── CommandePolicy.php
│   │   ├── AvisPolicy.php
│   │   └── AllergenePolicy.php
│   └── Providers/
│       ├── AuthServiceProvider.php
│       └── RouteServiceProvider.php
├── config/
│   ├── cors.php                  # Configuration CORS
│   ├── auth.php
│   └── sanctum.php
├── database/
│   ├── migrations/               # Schéma BDD
│   └── factories/                # Factories pour tests
├── routes/
│   └── api.php                   # Routes API
├── storage/
│   └── logs/                     # Logs Laravel
├── tests/
│   ├── Feature/                  # Tests d'intégration
│   └── Unit/                     # Tests unitaires
├── .env                          # Configuration production
└── composer.json                 # Dépendances PHP
```

### 🔧 Technologies et Packages

**Framework :**
- **Laravel 10** : Framework PHP
- **PHP 8.2** : Langage

**Base de Données :**
- **PostgreSQL 14** : SGBD relationnel
- **Eloquent ORM** : Mapping objet-relationnel

**Authentification :**
- **Laravel Sanctum** : Authentification API par tokens

**Validation & Sécurité :**
- **FormRequests** : Validation des entrées
- **Policies** : Contrôle d'accès
- **Middleware** : Rate limiting, CORS, headers sécurité

**Tests :**
- **PHPUnit** : Tests unitaires et d'intégration

### 🛣️ Routes API (Principales)

```php
// Routes publiques
GET    /api/menus                          # Liste menus actifs
GET    /api/menus/{id}                     # Détail menu
POST   /api/register                       # Inscription
POST   /api/login                          # Connexion
GET    /api/rgpd/politique-confidentialite # RGPD
GET    /api/rgpd/mentions-legales          # Mentions légales

// Routes authentifiées
POST   /api/logout                         # Déconnexion
GET    /api/me                             # User connecté

// Routes utilisateur
GET    /api/commandes                      # Mes commandes
POST   /api/commandes                      # Créer commande
GET    /api/commandes/{id}                 # Détail commande
PUT    /api/commandes/{id}/cancel          # Annuler commande
POST   /api/avis                           # Laisser avis
GET    /api/rgpd/export-data               # Export données
DELETE /api/rgpd/delete-account            # Supprimer compte

// Routes employé/admin
GET    /api/admin/commandes                # Toutes commandes
PUT    /api/admin/commandes/{id}           # Modifier commande
GET    /api/admin/avis/pending             # Avis en attente
PUT    /api/admin/avis/{id}/validate       # Valider avis
POST   /api/admin/menus                    # Créer menu
PUT    /api/admin/menus/{id}               # Modifier menu

// Routes admin uniquement
DELETE /api/admin/menus/{id}               # Supprimer menu
POST   /api/admin/plats                    # Créer plat
DELETE /api/admin/plats/{id}               # Supprimer plat
POST   /api/admin/allergenes               # Créer allergène
DELETE /api/admin/allergenes/{id}          # Supprimer allergène
```

### 🔐 Sécurité Backend

#### **1. Authentification (Sanctum)**

```php
// Génération token lors du login
$token = $user->createToken('auth-token')->plainTextToken;

// Vérification token sur routes protégées
Route::middleware('auth:sanctum')->group(function () {
    // Routes protégées
});

// Révocation token lors du logout
$request->user()->currentAccessToken()->delete();
```

#### **2. Validation (FormRequests)**

```php
// Exemple : RegisterRequest
public function rules()
{
    return [
        'nom' => ['required', 'string', 'max:100'],
        'email' => ['required', 'email', 'unique:users'],
        'password' => ['required', 'confirmed', Password::min(10)
            ->mixedCase()
            ->numbers()
            ->symbols()
        ],
        'consentement_rgpd' => ['required', 'accepted'],
    ];
}
```

#### **3. Autorisations (Policies)**

```php
// MenuPolicy
public function create(User $user)
{
    return in_array($user->role, ['administrateur', 'employe']);
}

public function delete(User $user, Menu $menu)
{
    return $user->role === 'administrateur';
}

// Utilisation dans controller
$this->authorize('delete', $menu);
```

#### **4. Rate Limiting**

```php
// RouteServiceProvider
RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});

RateLimiter::for('api', function (Request $request) {
    return $request->user()
        ? Limit::perMinute(60)->by($request->user()->id)
        : Limit::perMinute(60)->by($request->ip());
});

// Application sur routes
Route::middleware('throttle:login')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});
```

#### **5. Headers de Sécurité (Middleware)**

```php
// SecurityHeaders Middleware
$response->headers->set('X-Frame-Options', 'DENY');
$response->headers->set('X-Content-Type-Options', 'nosniff');
$response->headers->set('X-XSS-Protection', '1; mode=block');
$response->headers->set('Content-Security-Policy', "...");
$response->headers->set('Strict-Transport-Security', 'max-age=31536000');
```

#### **6. CORS**

```php
// config/cors.php
'allowed_origins' => [
    'https://vite-gourmand.fr',
    'https://www.vite-gourmand.fr',
],
'supports_credentials' => true,
```

---

## 4. Base de Données (PostgreSQL)

### 📊 Schéma de Données

**13 tables :**
1. users
2. menus
3. plats
4. allergenes
5. commandes
6. avis
7. contacts
8. menu_plat (table pivot)
9. plat_allergene (table pivot)
10. images_menu
11. horaires
12. suivi_commandes
13. personal_access_tokens (Sanctum)

### 🔗 Relations Principales

```
users (1) ─────< commandes (N)
users (1) ─────< avis (N)
menus (1) ─────< commandes (N)
commandes (1) ─< avis (1)
menus (N) >────< plats (N) via menu_plat
plats (N) >────< allergenes (N) via plat_allergene
```

### ⚡ Optimisations

**Index créés :**
- Primary keys sur tous les `id`
- Unique constraints : email (users), nom (allergenes)
- Foreign keys avec indexes automatiques
- Index sur colonnes filtrées : statut, dates

**Performances :**
- Eager loading avec Eloquent : `->with('relation')`
- Pagination sur listes : `->paginate(15)`
- Cache de configuration en production

---

## 5. Serveur & Déploiement

### 🖥️ Infrastructure

**Serveur :**
- **VPS OVH** : Ubuntu 22.04 LTS
- **IP** : 37.59.124.193
- **RAM** : Variable selon VPS
- **CPU** : Variable selon VPS

**Domaine :**
- **Principal** : vite-gourmand.fr
- **Alias** : www.vite-gourmand.fr
- **DNS** : Géré par OVH

### 🌐 Stack Serveur

**Serveur Web :**
- **Nginx 1.18.0**
  - Proxy inverse
  - Gestion HTTPS
  - Routage Frontend/Backend

**Backend Runtime :**
- **PHP 8.2**
- **PHP-FPM** : Traitement des requêtes PHP
- **Composer 2.2.6** : Gestionnaire dépendances PHP

**Base de Données :**
- **PostgreSQL 14** : SGBD
- **Port** : 5432 (localhost uniquement)

**SSL/TLS :**
- **Let's Encrypt** : Certificat gratuit
- **Certbot** : Renouvellement automatique
- **HTTPS** : Obligatoire (redirection automatique)

### 📁 Arborescence Production

```
/var/www/vite-gourmand/
├── backend/
│   ├── app/
│   ├── config/
│   ├── public/              # Point d'entrée API
│   │   └── index.php
│   ├── storage/
│   │   └── logs/
│   ├── vendor/              # Dépendances Composer
│   ├── .env                 # Configuration production
│   └── ...
├── frontend/
│   ├── build/               # Build React (static)
│   │   ├── index.html
│   │   ├── static/
│   │   │   ├── js/
│   │   │   └── css/
│   │   └── ...
│   ├── src/                 # Sources (non utilisées en prod)
│   └── ...
└── sql/                     # Scripts SQL (si nécessaire)
```

### 🔧 Configuration Nginx

```nginx
server {
    listen 443 ssl;
    server_name vite-gourmand.fr www.vite-gourmand.fr;

    # SSL
    ssl_certificate /etc/letsencrypt/live/vite-gourmand.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vite-gourmand.fr/privkey.pem;

    # Frontend React
    root /var/www/vite-gourmand/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API Laravel
    location /api/ {
        root /var/www/vite-gourmand/backend/public;
        rewrite ^/api/(.*)$ /index.php?/$1 last;
    }

    # PHP processing
    location ~ \.php$ {
        root /var/www/vite-gourmand/backend/public;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # Logs
    error_log /var/log/nginx/vite-gourmand-error.log;
    access_log /var/log/nginx/vite-gourmand-access.log;
}

# Redirection HTTP → HTTPS
server {
    listen 80;
    server_name vite-gourmand.fr www.vite-gourmand.fr;
    return 301 https://$host$request_uri;
}
```

### 🔄 Processus de Déploiement

**Déploiement initial :**

1. **Préparation serveur**
   ```bash
   apt install nginx php8.2-fpm php8.2-pgsql postgresql composer nodejs npm
   ```

2. **Clone repository**
   ```bash
   cd /var/www
   git clone https://github.com/yvesnet9/vite-gourmand.git
   ```

3. **Configuration Backend**
   ```bash
   cd backend
   composer install --no-dev --optimize-autoloader
   cp .env.example .env
   # Éditer .env avec configuration production
   php artisan key:generate
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   ```

4. **Build Frontend**
   ```bash
   cd ../frontend
   npm install
   echo "REACT_APP_API_URL=https://vite-gourmand.fr/api" > .env.production
   npm run build
   ```

5. **Configuration Nginx**
   ```bash
   nano /etc/nginx/sites-available/vite-gourmand
   ln -s /etc/nginx/sites-available/vite-gourmand /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

6. **Installation SSL**
   ```bash
   certbot --nginx -d vite-gourmand.fr -d www.vite-gourmand.fr
   ```

**Mise à jour :**

```bash
cd /var/www/vite-gourmand
git pull origin main
cd backend && composer install --no-dev
php artisan migrate --force
php artisan cache:clear && php artisan config:cache
cd ../frontend && npm run build
```

---

## 6. Flux de Données

### 📤 Exemple : Passer une Commande

```
┌─────────┐
│ Client  │
└────┬────┘
     │ 1. Clic sur "Commander"
     ▼
┌──────────────────┐
│ React Frontend   │
│ CommanderPage.js │
└────┬─────────────┘
     │ 2. Formulaire rempli
     │ 3. POST /api/commandes
     │    {menu_id, date_livraison, quantite, ...}
     ▼
┌─────────────────────────┐
│ Nginx (Proxy)           │
│ Port 443 (HTTPS)        │
└────┬────────────────────┘
     │ 4. Routage vers Backend
     │    /api/commandes → Laravel
     ▼
┌──────────────────────────────┐
│ Laravel Backend              │
│ CommandeController@store     │
├──────────────────────────────┤
│ 5. Middleware:               │
│    - auth:sanctum (vérif token)│
│    - throttle:api            │
└────┬─────────────────────────┘
     │ 6. FormRequest validation
     │    StoreCommandeRequest
     ▼
┌──────────────────────────────┐
│ Authorization (Policy)       │
│ CommandePolicy@create        │
└────┬─────────────────────────┘
     │ 7. Si autorisé
     ▼
┌──────────────────────────────┐
│ Business Logic               │
│ - Calcul prix total          │
│ - Création objet Commande    │
└────┬─────────────────────────┘
     │ 8. INSERT INTO commandes
     ▼
┌──────────────────────────────┐
│ PostgreSQL                   │
│ Table: commandes             │
└────┬─────────────────────────┘
     │ 9. Commande créée (ID retourné)
     ▼
┌──────────────────────────────┐
│ Laravel Backend              │
│ Response JSON                │
│ {id, menu, statut, prix...}  │
└────┬─────────────────────────┘
     │ 10. Response 201 Created
     ▼
┌──────────────────────────────┐
│ React Frontend               │
│ Affiche confirmation         │
│ Redirection /mes-commandes   │
└──────────────────────────────┘
```

---

## 7. Monitoring & Logs

### 📊 Logs Disponibles

**Backend (Laravel) :**
- **Application** : `/var/www/vite-gourmand/backend/storage/logs/laravel.log`
- **Erreurs PHP** : `/var/log/php8.2-fpm.log`

**Serveur Web :**
- **Nginx Access** : `/var/log/nginx/vite-gourmand-access.log`
- **Nginx Error** : `/var/log/nginx/vite-gourmand-error.log`

**Base de Données :**
- **PostgreSQL** : `/var/log/postgresql/postgresql-14-main.log`

### 🔍 Commandes Utiles

```bash
# Logs Laravel en temps réel
tail -f /var/www/vite-gourmand/backend/storage/logs/laravel.log

# Logs Nginx erreurs
tail -f /var/log/nginx/vite-gourmand-error.log

# Statistiques requêtes Nginx
tail -f /var/log/nginx/vite-gourmand-access.log

# Vérifier statut services
systemctl status nginx
systemctl status php8.2-fpm
systemctl status postgresql
```

---

## 8. Performance & Scalabilité

### ⚡ Optimisations Actuelles

**Frontend :**
- Build de production minifié (Webpack)
- Code splitting automatique (React lazy loading possible)
- Mise en cache navigateur (headers Nginx)

**Backend :**
- Autoloader Composer optimisé (`--optimize-autoloader`)
- Cache de configuration Laravel (`config:cache`, `route:cache`)
- OPcache PHP activé
- Requêtes Eloquent optimisées (eager loading, pagination)

**Base de Données :**
- Index sur colonnes critiques
- Requêtes préparées (protection SQL injection + performance)

**Serveur :**
- PHP-FPM (pool de workers)
- Nginx avec gzip activé
- HTTPS/2 activé

### 📈 Évolutions Possibles

**Pour charge élevée :**
- Cache Redis pour sessions et données
- CDN pour assets statiques
- Load balancer avec plusieurs serveurs
- Réplication PostgreSQL (master/slave)
- Queue Laravel pour traitements asynchrones

---

## 9. Sécurité - Résumé

### 🔒 Mesures Implémentées

**Niveau Transport :**
- ✅ HTTPS obligatoire (TLS 1.2+)
- ✅ HSTS activé
- ✅ Certificat Let's Encrypt (renouvellement auto)

**Niveau Application :**
- ✅ Authentification par tokens Sanctum
- ✅ Validation stricte des entrées (FormRequests)
- ✅ Contrôle d'accès (Policies)
- ✅ Rate limiting (5 login/min, 60 api/min)
- ✅ Protection CSRF
- ✅ Headers sécurité (CSP, X-Frame-Options, etc.)
- ✅ CORS configuré strictement

**Niveau Données :**
- ✅ Mots de passe hashés (bcrypt)
- ✅ Requêtes préparées (Eloquent)
- ✅ Validation données (min/max, types, enums)
- ✅ Tokens révocables

**RGPD :**
- ✅ Consentement obligatoire
- ✅ Export données personnelles
- ✅ Droit à l'oubli (suppression compte)
- ✅ Politique de confidentialité accessible

---

## 📝 Conclusion

Cette architecture 3-tiers découplée offre :

✅ **Séparation des responsabilités** : Frontend, Backend, BDD indépendants  
✅ **Scalabilité** : Possibilité d'ajouter serveurs/services  
✅ **Maintenabilité** : Code organisé, testé, documenté  
✅ **Sécurité** : Multiples couches de protection  
✅ **Performance** : Optimisations à chaque niveau  
✅ **Évolutivité** : Possibilité d'ajouter fonctionnalités facilement

**L'architecture est production-ready et déployée avec succès sur https://vite-gourmand.fr**
