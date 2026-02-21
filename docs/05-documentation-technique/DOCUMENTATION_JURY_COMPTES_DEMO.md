# 🔐 Comptes de Démonstration

**Projet :** Vite & Gourmand  
**Auteur :** Yves Mukuna  
**Date :** Février 2025  
**URL Production :** https://vite-gourmand.fr

---

## 📋 Credentials des Comptes de Démo

### 👤 1. Compte CLIENT (Utilisateur Normal)

**Identifiants :**
```
Email : client@demo.fr
Mot de passe : Password123!
```

**Rôle :** Utilisateur  
**Statut :** Actif  

**Permissions :**
- ✅ Consulter les menus disponibles
- ✅ Passer des commandes
- ✅ Voir l'historique de ses commandes
- ✅ Annuler une commande (si en attente)
- ✅ Laisser des avis (après livraison)
- ✅ Exporter ses données personnelles (RGPD)
- ✅ Supprimer son compte (RGPD)
- ✅ Gérer le consentement newsletter
- ❌ Accès aux fonctionnalités employé/admin

**Utilisation pour la démo :**
- Montrer le parcours client complet
- Démontrer le processus de commande
- Illustrer les fonctionnalités RGPD

---

### 👨‍💼 2. Compte EMPLOYÉ

**Identifiants :**
```
Email : employe@demo.fr
Mot de passe : Password123!
```

**Rôle :** Employé  
**Statut :** Actif  

**Permissions :**
- ✅ Toutes les permissions du client +
- ✅ Voir toutes les commandes (tous clients)
- ✅ Modifier le statut des commandes :
  - En attente → Validée
  - Validée → En préparation
  - En préparation → Livrée
- ✅ Consulter les avis en attente de validation
- ✅ Valider les avis clients (publication)
- ✅ Rejeter les avis inappropriés
- ✅ Créer de nouveaux menus
- ✅ Modifier les menus existants
- ❌ Supprimer des menus
- ❌ Gérer les plats/allergènes
- ❌ Gérer les utilisateurs

**Utilisation pour la démo :**
- Montrer le dashboard employé
- Démontrer la gestion des commandes
- Illustrer la modération des avis
- Montrer la création/modification de menus

---

### 🔧 3. Compte ADMINISTRATEUR

**Identifiants :**
```
Email : admin@demo.fr
Mot de passe : Password123!
```

**Rôle :** Administrateur  
**Statut :** Actif  

**Permissions :**
- ✅ Toutes les permissions de l'employé +
- ✅ Supprimer des menus
- ✅ Créer de nouveaux plats
- ✅ Modifier les plats existants
- ✅ Supprimer des plats
- ✅ Créer des allergènes
- ✅ Modifier les allergènes
- ✅ Supprimer des allergènes
- ✅ Gérer les utilisateurs :
  - Activer/désactiver des comptes
  - Changer les rôles (avec prudence)
- ✅ Supprimer définitivement des avis
- ✅ Accès complet à toutes les fonctionnalités

**Utilisation pour la démo :**
- Montrer le dashboard administrateur complet
- Démontrer la gestion complète des menus
- Illustrer la gestion des plats et allergènes
- Montrer les fonctionnalités de gestion des utilisateurs

---

## 🎯 Scénario de Démonstration Recommandé

### Partie 1 : Visiteur & Client (5 min)

1. **Page d'accueil** (non connecté)
   - Montrer l'interface publique
   - Navigation dans les menus

2. **Connexion Client**
   - Se connecter avec `client@demo.fr`
   - Montrer "Bonjour Client" dans la navbar

3. **Passer une commande**
   - Sélectionner un menu
   - Remplir le formulaire de commande
   - Confirmer (montrer le calcul du prix)

4. **Mes Commandes**
   - Voir la commande qui vient d'être passée (statut : en attente)

5. **RGPD** (optionnel)
   - Aller sur "Mes Données"
   - Montrer le bouton "Exporter mes données"
   - **NE PAS supprimer le compte pendant la démo**

### Partie 2 : Employé (3 min)

1. **Déconnexion**
   - Se déconnecter du compte client

2. **Connexion Employé**
   - Se connecter avec `employe@demo.fr`

3. **Dashboard Employé**
   - Montrer la liste de toutes les commandes
   - Filtrer par statut

4. **Gestion d'une commande**
   - Sélectionner la commande passée par le client
   - Changer le statut : En attente → Validée
   - Montrer que le statut est mis à jour

5. **Gestion des avis** (si avis en attente)
   - Montrer les avis en attente
   - Valider ou rejeter un avis

### Partie 3 : Administrateur (2 min)

1. **Déconnexion**
   - Se déconnecter du compte employé

2. **Connexion Admin**
   - Se connecter avec `admin@demo.fr`

3. **Dashboard Admin**
   - Montrer l'interface complète

4. **Gestion des Menus**
   - Aller dans "Gestion des Menus"
   - Montrer la liste des menus
   - Cliquer sur "Créer un menu" (montrer le formulaire)
   - **NE PAS créer réellement pour gagner du temps**

5. **Gestion des Plats** (optionnel)
   - Montrer brièvement l'interface de gestion des plats

---

## ⚠️ IMPORTANT : Notes pour le Jour J

### Avant la Présentation

**Vérifiez que :**
- [ ] Les 3 comptes fonctionnent (testez la connexion)
- [ ] Il y a au moins 1-2 menus actifs sur le site
- [ ] Le compte client n'a pas trop de commandes (pour une démo claire)
- [ ] Le compte admin a bien le rôle "administrateur" (pas "employe")

### Pendant la Démonstration

**À FAIRE :**
- ✅ Avoir ces credentials sous les yeux (sur papier)
- ✅ Narrer chaque action ("Je me connecte en tant que client...")
- ✅ Montrer les validations (formulaires, messages de succès)
- ✅ Gérer le temps (max 10 min pour toute la démo)

**À ÉVITER :**
- ❌ Supprimer des données pendant la démo (menus, comptes)
- ❌ Passer trop de temps sur une seule fonctionnalité
- ❌ Oublier de se déconnecter entre les rôles
- ❌ Créer réellement des menus/plats (juste montrer l'interface)

### En Cas de Problème

**Si la connexion échoue :**
- Vérifier que vous utilisez bien `Password123!` (avec majuscule et !)
- Vérifier que vous êtes sur https://vite-gourmand.fr/login
- Rafraîchir la page et réessayer

**Si le site est lent/inaccessible :**
- Avoir une **vidéo de démo** en backup (à enregistrer avant)
- Ou des **screenshots** de chaque étape

**Si vous oubliez un mot de passe :**
- Avoir cette fiche imprimée avec vous !

---

## 📱 Aide-Mémoire (à imprimer)

```
┌─────────────────────────────────────────┐
│   COMPTES DÉMO - VITE & GOURMAND       │
├─────────────────────────────────────────┤
│                                         │
│  👤 CLIENT                              │
│  Email: client@demo.fr                 │
│  MDP: Password123!                     │
│                                         │
│  👨‍💼 EMPLOYÉ                             │
│  Email: employe@demo.fr                │
│  MDP: Password123!                     │
│                                         │
│  🔧 ADMIN                               │
│  Email: admin@demo.fr                  │
│  MDP: Password123!                     │
│                                         │
│  🌐 URL: https://vite-gourmand.fr      │
└─────────────────────────────────────────┘
```

**CONSEIL :** Imprimez cette page et gardez-la avec vous pendant la présentation !

---

## 🔄 Réinitialisation (Si Nécessaire)

**Si vous devez recréer les comptes :**

```bash
# Sur le VPS
ssh dev@37.59.124.193
cd /var/www/vite-gourmand/backend
php artisan tinker
```

**Pour le client :**
```php
App\Models\User::where('email', 'client@demo.fr')->delete();
$client = new App\Models\User();
$client->nom = 'Client';
$client->prenom = 'Demo';
$client->email = 'client@demo.fr';
$client->password = bcrypt('Password123!');
$client->gsm = '0601020304';
$client->adresse = '10 Rue du Client, Paris 75001';
$client->role = 'utilisateur';
$client->active = true;
$client->consentement_rgpd = true;
$client->date_consentement = now();
$client->save();
```

**Pour l'employé :**
```php
App\Models\User::where('email', 'employe@demo.fr')->delete();
$employe = new App\Models\User();
$employe->nom = 'Employé';
$employe->prenom = 'Demo';
$employe->email = 'employe@demo.fr';
$employe->password = bcrypt('Password123!');
$employe->gsm = '0602030405';
$employe->adresse = '20 Rue Employé, Paris 75002';
$employe->role = 'employe';
$employe->active = true;
$employe->consentement_rgpd = true;
$employe->date_consentement = now();
$employe->save();
```

**Pour l'admin :**
```php
App\Models\User::where('email', 'admin@demo.fr')->delete();
$admin = new App\Models\User();
$admin->nom = 'Administrateur';
$admin->prenom = 'Demo';
$admin->email = 'admin@demo.fr';
$admin->password = bcrypt('Password123!');
$admin->gsm = '0603040506';
$admin->adresse = '30 Rue Admin, Paris 75003';
$admin->role = 'administrateur';
$admin->active = true;
$admin->consentement_rgpd = true;
$admin->date_consentement = now();
$admin->save();
exit
```

---

## ✅ Checklist de Vérification

### Jour J - 1

- [ ] Tester la connexion avec les 3 comptes
- [ ] Vérifier que le site est accessible
- [ ] S'assurer qu'il y a des menus actifs
- [ ] Faire un test complet de la démo (chronomètre)
- [ ] Imprimer cette fiche de credentials

### Jour J

- [ ] Avoir cette fiche avec moi
- [ ] Vérifier l'accès Internet avant de commencer
- [ ] Ouvrir https://vite-gourmand.fr dans un onglet
- [ ] Respirer et se détendre !

---

## 📝 Conclusion

Ces **3 comptes de démo** permettent de montrer toutes les fonctionnalités de l'application de manière professionnelle :

✅ **Parcours client complet** (commande, suivi, RGPD)  
✅ **Gestion opérationnelle** (employé : commandes, avis)  
✅ **Administration complète** (admin : menus, plats, utilisateurs)

**Avec ces comptes, vous êtes prêt pour une démonstration réussie devant le jury !** 🎯

**Bonne chance ! 🍀**
