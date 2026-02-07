<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'jour',
        'heure_ouverture',
        'heure_fermeture',
        'ferme',
    ];

    protected $casts = [
        'ferme' => 'boolean',
        'heure_ouverture' => 'datetime:H:i',
        'heure_fermeture' => 'datetime:H:i',
    ];
}
