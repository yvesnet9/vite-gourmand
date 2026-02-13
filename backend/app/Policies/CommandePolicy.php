<?php

namespace App\Policies;

use App\Models\Commande;
use App\Models\User;

class CommandePolicy
{
    /**
     * Admins et employés voient toutes les commandes, clients voient les leurs
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * L'utilisateur peut voir sa propre commande, admin/employé peuvent tout voir
     */
    public function view(User $user, Commande $commande)
    {
        return $user->id === $commande->user_id ||
               in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * Tout utilisateur authentifié peut créer une commande
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Seuls admin/employé peuvent modifier le statut d'une commande
     */
    public function update(User $user, Commande $commande)
    {
        return in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * L'utilisateur peut annuler sa propre commande si en_attente
     */
    public function cancel(User $user, Commande $commande)
    {
        return $user->id === $commande->user_id &&
               $commande->statut === 'en_attente';
    }

    /**
     * Seuls les admins peuvent supprimer des commandes
     */
    public function delete(User $user, Commande $commande)
    {
        return $user->role === 'administrateur';
    }
}
