<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'commande_id',
        'note',
        'commentaire',
        'valide',
        'date_validation',
        'validateur_id',
    ];

    protected $casts = [
        'note' => 'integer',
        'valide' => 'boolean',
        'date_validation' => 'datetime',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function validateur()
    {
        return $this->belongsTo(User::class, 'validateur_id');
    }
}
