<?php

namespace App\Observers;

use App\Models\Commande;
use App\Models\CommandeStat;

class CommandeObserver
{
    private function sync(Commande $commande): void
    {
        CommandeStat::updateOrCreate(
            ['commande_id' => $commande->id],
            [
                'menu_id'       => $commande->menu_id,
                'menu_titre'    => $commande->menu?->titre,
                'nb_personnes'  => $commande->nb_personnes,
                'montant'       => (float) $commande->prix_total,
                'statut'        => $commande->statut,
                'date_commande' => $commande->created_at,
            ]
        );
    }

    public function created(Commande $commande): void
    {
        $this->sync($commande);
    }

    public function updated(Commande $commande): void
    {
        $this->sync($commande);
    }
}
