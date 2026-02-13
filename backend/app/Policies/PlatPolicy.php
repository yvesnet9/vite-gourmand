<?php

namespace App\Policies;

use App\Models\Plat;
use App\Models\User;

class PlatPolicy
{
    /**
     * Tout le monde peut voir les plats
     */
    public function viewAny(?User $user)
    {
        return true;
    }

    /**
     * Tout le monde peut voir un plat
     */
    public function view(?User $user, Plat $plat)
    {
        return true;
    }

    /**
     * Seuls les admins et employés peuvent créer des plats
     */
    public function create(User $user)
    {
        return in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * Seuls les admins et employés peuvent modifier des plats
     */
    public function update(User $user, Plat $plat)
    {
        return in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * Seuls les admins peuvent supprimer des plats
     */
    public function delete(User $user, Plat $plat)
    {
        return $user->role === 'administrateur';
    }
}
