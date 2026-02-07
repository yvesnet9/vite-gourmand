<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'menu_id',
        'nb_personnes',
        'date_prestation',
        'heure_prestation',
        'adresse_livraison',
        'ville_livraison',
        'code_postal',
        'distance_km',
        'prix_menu',
        'prix_livraison',
        'reduction',
        'prix_total',
        'statut',
        'pret_materiel',
        'date_retour_materiel',
        'motif_annulation',
        'mode_contact_annulation',
    ];

    protected $casts = [
        'date_prestation' => 'date',
        'heure_prestation' => 'datetime:H:i',
        'date_retour_materiel' => 'date',
        'distance_km' => 'decimal:2',
        'prix_menu' => 'decimal:2',
        'prix_livraison' => 'decimal:2',
        'reduction' => 'decimal:2',
        'prix_total' => 'decimal:2',
        'nb_personnes' => 'integer',
        'pret_materiel' => 'boolean',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function suivis()
    {
        return $this->hasMany(SuiviCommande::class);
    }

    public function avis()
    {
        return $this->hasOne(Avis::class);
    }
}
