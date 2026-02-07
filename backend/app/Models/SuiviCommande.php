<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuiviCommande extends Model
{
    use HasFactory;

    protected $fillable = [
        'commande_id',
        'ancien_statut',
        'nouveau_statut',
        'commentaire',
        'created_by',
    ];

    // Relations
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function createur()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
