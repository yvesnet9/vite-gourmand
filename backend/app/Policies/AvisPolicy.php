<?php

namespace App\Policies;

use App\Models\Avis;
use App\Models\User;

class AvisPolicy
{
    /**
     * Tout le monde peut voir les avis validés
     */
    public function viewAny(?User $user)
    {
        return true;
    }

    /**
     * Seuls admin/employé peuvent voir les avis en attente
     */
    public function viewPending(User $user)
    {
        return in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * Tout le monde peut voir un avis validé
     */
    public function view(?User $user, Avis $avis)
    {
        return $avis->valide ||
               ($user && in_array($user->role, ['administrateur', 'employe']));
    }

    /**
     * Seul le client ayant une commande livrée peut créer un avis
     */
    public function create(User $user)
    {
        return true; // La vérification détaillée est dans le controller
    }

    /**
     * Seuls admin/employé peuvent valider/rejeter un avis
     */
    public function update(User $user, Avis $avis)
    {
        return in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * Seuls les admins peuvent supprimer un avis
     */
    public function delete(User $user, Avis $avis)
    {
        return $user->role === 'administrateur';
    }
}
