<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

   protected $fillable = [
    'nom',
    'prenom',
    'email',
    'password',
    'gsm',
    'adresse',
    'role',
    'active',
    'consentement_rgpd',      // AJOUTEZ
    'date_consentement',      // AJOUTEZ
    'newsletter',             // AJOUTEZ
];

    protected $hidden = [
        'password',
        'remember_token',
    ];

   protected $casts = [
    'email_verified_at' => 'datetime',
    'active' => 'boolean',
    'password' => 'hashed',
    'consentement_rgpd' => 'boolean',     // AJOUTEZ
    'date_consentement' => 'datetime',    // AJOUTEZ
    'newsletter' => 'boolean',            // AJOUTEZ
];

    // Relations
    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    // Méthodes utilitaires
    public function isAdmin()
    {
        return $this->role === 'administrateur';
    }

    public function isEmployee()
    {
        return $this->role === 'employe' || $this->isAdmin();
    }

    public function isUser()
    {
        return $this->role === 'utilisateur';
    }
}
