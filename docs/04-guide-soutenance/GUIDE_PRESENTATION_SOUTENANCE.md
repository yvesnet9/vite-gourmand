# 🎤 GUIDE DE PRÉSENTATION - VITE & GOURMAND

**Durée totale** : 20-25 minutes
**Format** : Présentation PowerPoint (18 slides) + Démonstration live
**Session** : Juin-Juillet 2026
**Candidat** : Jamesy MUKUNA MUKENKETAYI

---

## 📊 STRUCTURE GÉNÉRALE

| Partie | Durée | Slides |
|--------|-------|--------|
| Introduction | 1 min | Slide 1 |
| Contexte & Analyse | 3 min | Slides 2-4 |
| Technique | 6 min | Slides 5-7 |
| Fonctionnalités | 4 min | Slides 8-9 |
| Sécurité & Qualité | 4 min | Slides 10-13 |
| Métriques & Démo | 4 min | Slides 14-15 |
| Bilan | 3 min | Slides 16-18 |
| Questions | 5 min | - |

---

## 🎯 CONSEILS GÉNÉRAUX

### Avant de Commencer
- ✅ Respirez profondément
- ✅ Souriez et établissez le contact visuel avec le jury
- ✅ Présentez-vous clairement
- ✅ Annoncez le plan

### Pendant la Présentation
- 🗣️ Parlez clairement et pas trop vite
- 👀 Regardez le jury, pas l'écran
- ⏱️ Surveillez le temps (20-25 min)
- 💡 Utilisez des exemples concrets
- 🎯 Montrez votre passion pour le projet

### Gestion du Stress
- ✅ Si vous perdez le fil : Respirez, regardez vos notes, reprenez
- ✅ Si une question vous bloque : "C'est une excellente question, je vais y réfléchir"
- ✅ N'ayez pas peur de dire "Je ne sais pas, mais je sais où chercher l'info"

---

## 📄 SCRIPT DÉTAILLÉ SLIDE PAR SLIDE

---

### SLIDE 1 - PAGE DE TITRE (30 secondes)

**CE QU'ON VOIT :**
- Titre : VITE & GOURMAND
- Sous-titre : Application Web de Traiteur Événementiel
- Vos informations
- URL : https://vite-gourmand.fr

**CE QUE VOUS DITES :**

> "Bonjour Madame, Monsieur les membres du jury. Je m'appelle Jamesy MUKUNA MUKENKETAYI, 
> je suis en formation Graduate Développeur Web Full Stack chez STUDI Paris.
> 
> Aujourd'hui, je vais vous présenter mon projet de fin de formation : **Vite & Gourmand**, 
> une application web complète pour un service de traiteur événementiel.
> 
> L'application est actuellement déployée en production et accessible à l'adresse 
> vite-gourmand.fr, que je vous montrerai en démonstration tout à l'heure.
> 
> Ma présentation durera environ 20 minutes et sera suivie d'une démonstration live. 
> Je reste bien sûr à votre disposition pour vos questions."

**TRANSITION :**
> "Commençons par le plan de ma présentation..."

---

### SLIDE 2 - SOMMAIRE (30 secondes)

**CE QU'ON VOIT :**
- 14 points du plan

**CE QUE VOUS DITES :**

> "Voici le déroulement de ma présentation.
> 
> Je vais d'abord vous présenter le **contexte** et les **objectifs** du projet,
> puis l'**analyse des besoins** avec les différents acteurs.
> 
> Ensuite, je détaillerai la **partie technique** : modélisation des données, 
> architecture, et les choix techniques que j'ai faits.
> 
> Je vous présenterai les **fonctionnalités développées**, les mesures de **sécurité**, 
> la conformité **RGPD**, et les **tests** mis en place.
> 
> Après avoir parlé du **déploiement** et des **métriques**, je vous ferai une 
> **démonstration en direct** de l'application.
> 
> Je terminerai par les **difficultés** rencontrées, les **perspectives d'évolution**, 
> et ma **conclusion**."

**TRANSITION :**
> "Commençons par le contexte du projet..."

---

### SLIDE 3 - CONTEXTE DU PROJET (1 min 30)

**CE QU'ON VOIT :**
- 🎯 Problématique
- 📋 Objectifs (5 points)
- ⏱️ Contraintes

**CE QUE VOUS DITES :**

> "**La problématique** était la suivante : un traiteur événementiel souhaitait 
> digitaliser son activité. Jusqu'à présent, les commandes se faisaient par téléphone 
> ou email, ce qui était chronophage et source d'erreurs.
> 
> **Les objectifs** étaient multiples :
> - Permettre aux clients de **commander en ligne** de manière autonome
> - **Faciliter la gestion** pour l'équipe avec un espace employé
> - Offrir une **interface d'administration** complète pour gérer les menus et les plats
> - Assurer la **conformité RGPD** avec export et suppression des données
> - **Déployer en production** avec un certificat SSL pour sécuriser les échanges
> 
> **Contraintes** : J'avais **12 jours** pour développer cette application, 
> du 6 au 18 février 2025. 
> 
> J'ai choisi une stack technique moderne avec **Laravel** pour le backend, 
> **React** pour le frontend, et **PostgreSQL** pour la base de données."

**TRANSITION :**
> "Pour répondre à ces besoins, j'ai d'abord identifié les différents acteurs..."

---

### SLIDE 4 - ANALYSE DES BESOINS (1 min 30)

**CE QU'ON VOIT :**
- 4 types d'acteurs avec leurs besoins

**CE QUE VOUS DITES :**

> "J'ai identifié **quatre types d'acteurs** avec des besoins différents :
> 
> **Les visiteurs** peuvent consulter le catalogue de menus avec des filtres par thème 
> et régime alimentaire, et s'inscrire en acceptant la politique RGPD.
> 
> **Les clients connectés** peuvent passer des commandes en ligne, suivre leurs commandes 
> avec 5 statuts différents, laisser des avis après livraison, et exercer leurs droits 
> RGPD : export de leurs données ou suppression de leur compte.
> 
> **Les employés** gèrent les commandes en modifiant les statuts, valident ou rejettent 
> les avis clients, et peuvent créer ou modifier des menus.
> 
> **Les administrateurs** ont un contrôle total : CRUD complet sur les menus, plats, 
> et allergènes, ainsi que la gestion des utilisateurs.
> 
> Cette analyse m'a permis de concevoir une application avec **trois niveaux d'accès** 
> bien distincts."

**TRANSITION :**
> "Pour structurer tout cela, j'ai modélisé les données avec un MCD..."

---

### SLIDE 5 - MODÈLE CONCEPTUEL DE DONNÉES (1 min 30)

**CE QU'ON VOIT :**
- 13 tables principales
- Relations clés
- Normalisation 3NF

**CE QUE VOUS DITES :**

> "La base de données comprend **13 tables principales**.
> 
> Les tables principales sont : **Users** pour les comptes, **Menus** et **Plats** 
> pour le catalogue, **Allergènes** pour gérer les restrictions alimentaires, 
> **Commandes** pour les achats, **Avis** pour les retours clients, et **Contacts** 
> pour les messages.
> 
> J'ai utilisé des **tables associatives** pour gérer les relations many-to-many :
> - **menu_plat** : un menu contient plusieurs plats, un plat peut être dans plusieurs menus
> - **plat_allergene** : un plat peut contenir plusieurs allergènes
> 
> **Les relations importantes** :
> - Un utilisateur peut avoir plusieurs commandes (relation 1-N)
> - Un utilisateur peut laisser plusieurs avis (relation 1-N)
> - Une commande peut avoir un avis (relation 1-0..1)
> 
> Le modèle respecte la **3ème forme normale** : pas de redondance, intégrité 
> référentielle assurée avec des foreign keys, et j'ai ajouté des **index** sur les 
> colonnes fréquemment utilisées pour optimiser les performances."

**TRANSITION :**
> "Cette base de données s'intègre dans une architecture 3-tiers..."

---

### SLIDE 6 - ARCHITECTURE TECHNIQUE (1 min 30)

**CE QU'ON VOIT :**
- Schéma 3-tiers en ASCII art
- Frontend → Backend → Base de données

**CE QUE VOUS DITES :**

> "J'ai opté pour une **architecture 3-tiers classique** mais robuste.
> 
> **La couche Présentation** utilise **React 18** avec une approche SPA (Single Page 
> Application). L'interface est entièrement responsive et s'adapte aux mobiles et tablettes.
> 
> **La couche Métier** est développée en **Laravel 10**. J'ai créé une API REST complète 
> avec **46 routes** pour gérer toutes les fonctionnalités. L'authentification est gérée 
> par **Laravel Sanctum** avec des tokens pour sécuriser les échanges.
> 
> **La couche Données** utilise **PostgreSQL 14**. J'ai choisi PostgreSQL pour sa 
> fiabilité et son respect strict de l'intégrité des données. Laravel communique avec 
> la base via **Eloquent ORM**, ce qui protège contre les injections SQL.
> 
> Les échanges entre le frontend et le backend se font en **HTTPS** avec des données 
> au format **JSON**. Toutes les requêtes passent par l'API REST, il n'y a aucun 
> accès direct à la base de données depuis le frontend."

**TRANSITION :**
> "Parlons maintenant des choix techniques que j'ai faits et pourquoi..."

---

### SLIDE 7 - JUSTIFICATION DES CHOIX TECHNIQUES (2 minutes)

**CE QU'ON VOIT :**
- React 18, Laravel 10, PostgreSQL 14, Nginx

**CE QUE VOUS DITES :**

> "Mes choix techniques ont été guidés par des critères de **performance**, 
> **sécurité**, et **maintenabilité**.
> 
> **Pourquoi React 18 ?**
> React permet de créer des **composants réutilisables**, ce qui rend le code plus 
> maintenable. Le **Virtual DOM** assure des performances optimales, même avec beaucoup 
> d'interactions. L'écosystème React est très riche avec React Router pour la navigation 
> et Axios pour les appels API. L'approche SPA offre une **expérience utilisateur fluide** 
> sans rechargement de page.
> 
> **Pourquoi Laravel 10 ?**
> Laravel est un framework PHP **robuste et mature**. **Eloquent ORM** simplifie les 
> requêtes et protège contre les injections SQL. Laravel intègre nativement la sécurité : 
> **Sanctum** pour l'authentification, protection CSRF, validation des données. 
> La documentation est excellente et la communauté très active.
> 
> **Pourquoi PostgreSQL 14 ?**
> PostgreSQL est un SGBD relationnel **très fiable**. Il respecte strictement 
> l'**intégrité référentielle** avec les foreign keys et les contraintes. Il gère 
> des types de données avancés et permet des contraintes CHECK complexes. C'est un 
> excellent choix pour une application qui manipule des données critiques comme 
> des commandes et des paiements.
> 
> **Pourquoi Nginx ?**
> Nginx est un serveur web **performant et léger**. Il sert de **proxy inverse** pour 
> diriger les requêtes vers l'API ou les fichiers statiques React. La configuration 
> SSL est simple et la consommation de ressources est faible."

**TRANSITION :**
> "Voyons maintenant les fonctionnalités concrètes que j'ai développées..."

---

### SLIDE 8 - FONCTIONNALITÉS CÔTÉ CLIENT (1 min 30)

**CE QU'ON VOIT :**
- 5 fonctionnalités principales avec emojis

**CE QUE VOUS DITES :**

> "Du côté client, j'ai développé **cinq fonctionnalités principales**.
> 
> **L'inscription et la connexion** sont sécurisées avec une validation stricte : 
> l'email doit être valide, le mot de passe doit faire au minimum 10 caractères avec 
> majuscules, chiffres et symboles. Il y a un **rate limiting** de 5 tentatives par 
> minute pour éviter les attaques par force brute.
> 
> **La consultation du catalogue** permet de filtrer les menus par **thème** 
> (bio, gastronomique, végétarien, etc.) et par **régime alimentaire** (normal, vegan, 
> sans gluten). Chaque menu affiche ses allergènes et sa note moyenne.
> 
> **Le passage de commande** est très simple : le client sélectionne un menu, choisit 
> la date de livraison, la quantité, et saisit son adresse. Le prix est calculé en 
> temps réel et le système vérifie automatiquement la disponibilité.
> 
> **Le suivi des commandes** se fait avec **5 statuts** : En attente, Validée, 
> En préparation, Livrée, ou Annulée. Le client peut annuler sa commande tant 
> qu'elle est en statut 'En attente'.
> 
> Enfin, il y a un **système d'avis** : après livraison, le client peut noter le menu 
> et laisser un commentaire. L'avis doit être validé par un employé avant d'être visible.
> 
> Et bien sûr, toute la **gestion RGPD** : export des données en JSON et suppression 
> du compte avec confirmation."

**TRANSITION :**
> "Côté administration, les employés et admins ont des outils puissants..."

---

### SLIDE 9 - FONCTIONNALITÉS ADMINISTRATION (1 min 30)

**CE QU'ON VOIT :**
- Espace Employé
- Espace Administrateur
- Contrôle d'accès

**CE QUE VOUS DITES :**

> "J'ai créé **deux espaces d'administration** avec des droits différents.
> 
> **L'espace Employé** permet de :
> - **Gérer les commandes** : l'employé peut changer le statut d'une commande 
>   (passer de 'En attente' à 'Validée', puis 'En préparation', et enfin 'Livrée')
> - **Valider ou rejeter les avis** : pour éviter les contenus inappropriés
> - **Créer et modifier des menus** : pour faire évoluer l'offre
> - Accéder à un **dashboard avec des statistiques** : nombre de commandes, 
>   avis en attente, etc.
> 
> **L'espace Administrateur** offre un contrôle total :
> - **CRUD complet** sur les menus, plats, et allergènes
> - **Gestion des utilisateurs** : activation ou désactivation des comptes
> - **Suppression définitive** des menus (avec vérification)
> - **Vue d'ensemble** de toutes les données de l'application
> 
> **Le contrôle d'accès** est géré par les **Laravel Policies**. À chaque action, 
> le système vérifie le rôle de l'utilisateur. Un middleware personnalisé vérifie 
> les permissions à chaque requête. Par exemple, seul un admin peut supprimer un menu, 
> un employé ne peut que le modifier."

**TRANSITION :**
> "Parlons maintenant d'un aspect crucial : la sécurité..."

---

### SLIDE 10 - MESURES DE SÉCURITÉ (1 min 30)

**CE QU'ON VOIT :**
- 4 catégories de sécurité avec emojis 🔒

**CE QUE VOUS DITES :**

> "La sécurité a été une priorité dès le début du projet.
> 
> **Pour l'authentification** :
> J'utilise **Laravel Sanctum** qui génère des tokens stateless. Les mots de passe 
> sont hashés avec **bcrypt** en 12 rounds, ce qui les rend pratiquement impossibles 
> à casser. La validation est stricte : minimum 10 caractères avec majuscules, 
> chiffres et symboles obligatoires.
> 
> **Pour la protection des données** :
> Tout le site fonctionne en **HTTPS** grâce à un certificat **Let's Encrypt**. 
> J'ai configuré des **headers HTTP sécurisés** : HSTS pour forcer HTTPS, 
> X-Frame-Options contre le clickjacking, et une Content Security Policy. 
> Le **CORS** est strict : seul le domaine vite-gourmand.fr est autorisé.
> 
> **Pour la validation** :
> Il y a une **double validation** : côté client pour l'UX et côté serveur pour 
> la sécurité. J'utilise les **FormRequests de Laravel** qui valident chaque donnée 
> entrante. Le **rate limiting** empêche les attaques : 5 tentatives de login par 
> minute maximum, et 60 requêtes API par minute.
> 
> **Contre les attaques courantes** :
> - **SQL Injection** : Eloquent ORM utilise des requêtes préparées
> - **XSS** : React et Laravel échappent automatiquement les données
> - **CSRF** : Protection Laravel activée sur toutes les routes sensibles"

**TRANSITION :**
> "Au-delà de la sécurité, il y a la conformité RGPD..."

---

### SLIDE 11 - CONFORMITÉ RGPD (1 minute)

**CE QU'ON VOIT :**
- 4 droits RGPD implémentés

**CE QUE VOUS DITES :**

> "J'ai implémenté une **conformité RGPD complète** avec les 4 droits fondamentaux.
> 
> **Droit à l'information** : Une politique de confidentialité est accessible à tous. 
> À l'inscription, l'utilisateur doit cocher une case pour accepter le traitement 
> de ses données. La date de consentement est enregistrée en base de données pour 
> la traçabilité.
> 
> **Droit d'accès et portabilité** : Dans son espace personnel, le client peut 
> **exporter toutes ses données** au format JSON : profil, commandes avec leurs détails, 
> et avis laissés. Il peut ainsi récupérer ses données pour les transférer ailleurs.
> 
> **Droit à l'oubli** : Le client peut **supprimer définitivement son compte**. 
> Une confirmation en 2 étapes est demandée pour éviter les suppressions accidentelles. 
> La suppression est en cascade : toutes les commandes et avis associés sont également 
> supprimés.
> 
> **Gestion du consentement** : L'inscription à la newsletter est en **opt-in** 
> modifiable à tout moment. Tous les consentements sont tracés avec leur date."

**TRANSITION :**
> "Pour garantir la qualité du code, j'ai mis en place des tests automatisés..."

---

### SLIDE 12 - TESTS AUTOMATISÉS (1 minute)

**CE QU'ON VOIT :**
- 15 tests PHPUnit
- 3 catégories de tests

**CE QUE VOUS DITES :**

> "J'ai développé **15 tests automatisés** avec PHPUnit pour valider les fonctionnalités 
> critiques.
> 
> **9 tests sur l'authentification** :
> - Inscription avec validation RGPD (vérification du consentement)
> - Connexion réussie avec des credentials valides
> - Connexion échouée avec des credentials invalides
> - Déconnexion et invalidation du token
> - Validation de la complexité du mot de passe
> 
> **3 tests sur le CRUD Menus** :
> - Récupération de la liste publique des menus actifs uniquement
> - Création d'un menu par un admin (succès)
> - Tentative de création par un client (échec, vérification des permissions)
> 
> **6 tests sur les fonctionnalités RGPD** :
> - Export des données utilisateur au format JSON
> - Suppression complète du compte
> - Vérification du consentement obligatoire à l'inscription
> - Accessibilité des pages légales (politique de confidentialité, mentions légales)
> 
> **Résultat** : Les **15 tests passent** à 100%. J'exécute ces tests avant chaque 
> déploiement pour m'assurer qu'aucune régression n'a été introduite."

**TRANSITION :**
> "Une fois le code validé, j'ai déployé l'application en production..."

---

### SLIDE 13 - DÉPLOIEMENT EN PRODUCTION (1 min 30)

**CE QU'ON VOIT :**
- Infrastructure, SSL/HTTPS, Stack serveur, Métriques

**CE QUE VOUS DITES :**

> "Le déploiement s'est fait sur un **VPS OVH** avec Ubuntu 22.04.
> 
> **L'infrastructure** :
> J'ai loué un serveur virtuel chez OVH et configuré le domaine **vite-gourmand.fr** 
> avec une IP dédiée : 37.59.124.193.
> 
> **SSL/HTTPS** :
> J'ai installé un certificat **Let's Encrypt** avec **certbot**. Le renouvellement 
> est automatique tous les 90 jours. J'ai configuré une redirection 301 : toutes 
> les requêtes HTTP sont automatiquement redirigées vers HTTPS. C'est essentiel 
> pour protéger les données sensibles comme les mots de passe.
> 
> **Stack serveur** :
> - **Nginx 1.18** comme serveur web et proxy inverse
> - **PHP 8.2 avec PHP-FPM** pour exécuter Laravel
> - **PostgreSQL 14** pour la base de données
> - **Node.js v18** pour compiler le build production de React
> 
> J'ai mis en place le **reverse proxy** : Nginx écoute sur le port 443 (HTTPS), 
> redirige les requêtes `/api/*` vers Laravel (PHP-FPM sur le port 9000), et sert 
> les fichiers statiques React directement.
> 
> **Mise en production** :
> Le déploiement a eu lieu le **18 février 2025**. Le temps de réponse de l'API 
> est inférieur à 200ms en moyenne. La disponibilité est de 99.9% depuis le lancement."

**TRANSITION :**
> "Regardons maintenant les métriques du projet..."

---

### SLIDE 14 - MÉTRIQUES DU PROJET (1 minute)

**CE QU'ON VOIT :**
- Métriques quantitatives et qualitatives
- Validation des 3 CCP

**CE QUE VOUS DITES :**

> "Voici les **métriques quantitatives** du projet :
> 
> - **Durée** : 12 jours de développement intensif, du 6 au 18 février 2025
> - **Code** : Environ 8000 lignes de code (backend + frontend)
> - **Base de données** : 13 tables avec des relations complexes
> - **API** : 46 routes pour couvrir toutes les fonctionnalités
> - **Tests** : 15 tests automatisés
> - **Frontend** : Plus de 15 pages et composants React
> 
> **Métriques qualitatives** :
> - L'application est **100% fonctionnelle** en production
> - Le code est **organisé et maintenable** avec une architecture claire
> - La documentation technique est **complète**
> - **Sécurité et RGPD** sont respectés
> - Les tests couvrent les **fonctionnalités critiques**
> - Le déploiement est **réussi avec SSL**
> 
> Ce projet valide les **3 CCP du titre DWWM** :
> - **CCP1 : Développer la partie frontend** (validé avec React)
> - **CCP2 : Développer la partie backend** (validé avec Laravel et PostgreSQL)
> - **CCP3 : Déployer et sécuriser** (validé avec VPS, Nginx, SSL)"

**TRANSITION :**
> "Je vais maintenant vous montrer l'application en direct..."

---

### SLIDE 15 - DÉMONSTRATION EN DIRECT (2-3 minutes)

**CE QU'ON VOIT :**
- Scénario de démonstration en 4 étapes

**CE QUE VOUS DITES :**

> "Je vais vous faire une **démonstration live** en suivant 4 parcours utilisateurs.
> 
> **[Ouvrez https://vite-gourmand.fr dans le navigateur]**
> 
> **1. Page d'accueil et navigation**
> Voici la page d'accueil. On voit le catalogue des menus avec les filtres par 
> thème et régime. Chaque menu affiche son prix, ses allergènes, et sa note moyenne.
> 
> **2. Parcours Client**
> Je me connecte avec le compte client : client@demo.fr / Password123!
> **[Connectez-vous]**
> 
> Je vais passer une commande. Je sélectionne ce menu bio, je choisis une date, 
> la quantité, j'entre une adresse de livraison.
> **[Passez la commande]**
> 
> Maintenant, dans 'Mes Commandes', je peux voir le statut de ma commande.
> **[Montrez 'Mes Commandes']**
> 
> Et voici la fonctionnalité RGPD : je peux exporter toutes mes données en JSON.
> **[Cliquez sur 'Exporter mes données']**
> 
> **3. Parcours Employé**
> Je me déconnecte et me connecte en tant qu'employé : employe@demo.fr / Password123!
> **[Connectez-vous en employé]**
> 
> Dans le dashboard employé, je vois les commandes en attente. Je peux changer 
> le statut de cette commande de 'En attente' à 'Validée'.
> **[Changez un statut de commande]**
> 
> Je peux aussi valider un avis client en attente de modération.
> **[Validez un avis si disponible]**
> 
> **4. Parcours Admin**
> Enfin, en tant qu'admin : admin@demo.fr / Password123!
> **[Connectez-vous en admin]**
> 
> Je peux créer un nouveau menu, gérer les plats, les allergènes, et voir tous 
> les utilisateurs de l'application."
> **[Montrez rapidement le CRUD admin]**

**TRANSITION :**
> "Revenons à la présentation pour parler des difficultés rencontrées..."
> **[Retournez au PowerPoint]**

---

### SLIDE 16 - DIFFICULTÉS RENCONTRÉES & SOLUTIONS (1 min 30)

**CE QU'ON VOIT :**
- 4 difficultés avec leurs solutions

**CE QUE VOUS DITES :**

> "Comme dans tout projet, j'ai rencontré plusieurs **difficultés techniques** 
> que j'ai dû résoudre.
> 
> **Problème 1 : Accès SSH au VPS**
> Après avoir réinitialisé le mot de passe root, je n'arrivais plus à me connecter 
> en SSH. J'ai dû utiliser le **mode rescue** d'OVH, monter la partition, faire 
> un **chroot**, et recréer l'utilisateur avec la commande `passwd`. Cela m'a appris 
> à gérer un serveur Linux en mode secours, une compétence précieuse.
> 
> **Problème 2 : Configuration API Frontend**
> En production, React appelait encore l'API sur localhost au lieu de l'URL de 
> production. J'ai résolu cela en créant un fichier `.env.production` avec les 
> bonnes variables d'environnement. J'ai appris l'importance de bien gérer les 
> différents environnements (dev, test, prod).
> 
> **Problème 3 : Routing Nginx**
> Les routes de l'API retournaient toutes des erreurs 404. Le problème venait 
> de la configuration Nginx qui n'était pas configurée pour Laravel. J'ai ajouté 
> une règle de **rewrite** pour rediriger toutes les requêtes vers `index.php`. 
> Cela m'a fait comprendre comment fonctionne l'interaction Nginx-PHP-FPM.
> 
> **Problème 4 : Dépendances Composer**
> En production, Composer bloquait à cause d'une extension MongoDB manquante, alors 
> que je ne l'utilisais pas. J'ai utilisé le flag `--ignore-platform-req` pour forcer 
> l'installation. J'ai appris à mieux gérer les dépendances PHP en production."

**TRANSITION :**
> "Malgré ces difficultés, le projet est complet. Voyons les perspectives d'évolution..."

---

### SLIDE 17 - PERSPECTIVES D'ÉVOLUTION (1 minute)

**CE QU'ON VOIT :**
- Évolutions fonctionnelles
- Améliorations techniques
- Scalabilité

**CE QUE VOUS DITES :**

> "Si je devais faire évoluer cette application, voici les **améliorations** que 
> je prioriserais.
> 
> **Évolutions fonctionnelles** :
> - Intégrer le **paiement en ligne** avec l'API Stripe pour permettre le paiement 
>   par carte bancaire
> - Ajouter des **notifications email** pour informer les clients des changements 
>   de statut de leurs commandes
> - Développer une **application mobile** avec React Native pour toucher plus d'utilisateurs
> - Créer un **dashboard statistiques** avec des graphiques pour visualiser le 
>   chiffre d'affaires, les menus les plus vendus, etc.
> - Ajouter le **multi-langue** avec i18n pour internationaliser l'application
> 
> **Améliorations techniques** :
> - Mettre en place un **cache Redis** pour stocker les sessions et les données 
>   fréquemment accédées
> - Implémenter un **monitoring avancé** avec logs centralisés et alertes
> - Automatiser le déploiement avec **CI/CD** et GitHub Actions
> - Ajouter des **tests E2E** avec Cypress pour tester les parcours utilisateurs
> - Intégrer **Elasticsearch** pour une recherche avancée dans les menus
> 
> **Scalabilité** :
> Si l'application connaît un fort trafic, je mettrais en place du **load balancing** 
> avec plusieurs serveurs, un **CDN** pour les assets statiques, et une **optimisation 
> de la base** avec du partitioning."

**TRANSITION :**
> "Pour conclure cette présentation..."

---

### SLIDE 18 - CONCLUSION (1 min 30)

**CE QU'ON VOIT :**
- Objectifs atteints
- Compétences acquises
- Validation 3 CCP
- Merci + Questions

**CE QUE VOUS DITES :**

> "Pour **conclure**, je dirais que tous les objectifs ont été atteints.
> 
> **Objectifs atteints** :
> L'application est **complète et fonctionnelle** en production. J'ai utilisé une 
> **stack technique moderne** : Laravel 10, React 18, PostgreSQL 14. La **sécurité** 
> et la conformité **RGPD** sont respectées. Le site est déployé avec **HTTPS** sur 
> vite-gourmand.fr. Et j'ai une **documentation complète** avec des tests automatisés.
> 
> **Compétences acquises** :
> Ce projet m'a permis de développer des compétences **full-stack** : frontend avec 
> React et backend avec Laravel. J'ai acquis des compétences en **DevOps** : déploiement 
> sur VPS, configuration Nginx, gestion SSL. J'ai renforcé mes connaissances en 
> **sécurité** : authentification, validation, HTTPS. J'ai appris à implémenter la 
> **conformité RGPD** avec export et suppression des données. Et j'ai adopté une 
> **méthodologie rigoureuse** : versionning Git, tests, documentation.
> 
> Ce projet **valide les 3 CCP** du titre Développeur Web et Web Mobile :
> - CCP1 ✅ Développer la partie frontend
> - CCP2 ✅ Développer la partie backend
> - CCP3 ✅ Déployer et sécuriser l'application
> 
> **[Sourire, regarder le jury]**
> 
> Je vous remercie de votre attention et je suis maintenant à votre disposition 
> pour répondre à vos questions."

**IMPORTANT** : Restez debout, regardez le jury, et attendez leurs questions avec 
le sourire. Si pas de questions immédiatement, restez calme et patient.

---

## ❓ GESTION DES QUESTIONS DU JURY

### Questions Techniques Probables

**Q1 : "Pourquoi avoir choisi Laravel plutôt que Node.js ?"**

> "Excellente question. J'ai choisi Laravel pour plusieurs raisons :
> - Eloquent ORM protège contre les injections SQL
> - Laravel Sanctum simplifie l'authentification API
> - Le système de validation et les Policies sont très robustes
> - Je voulais démontrer ma polyvalence : Node.js + PHP
> 
> Si le projet avait nécessité du temps réel (websockets), j'aurais plutôt opté 
> pour Node.js avec Socket.io."

**Q2 : "Comment gérez-vous la scalabilité ?"**

> "Actuellement, l'application est sur un seul serveur, ce qui convient pour un 
> traiteur local. Pour scaler :
> - Load balancer avec plusieurs instances backend
> - Cache Redis pour les sessions et données fréquentes
> - CDN pour les assets statiques
> - Database replication (master-slave PostgreSQL)
> - File d'attente (Redis Queue) pour les tâches asynchrones"

**Q3 : "Pourquoi PostgreSQL et pas MySQL ?"**

> "PostgreSQL respecte plus strictement les normes SQL et l'intégrité référentielle. 
> Les contraintes CHECK sont plus puissantes. Pour une application gérant des 
> transactions financières (commandes), PostgreSQL est plus adapté. MySQL est 
> excellent pour les sites à fort trafic lecture, mais ici j'avais besoin de 
> garanties ACID fortes."

**Q4 : "Comment testez-vous le frontend ?"**

> "Actuellement, les tests sont côté backend avec PHPUnit. Pour le frontend, 
> je prévois d'ajouter :
> - Jest pour les tests unitaires de composants React
> - React Testing Library pour les tests d'intégration
> - Cypress pour les tests E2E des parcours utilisateurs"

**Q5 : "Comment gérez-vous les erreurs en production ?"**

> "Plusieurs niveaux :
> - Laravel log les erreurs dans /storage/logs
> - Nginx log aussi dans /var/log/nginx
> - Je prévois d'intégrer Sentry pour un monitoring en temps réel
> - Les erreurs API retournent des codes HTTP appropriés (400, 401, 403, 500)
> - Messages d'erreur côté client pour guider l'utilisateur"

---

### Questions RGPD Probables

**Q6 : "L'export de données est-il vraiment complet ?"**

> "Oui, l'export JSON contient :
> - Profil utilisateur (nom, email, téléphone, adresse)
> - Toutes les commandes avec leurs détails
> - Tous les avis laissés
> 
> Cela respecte le droit à la portabilité du RGPD. Le client peut récupérer 
> ses données pour les transférer ailleurs."

**Q7 : "Que devient une commande si le client supprime son compte ?"**

> "J'ai implémenté une suppression en cascade. Quand un compte est supprimé :
> - L'utilisateur est supprimé
> - Toutes ses commandes sont supprimées
> - Tous ses avis sont supprimés
> 
> C'est géré automatiquement par les foreign keys ON DELETE CASCADE dans PostgreSQL."

---

### Questions Sécurité Probables

**Q8 : "Comment empêchez-vous les injections SQL ?"**

> "Trois niveaux de protection :
> - Eloquent ORM utilise des requêtes préparées (prepared statements)
> - Je n'utilise JAMAIS de requêtes SQL brutes avec des données utilisateur
> - Si vraiment nécessaire, j'utilise les bindings Laravel : DB::select('...', [$param])"

**Q9 : "Le rate limiting est-il suffisant ?"**

> "Pour ce projet, oui. 5 tentatives de login par minute empêche le brute force. 
> 60 requêtes API par minute permet une utilisation normale. Pour améliorer, 
> je pourrais :
> - Implémenter un CAPTCHA après 3 échecs
> - Bloquer l'IP après 10 échecs en 1 heure
> - Utiliser un WAF (Web Application Firewall)"

---

### Questions Déploiement Probables

**Q10 : "Comment faites-vous les mises à jour ?"**

> "Actuellement, manuellement :
> 1. git pull sur le serveur
> 2. composer install --no-dev
> 3. npm run build
> 4. php artisan migrate
> 5. php artisan optimize
> 
> Idéalement, j'automatiserais avec GitHub Actions :
> - Tests automatiques sur chaque push
> - Déploiement automatique si tests OK
> - Zero-downtime deployment"

**Q11 : "Avez-vous un plan de sauvegarde ?"**

> "Oui, j'ai mis en place un script de sauvegarde quotidien :
> - Backup PostgreSQL avec pg_dump à 2h du matin
> - Rétention de 7 jours
> - Stockage local + copie sur un autre serveur (futur)
> 
> En cas de problème, je peux restaurer en quelques minutes avec pg_restore."

---

### Si Vous Ne Savez Pas Répondre

**Restez honnête et professionnel :**

> "C'est une excellente question. Je n'ai pas implémenté cette fonctionnalité 
> dans ce projet, mais voici comment je procéderais : [proposez une solution].
> 
> Si vous me donnez quelques secondes pour réfléchir... [prenez le temps]."

**OU**

> "Je ne sais pas précisément, mais je sais où trouver l'information : 
> la documentation Laravel / React / PostgreSQL. C'est une compétence que 
> je développerai si le projet évolue dans cette direction."

---

## ⏱️ TIMING FINAL

| Partie | Temps | Cumul |
|--------|-------|-------|
| Slides 1-2 | 1 min | 1 min |
| Slides 3-4 | 3 min | 4 min |
| Slides 5-7 | 5 min | 9 min |
| Slides 8-9 | 3 min | 12 min |
| Slides 10-13 | 5 min | 17 min |
| Slides 14 | 1 min | 18 min |
| Slide 15 (Démo) | 3 min | 21 min |
| Slides 16-18 | 4 min | 25 min |

**TOTAL : 25 minutes**

---

## ✅ CHECKLIST AVANT LA SOUTENANCE

**Matériel**
- [ ] Ordinateur chargé à 100%
- [ ] Chargeur dans le sac
- [ ] PowerPoint sur l'ordinateur
- [ ] PowerPoint sur clé USB (backup)
- [ ] Application testée ce matin
- [ ] Connexion internet vérifiée

**Documents**
- [ ] Dossier Projet imprimé x2 (reliure)
- [ ] Fiche comptes démo imprimée
- [ ] Carte d'identité
- [ ] Convocation

**Préparation**
- [ ] Présentation répétée 2-3 fois
- [ ] Timing vérifié (20-25 min)
- [ ] Démo testée avec les 3 comptes
- [ ] Vêtements professionnels préparés

**Mental**
- [ ] Bonne nuit de sommeil
- [ ] Petit-déjeuner équilibré
- [ ] Arrivée 15 min en avance
- [ ] Respiration profonde avant d'entrer

---

## 🎯 DERNIERS CONSEILS

### Pendant la Présentation
- 🗣️ Parlez fort et clairement
- 👀 Regardez le jury, pas l'écran
- 😊 Souriez, montrez votre passion
- ⏱️ Surveillez le temps
- 🎯 Si vous perdez le fil, respirez et regardez vos notes

### Pendant la Démo
- 🖱️ Préparez les onglets à l'avance
- 🔐 Ayez les logins sous les yeux
- ⚡ Si un bug apparaît, restez calme : "Cela fonctionne habituellement, voici un screenshot"
- 💬 Commentez ce que vous faites

### Pendant les Questions
- 👂 Écoutez bien la question complète
- 🤔 Prenez 2-3 secondes pour réfléchir
- 💡 Répondez clairement et concisément
- 🤝 Si vous ne savez pas, soyez honnête

---

## 🎓 VOUS ÊTES PRÊT !

Vous avez :
- ✅ Une application complète en production
- ✅ Une présentation de qualité
- ✅ Les compétences techniques
- ✅ Ce guide détaillé

**Faites-vous confiance. Vous allez réussir ! 💪**

---

**Bonne chance pour votre soutenance !**

**Jamesy MUKUNA MUKENKETAYI - Session Juin-Juillet 2026**
