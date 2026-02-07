<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'theme',
        'regime',
        'nb_personne_min',
        'prix_base',
        'stock',
        'conditions',
        'actif',
    ];

    protected $casts = [
        'prix_base' => 'decimal:2',
        'actif' => 'boolean',
        'nb_personne_min' => 'integer',
        'stock' => 'integer',
    ];

    // Relations
    public function images()
    {
        return $this->hasMany(ImageMenu::class);
    }

    public function plats()
    {
        return $this->belongsToMany(Plat::class, 'menu_plat');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }
}
