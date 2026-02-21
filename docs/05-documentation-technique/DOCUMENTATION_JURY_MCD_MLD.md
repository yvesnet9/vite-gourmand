# 📊 Modèle Conceptuel et Logique de Données (MCD/MLD)

**Projet :** Vite & Gourmand  
**Auteur :** Yves Mukuna  
**Date :** Février 2025

---

## 1. Modèle Conceptuel de Données (MCD)

### 🎯 Objectif
Représenter les entités métier et leurs relations sans considération technique.

### 📦 Entités Principales

#### **UTILISATEUR**
- Identifiant unique
- Nom, Prénom
- Email (unique)
- Mot de passe (hashé)
- Numéro de téléphone (GSM)
- Adresse de livraison
- Rôle (visiteur, utilisateur, employé, administrateur)
- Statut actif/inactif
- Consentement RGPD
- Date de consentement
- Newsletter (opt-in)

#### **MENU**
- Identifiant unique
- Titre
- Description
- Thème (végétarien, traditionnel, gastronomique, bio)
- Régime alimentaire (normal, végétarien, vegan, sans gluten)
- Nombre de personnes minimum
- Prix de base
- Stock disponible
- Conditions spéciales
- Statut actif/inactif

#### **PLAT**
- Identifiant unique
- Nom
- Description
- Type (entrée, plat principal, dessert)

#### **ALLERGENE**
- Identifiant unique
- Nom (gluten, lactose, arachides, etc.)

#### **COMMANDE**
- Identifiant unique
- Date de commande
- Date de livraison souhaitée
- Adresse de livraison
- Quantité
- Prix total
- Statut (en attente, validée, en préparation, livrée, annulée)
- Instructions spéciales

#### **AVIS**
- Identifiant unique
- Note (1 à 5 étoiles)
- Commentaire
- Date de création
- Statut (en attente, validé, rejeté)

#### **CONTACT**
- Identifiant unique
- Nom complet
- Email
- Sujet
- Message
- Date de création
- Statut (nouveau, traité)

---

## 2. Relations Entre Entités

### Relations Principales

**UTILISATEUR ↔ COMMANDE** (1:N)
- Un utilisateur peut passer plusieurs commandes
- Une commande appartient à un seul utilisateur
- Cardinalité : (1,N) - (1,1)

**MENU ↔ COMMANDE** (1:N)
- Un menu peut être commandé plusieurs fois
- Une commande concerne un seul menu
- Cardinalité : (1,N) - (1,1)

**UTILISATEUR ↔ AVIS** (1:N)
- Un utilisateur peut laisser plusieurs avis
- Un avis est rédigé par un seul utilisateur
- Cardinalité : (1,N) - (1,1)

**COMMANDE ↔ AVIS** (1:1)
- Une commande peut avoir un avis
- Un avis concerne une seule commande
- Cardinalité : (0,1) - (1,1)

**MENU ↔ PLAT** (N:N)
- Un menu contient plusieurs plats
- Un plat peut être dans plusieurs menus
- Table associative : **MENU_PLAT**

**PLAT ↔ ALLERGENE** (N:N)
- Un plat peut contenir plusieurs allergènes
- Un allergène peut être dans plusieurs plats
- Table associative : **PLAT_ALLERGENE**

---

## 3. Modèle Logique de Données (MLD)

### Structure des Tables PostgreSQL

#### **Table : users**
```sql
users
├── id (BIGINT, PK, AUTO_INCREMENT)
├── nom (VARCHAR(100), NOT NULL)
├── prenom (VARCHAR(100), NOT NULL)
├── email (VARCHAR(255), UNIQUE, NOT NULL)
├── password (VARCHAR(255), NOT NULL)
├── gsm (VARCHAR(20), NOT NULL)
├── adresse (TEXT, NOT NULL)
├── role (ENUM: visiteur, utilisateur, employe, administrateur, DEFAULT: utilisateur)
├── active (BOOLEAN, DEFAULT: true)
├── consentement_rgpd (BOOLEAN, DEFAULT: false)
├── date_consentement (TIMESTAMP, NULLABLE)
├── newsletter (BOOLEAN, DEFAULT: false)
├── email_verified_at (TIMESTAMP, NULLABLE)
├── remember_token (VARCHAR(100), NULLABLE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- UNIQUE(email)
- INDEX(role)
```

#### **Table : menus**
```sql
menus
├── id (BIGINT, PK, AUTO_INCREMENT)
├── titre (VARCHAR(255), NOT NULL)
├── description (TEXT, NOT NULL)
├── theme (VARCHAR(50), NOT NULL)
├── regime (VARCHAR(50), NOT NULL)
├── nb_personne_min (INTEGER, NOT NULL)
├── prix_base (DECIMAL(10,2), NOT NULL)
├── stock (INTEGER, DEFAULT: 0)
├── conditions (TEXT, NULLABLE)
├── actif (BOOLEAN, DEFAULT: true)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- INDEX(actif)
- INDEX(theme)
```

#### **Table : plats**
```sql
plats
├── id (BIGINT, PK, AUTO_INCREMENT)
├── nom (VARCHAR(255), NOT NULL)
├── description (TEXT, NOT NULL)
├── type (ENUM: entree, plat, dessert, NOT NULL)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- INDEX(type)
```

#### **Table : allergenes**
```sql
allergenes
├── id (BIGINT, PK, AUTO_INCREMENT)
├── nom (VARCHAR(100), UNIQUE, NOT NULL)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- UNIQUE(nom)
```

#### **Table : commandes**
```sql
commandes
├── id (BIGINT, PK, AUTO_INCREMENT)
├── user_id (BIGINT, FK -> users.id, NOT NULL)
├── menu_id (BIGINT, FK -> menus.id, NOT NULL)
├── date_commande (TIMESTAMP, NOT NULL)
├── date_livraison (DATE, NOT NULL)
├── adresse_livraison (TEXT, NOT NULL)
├── quantite (INTEGER, NOT NULL)
├── prix_total (DECIMAL(10,2), NOT NULL)
├── statut (ENUM: en_attente, validee, en_preparation, livree, annulee, DEFAULT: en_attente)
├── instructions (TEXT, NULLABLE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- INDEX(user_id)
- INDEX(menu_id)
- INDEX(statut)
- INDEX(date_livraison)

Foreign Keys:
- user_id REFERENCES users(id) ON DELETE CASCADE
- menu_id REFERENCES menus(id) ON DELETE RESTRICT
```

#### **Table : avis**
```sql
avis
├── id (BIGINT, PK, AUTO_INCREMENT)
├── user_id (BIGINT, FK -> users.id, NOT NULL)
├── commande_id (BIGINT, FK -> commandes.id, UNIQUE, NOT NULL)
├── note (INTEGER, CHECK (note BETWEEN 1 AND 5), NOT NULL)
├── commentaire (TEXT, NOT NULL)
├── statut (ENUM: en_attente, valide, rejete, DEFAULT: en_attente)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- INDEX(user_id)
- UNIQUE(commande_id)
- INDEX(statut)
- INDEX(note)

Foreign Keys:
- user_id REFERENCES users(id) ON DELETE CASCADE
- commande_id REFERENCES commandes(id) ON DELETE CASCADE
```

#### **Table : contacts**
```sql
contacts
├── id (BIGINT, PK, AUTO_INCREMENT)
├── nom (VARCHAR(100), NOT NULL)
├── email (VARCHAR(255), NOT NULL)
├── sujet (VARCHAR(255), NOT NULL)
├── message (TEXT, NOT NULL)
├── statut (ENUM: nouveau, traite, DEFAULT: nouveau)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- INDEX(statut)
- INDEX(created_at)
```

#### **Table associative : menu_plat**
```sql
menu_plat
├── id (BIGINT, PK, AUTO_INCREMENT)
├── menu_id (BIGINT, FK -> menus.id, NOT NULL)
├── plat_id (BIGINT, FK -> plats.id, NOT NULL)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- UNIQUE(menu_id, plat_id)

Foreign Keys:
- menu_id REFERENCES menus(id) ON DELETE CASCADE
- plat_id REFERENCES plats(id) ON DELETE CASCADE
```

#### **Table associative : plat_allergene**
```sql
plat_allergene
├── id (BIGINT, PK, AUTO_INCREMENT)
├── plat_id (BIGINT, FK -> plats.id, NOT NULL)
├── allergene_id (BIGINT, FK -> allergenes.id, NOT NULL)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- UNIQUE(plat_id, allergene_id)

Foreign Keys:
- plat_id REFERENCES plats(id) ON DELETE CASCADE
- allergene_id REFERENCES allergenes(id) ON DELETE CASCADE
```

#### **Table : personal_access_tokens** (Sanctum)
```sql
personal_access_tokens
├── id (BIGINT, PK, AUTO_INCREMENT)
├── tokenable_type (VARCHAR(255), NOT NULL)
├── tokenable_id (BIGINT, NOT NULL)
├── name (VARCHAR(255), NOT NULL)
├── token (VARCHAR(64), UNIQUE, NOT NULL)
├── abilities (TEXT, NULLABLE)
├── last_used_at (TIMESTAMP, NULLABLE)
├── expires_at (TIMESTAMP, NULLABLE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Index:
- UNIQUE(token)
- INDEX(tokenable_type, tokenable_id)
```

---

## 4. Règles de Gestion

### Contraintes Métier

1. **Utilisateurs**
   - Un email ne peut être utilisé qu'une seule fois
   - Le mot de passe doit contenir au moins 10 caractères avec majuscules, minuscules, chiffres et symboles
   - Le consentement RGPD est obligatoire pour s'inscrire
   - Par défaut, un nouvel utilisateur a le rôle "utilisateur"

2. **Menus**
   - Un menu doit contenir au moins un plat
   - Le prix de base doit être positif
   - Le stock ne peut pas être négatif
   - Seuls les menus actifs sont visibles par les clients

3. **Commandes**
   - Une commande ne peut être passée que sur un menu actif
   - La date de livraison doit être postérieure à la date de commande
   - La quantité doit être au moins égale au nombre de personnes minimum du menu
   - Le prix total = prix_base × quantité

4. **Avis**
   - Un avis ne peut être laissé que sur une commande livrée
   - Un utilisateur ne peut laisser qu'un seul avis par commande
   - La note doit être entre 1 et 5
   - Les avis doivent être validés par un employé/admin avant d'être publics

5. **Allergènes**
   - Les noms d'allergènes doivent être uniques
   - Un allergène ne peut être supprimé s'il est associé à des plats

---

## 5. Schéma de Dépendances

```
users (13 tables au total)
├── commandes
│   └── avis
├── avis
└── personal_access_tokens

menus
├── commandes
├── menu_plat
    └── plats
        └── plat_allergene
            └── allergenes

contacts (table indépendante)
```

---

## 6. Volumétrie Estimée

| Table | Volume Initial | Croissance Annuelle Estimée |
|-------|---------------|----------------------------|
| users | 100-500 | +1000 utilisateurs/an |
| menus | 20-50 | +50 menus/an |
| plats | 50-100 | +100 plats/an |
| allergenes | 10-15 | Stable |
| commandes | 0 | +5000 commandes/an |
| avis | 0 | +2000 avis/an |
| contacts | 0 | +500 messages/an |

---

## 7. Normalisation

Le modèle respecte la **3ème forme normale (3NF)** :

✅ **1NF** : Toutes les valeurs sont atomiques (pas de tableaux)  
✅ **2NF** : Toutes les colonnes dépendent de la clé primaire complète  
✅ **3NF** : Pas de dépendance transitive (pas de colonne dépendant d'une autre colonne non-clé)

**Exemples de normalisation :**
- Les allergènes sont dans une table séparée (pas un champ texte)
- Les plats sont dans une table séparée (réutilisables dans plusieurs menus)
- Les relations N:N utilisent des tables associatives

---

## 8. Intégrité Référentielle

### Règles ON DELETE

- **CASCADE** : Suppression en cascade
  - Si un utilisateur est supprimé → ses commandes et avis sont supprimés
  - Si un menu est supprimé → ses associations menu_plat sont supprimées
  - Si un plat est supprimé → ses associations sont supprimées

- **RESTRICT** : Empêche la suppression
  - Un menu ne peut être supprimé s'il a des commandes associées

---

## 9. Index et Performances

### Index Créés
- **Primary Keys** : Sur tous les `id`
- **Unique Keys** : email (users), nom (allergenes), token (personal_access_tokens)
- **Foreign Keys** : Toutes les relations
- **Index de recherche** : statut (commandes, avis), date_livraison (commandes)

### Optimisations
- Index sur les colonnes fréquemment filtrées
- Utilisation de ENUM pour les statuts (performances meilleures que VARCHAR)
- Pagination sur les listes (éviter de charger toutes les données)

---

## 📝 Conclusion

Ce modèle de données :
- ✅ Répond aux besoins fonctionnels de l'application
- ✅ Respecte les règles de normalisation
- ✅ Assure l'intégrité des données
- ✅ Est optimisé pour les performances
- ✅ Permet l'évolutivité du système
