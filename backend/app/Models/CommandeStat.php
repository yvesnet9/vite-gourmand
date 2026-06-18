<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class CommandeStat extends Model
{
    protected $connection = 'mongodb';
    protected $table = 'commandes_stats';

    protected $fillable = [
       'commande_id',
        'menu_id',
        'menu_titre',
        'nb_personnes',
        'montant',
        'date_commande',
        'statut',
    ];

    protected $casts = [
        'commande_id' => 'integer',
        'menu_id'       => 'integer',
        'nb_personnes'  => 'integer',
        'montant'       => 'float',
        'date_commande' => 'datetime',
    ];
}
