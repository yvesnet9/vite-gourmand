<?php

namespace App\Policies;

use App\Models\Menu;
use App\Models\User;

class MenuPolicy
{
    /**
     * Tout le monde peut voir les menus
     */
    public function viewAny(?User $user)
    {
        return true;
    }

    /**
     * Tout le monde peut voir un menu
     */
    public function view(?User $user, Menu $menu)
    {
        return true;
    }

    /**
     * Seuls les admins et employés peuvent créer des menus
     */
    public function create(User $user)
    {
        return in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * Seuls les admins et employés peuvent modifier des menus
     */
    public function update(User $user, Menu $menu)
    {
        return in_array($user->role, ['administrateur', 'employe']);
    }

    /**
     * Seuls les admins peuvent supprimer des menus
     */
    public function delete(User $user, Menu $menu)
    {
        return $user->role === 'administrateur';
    }
}
