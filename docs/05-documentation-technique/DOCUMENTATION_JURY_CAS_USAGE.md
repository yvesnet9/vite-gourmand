# 🎯 Cas d'Usage (Use Cases)

**Projet :** Vite & Gourmand  
**Auteur :** Yves Mukuna  
**Date :** Février 2025

---

## 1. Acteurs du Système

### 👤 Acteurs Principaux

**1. Visiteur (Non connecté)**
- Personne qui visite le site sans compte
- Peut consulter les informations publiques
- Peut s'inscrire pour devenir utilisateur

**2. Utilisateur (Client)**
- Personne inscrite et connectée
- Peut passer des commandes
- Peut consulter son historique
- Peut laisser des avis

**3. Employé**
- Personnel de l'entreprise
- Peut gérer les commandes
- Peut valider les avis
- Peut créer/modifier des menus

**4. Administrateur**
- Responsable de la plateforme
- Accès complet à toutes les fonctionnalités
- Peut gérer les utilisateurs
- Peut gérer les contenus (menus, plats, allergènes)

---

## 2. Cas d'Usage par Acteur

### 🌐 Visiteur (Non connecté)

#### CU-01 : Consulter les menus disponibles
**Objectif :** Voir la liste des menus proposés  
**Acteur principal :** Visiteur  
**Préconditions :** Aucune  
**Scénario nominal :**
1. Le visiteur accède à la page d'accueil
2. Le système affiche les menus actifs avec leurs détails
3. Le visiteur peut filtrer par thème ou régime
4. Le visiteur peut cliquer sur un menu pour voir les détails

**Scénario alternatif :**
- Si aucun menu n'est actif, le système affiche un message informatif

#### CU-02 : Consulter un menu détaillé
**Objectif :** Voir les informations complètes d'un menu  
**Acteur principal :** Visiteur  
**Préconditions :** Des menus sont disponibles  
**Scénario nominal :**
1. Le visiteur clique sur un menu
2. Le système affiche : titre, description, prix, plats inclus, allergènes
3. Le visiteur peut voir les avis clients validés

#### CU-03 : S'inscrire
**Objectif :** Créer un compte utilisateur  
**Acteur principal :** Visiteur  
**Préconditions :** Aucune  
**Scénario nominal :**
1. Le visiteur clique sur "S'inscrire"
2. Le système affiche le formulaire d'inscription
3. Le visiteur remplit : nom, prénom, email, mot de passe, téléphone, adresse
4. Le visiteur accepte la politique de confidentialité (RGPD)
5. Le système valide les données
6. Le système crée le compte et connecte l'utilisateur

**Scénarios alternatifs :**
- 5a. Email déjà utilisé → Message d'erreur
- 5b. Mot de passe trop faible → Message d'erreur avec règles
- 5c. RGPD non accepté → Impossible de s'inscrire

#### CU-04 : Consulter la politique de confidentialité
**Objectif :** Lire les informations RGPD  
**Acteur principal :** Visiteur  
**Préconditions :** Aucune  
**Scénario nominal :**
1. Le visiteur clique sur "Politique de confidentialité"
2. Le système affiche les informations RGPD

#### CU-05 : Consulter les mentions légales
**Objectif :** Voir les informations légales  
**Acteur principal :** Visiteur  
**Préconditions :** Aucune  
**Scénario nominal :**
1. Le visiteur clique sur "Mentions légales"
2. Le système affiche les informations légales

---

### 👤 Utilisateur (Client)

#### CU-06 : Se connecter
**Objectif :** Accéder à son compte  
**Acteur principal :** Utilisateur  
**Préconditions :** Avoir un compte actif  
**Scénario nominal :**
1. L'utilisateur clique sur "Connexion"
2. Le système affiche le formulaire de connexion
3. L'utilisateur saisit email et mot de passe
4. Le système vérifie les identifiants
5. Le système connecte l'utilisateur et génère un token

**Scénarios alternatifs :**
- 4a. Identifiants incorrects → Message d'erreur
- 4b. Compte désactivé → Message d'erreur
- Rate limiting : Max 5 tentatives/minute

#### CU-07 : Passer une commande
**Objectif :** Commander un menu pour un événement  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté, menu actif disponible  
**Scénario nominal :**
1. L'utilisateur sélectionne un menu
2. L'utilisateur clique sur "Commander"
3. Le système affiche le formulaire de commande
4. L'utilisateur saisit : date de livraison, adresse, quantité, instructions
5. Le système calcule le prix total
6. L'utilisateur confirme la commande
7. Le système enregistre la commande avec statut "en_attente"

**Scénarios alternatifs :**
- 4a. Date de livraison invalide (passée) → Message d'erreur
- 4b. Quantité < nb_personne_min → Message d'erreur

#### CU-08 : Consulter mes commandes
**Objectif :** Voir l'historique de ses commandes  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté  
**Scénario nominal :**
1. L'utilisateur clique sur "Mes Commandes"
2. Le système affiche la liste des commandes de l'utilisateur
3. L'utilisateur peut voir le statut de chaque commande

#### CU-09 : Consulter une commande détaillée
**Objectif :** Voir les détails d'une commande spécifique  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté, avoir des commandes  
**Scénario nominal :**
1. L'utilisateur clique sur une commande
2. Le système affiche : menu commandé, date, statut, prix, adresse

#### CU-10 : Annuler une commande
**Objectif :** Annuler une commande non validée  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté, commande en statut "en_attente"  
**Scénario nominal :**
1. L'utilisateur clique sur "Annuler" sur une commande
2. Le système demande confirmation
3. L'utilisateur confirme
4. Le système passe la commande en statut "annulée"

**Scénario alternatif :**
- 1a. Commande déjà validée/préparée → Annulation impossible

#### CU-11 : Laisser un avis
**Objectif :** Noter et commenter un menu après livraison  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté, commande livrée, pas d'avis existant  
**Scénario nominal :**
1. L'utilisateur clique sur "Laisser un avis" sur une commande livrée
2. Le système affiche le formulaire d'avis
3. L'utilisateur saisit : note (1-5), commentaire
4. L'utilisateur soumet l'avis
5. Le système enregistre l'avis avec statut "en_attente"

**Scénarios alternatifs :**
- 1a. Commande non livrée → Bouton désactivé
- 1b. Avis déjà laissé → Message informatif

#### CU-12 : Exporter mes données (RGPD)
**Objectif :** Télécharger toutes ses données personnelles  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté  
**Scénario nominal :**
1. L'utilisateur accède à "Mes Données"
2. L'utilisateur clique sur "Télécharger mes données"
3. Le système génère un fichier JSON avec toutes les données
4. Le système déclenche le téléchargement

#### CU-13 : Supprimer mon compte (RGPD)
**Objectif :** Supprimer définitivement son compte  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté  
**Scénario nominal :**
1. L'utilisateur accède à "Supprimer mon compte"
2. Le système affiche un avertissement et demande confirmation
3. L'utilisateur tape "SUPPRIMER" et saisit son mot de passe
4. Le système vérifie le mot de passe
5. Le système supprime le compte et toutes les données associées
6. Le système déconnecte l'utilisateur

**Scénario alternatif :**
- 4a. Mot de passe incorrect → Message d'erreur

#### CU-14 : Mettre à jour le consentement newsletter
**Objectif :** S'abonner ou se désabonner de la newsletter  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté  
**Scénario nominal :**
1. L'utilisateur accède à "Mes Données"
2. L'utilisateur coche/décoche la newsletter
3. Le système met à jour la préférence

#### CU-15 : Se déconnecter
**Objectif :** Fermer sa session  
**Acteur principal :** Utilisateur  
**Préconditions :** Être connecté  
**Scénario nominal :**
1. L'utilisateur clique sur "Déconnexion"
2. Le système révoque le token
3. Le système redirige vers la page d'accueil

---

### 👨‍💼 Employé

**L'employé hérite de tous les droits de l'utilisateur, plus :**

#### CU-16 : Voir toutes les commandes
**Objectif :** Consulter toutes les commandes clients  
**Acteur principal :** Employé  
**Préconditions :** Être connecté en tant qu'employé  
**Scénario nominal :**
1. L'employé accède au tableau de bord employé
2. Le système affiche toutes les commandes avec filtres
3. L'employé peut filtrer par statut, date

#### CU-17 : Mettre à jour le statut d'une commande
**Objectif :** Faire avancer une commande dans le workflow  
**Acteur principal :** Employé  
**Préconditions :** Être connecté en tant qu'employé  
**Scénario nominal :**
1. L'employé sélectionne une commande
2. L'employé change le statut (validée → en préparation → livrée)
3. Le système met à jour la commande

#### CU-18 : Consulter les avis en attente
**Objectif :** Voir les avis soumis par les clients  
**Acteur principal :** Employé  
**Préconditions :** Être connecté en tant qu'employé  
**Scénario nominal :**
1. L'employé accède à la gestion des avis
2. Le système affiche les avis en attente de validation

#### CU-19 : Valider un avis
**Objectif :** Publier un avis client  
**Acteur principal :** Employé  
**Préconditions :** Être connecté en tant qu'employé, avis en attente  
**Scénario nominal :**
1. L'employé lit un avis en attente
2. L'employé clique sur "Valider"
3. Le système passe l'avis en statut "validé"
4. L'avis devient visible publiquement

#### CU-20 : Rejeter un avis
**Objectif :** Refuser la publication d'un avis inapproprié  
**Acteur principal :** Employé  
**Préconditions :** Être connecté en tant qu'employé, avis en attente  
**Scénario nominal :**
1. L'employé lit un avis en attente
2. L'employé clique sur "Rejeter"
3. Le système passe l'avis en statut "rejeté"
4. L'avis n'est pas publié

#### CU-21 : Créer un menu
**Objectif :** Ajouter un nouveau menu à l'offre  
**Acteur principal :** Employé  
**Préconditions :** Être connecté en tant qu'employé  
**Scénario nominal :**
1. L'employé accède à la gestion des menus
2. L'employé clique sur "Créer un menu"
3. L'employé remplit : titre, description, thème, régime, prix, stock
4. L'employé sélectionne les plats du menu
5. Le système valide et enregistre le menu

#### CU-22 : Modifier un menu
**Objectif :** Mettre à jour un menu existant  
**Acteur principal :** Employé  
**Préconditions :** Être connecté en tant qu'employé  
**Scénario nominal :**
1. L'employé sélectionne un menu
2. L'employé modifie les informations
3. Le système valide et enregistre les modifications

---

### 🔧 Administrateur

**L'administrateur hérite de tous les droits de l'employé, plus :**

#### CU-23 : Supprimer un menu
**Objectif :** Retirer un menu de l'offre  
**Acteur principal :** Administrateur  
**Préconditions :** Être connecté en tant qu'admin  
**Scénario nominal :**
1. L'administrateur sélectionne un menu
2. L'administrateur clique sur "Supprimer"
3. Le système vérifie qu'il n'y a pas de commandes associées
4. Le système supprime le menu

**Scénario alternatif :**
- 3a. Commandes associées → Suppression refusée, proposer désactivation

#### CU-24 : Créer un plat
**Objectif :** Ajouter un nouveau plat au catalogue  
**Acteur principal :** Administrateur  
**Préconditions :** Être connecté en tant qu'admin  
**Scénario nominal :**
1. L'administrateur accède à la gestion des plats
2. L'administrateur clique sur "Créer un plat"
3. L'administrateur remplit : nom, description, type
4. L'administrateur associe les allergènes si nécessaire
5. Le système enregistre le plat

#### CU-25 : Modifier un plat
**Objectif :** Mettre à jour un plat existant  
**Acteur principal :** Administrateur  
**Préconditions :** Être connecté en tant qu'admin  
**Scénario nominal :**
1. L'administrateur sélectionne un plat
2. L'administrateur modifie les informations
3. Le système enregistre les modifications

#### CU-26 : Supprimer un plat
**Objectif :** Retirer un plat du catalogue  
**Acteur principal :** Administrateur  
**Préconditions :** Être connecté en tant qu'admin  
**Scénario nominal :**
1. L'administrateur sélectionne un plat
2. L'administrateur clique sur "Supprimer"
3. Le système supprime le plat et ses associations

#### CU-27 : Gérer les allergènes
**Objectif :** Créer, modifier ou supprimer des allergènes  
**Acteur principal :** Administrateur  
**Préconditions :** Être connecté en tant qu'admin  
**Scénario nominal :**
1. L'administrateur accède à la gestion des allergènes
2. L'administrateur peut créer/modifier/supprimer
3. Le système enregistre les modifications

#### CU-28 : Supprimer un avis
**Objectif :** Retirer un avis publié inapproprié  
**Acteur principal :** Administrateur  
**Préconditions :** Être connecté en tant qu'admin  
**Scénario nominal :**
1. L'administrateur sélectionne un avis
2. L'administrateur clique sur "Supprimer"
3. Le système supprime définitivement l'avis

#### CU-29 : Gérer les utilisateurs
**Objectif :** Activer/désactiver des comptes utilisateurs  
**Acteur principal :** Administrateur  
**Préconditions :** Être connecté en tant qu'admin  
**Scénario nominal :**
1. L'administrateur accède à la liste des utilisateurs
2. L'administrateur peut activer/désactiver un compte
3. Le système met à jour le statut de l'utilisateur

---

## 3. Diagramme de Cas d'Usage (Synthèse)

```
                    ┌──────────────┐
                    │   Visiteur   │
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────────┐
            │              │                  │
    [Consulter menus] [S'inscrire]  [Voir RGPD/ML]
            │
            │
    ┌───────▼────────┐
    │  Utilisateur   │
    └───────┬────────┘
            │
    ┌───────┼───────────────────────┐
    │       │                       │
[Commander] [Mes commandes]  [Laisser avis]
    │       │                       │
    │   [Annuler cmd]         [Export données]
    │                         [Supprimer compte]
    │
    │
┌───▼────────┐
│   Employé  │
└───┬────────┘
    │
    ├──[Voir toutes commandes]
    ├──[Modifier statut commande]
    ├──[Valider/Rejeter avis]
    └──[Créer/Modifier menu]
    │
    │
┌───▼──────────────┐
│ Administrateur   │
└───┬──────────────┘
    │
    ├──[Supprimer menu]
    ├──[Gérer plats]
    ├──[Gérer allergènes]
    ├──[Supprimer avis]
    └──[Gérer utilisateurs]
```

---

## 4. Flux Principaux

### Flux 1 : Parcours Client Complet

1. **Découverte** : Visiteur consulte les menus
2. **Inscription** : Création de compte + consentement RGPD
3. **Commande** : Sélection menu + formulaire commande
4. **Suivi** : Consultation statut dans "Mes Commandes"
5. **Livraison** : Commande passe en "livrée"
6. **Satisfaction** : Client laisse un avis
7. **Validation** : Employé valide l'avis → visible publiquement

### Flux 2 : Gestion Commande (Côté Employé)

1. **Réception** : Nouvelle commande (statut: en_attente)
2. **Validation** : Employé valide (statut: validée)
3. **Préparation** : Employé prépare (statut: en_preparation)
4. **Livraison** : Employé livre (statut: livree)
5. **Avis** : Client peut maintenant laisser un avis

### Flux 3 : Gestion Contenu (Côté Admin)

1. **Création Plats** : Admin crée plats avec allergènes
2. **Création Menu** : Employé/Admin compose menu avec plats
3. **Activation** : Menu devient visible publiquement
4. **Commandes** : Clients commandent le menu
5. **Mise à jour** : Employé/Admin peut modifier si nécessaire

---

## 5. Règles de Gestion par Cas d'Usage

### Inscription (CU-03)
- Email unique dans le système
- Mot de passe : min 10 caractères, majuscules, minuscules, chiffres, symboles
- Consentement RGPD obligatoire
- Rôle par défaut : "utilisateur"
- Compte actif par défaut

### Connexion (CU-06)
- Rate limiting : 5 tentatives max par minute
- Vérification compte actif
- Génération token Sanctum (durée illimitée jusqu'à déconnexion)

### Commander (CU-07)
- Menu doit être actif
- Date livraison > date du jour
- Quantité >= nb_personne_min du menu
- Prix total = prix_base × quantité
- Statut initial : "en_attente"

### Laisser un avis (CU-11)
- Commande doit être "livrée"
- Un seul avis par commande
- Note : 1 à 5 obligatoire
- Commentaire : 10 à 1000 caractères
- Statut initial : "en_attente" (modération)

### Supprimer compte (CU-13)
- Confirmation en 2 étapes (texte + mot de passe)
- Suppression définitive et irréversible
- Suppression en cascade : commandes, avis, tokens

---

## 6. Priorités des Cas d'Usage

### 🔴 Priorité HAUTE (MVP)
- CU-03 : S'inscrire
- CU-06 : Se connecter
- CU-01 : Consulter menus
- CU-07 : Passer commande
- CU-08 : Consulter mes commandes

### 🟡 Priorité MOYENNE
- CU-11 : Laisser un avis
- CU-16 : Voir toutes les commandes (employé)
- CU-17 : Mettre à jour statut commande
- CU-19/20 : Valider/Rejeter avis
- CU-21/22 : Créer/Modifier menu

### 🟢 Priorité BASSE
- CU-10 : Annuler commande
- CU-12 : Exporter données RGPD
- CU-13 : Supprimer compte
- CU-24-27 : Gestion plats/allergènes
- CU-29 : Gérer utilisateurs

---

## 📝 Conclusion

Le système propose **29 cas d'usage** couvrant :
- 5 cas pour les visiteurs
- 10 cas pour les utilisateurs
- 7 cas supplémentaires pour les employés
- 7 cas supplémentaires pour les administrateurs

Tous ces cas d'usage sont **implémentés et fonctionnels** dans l'application en production.
