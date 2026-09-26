<?php

namespace App\Observers;

use App\Models\Commande;
use App\Models\CommandeStat;
use Illuminate\Support\Facades\Log;

class CommandeObserver
{
    /**
     * Synchronise la commande vers MongoDB (statistiques).
     * Non bloquant : PostgreSQL reste la source de vérité,
     * une panne MongoDB ne doit jamais empêcher une commande.
     */
    private function sync(Commande $commande): void
    {
        try {
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
        } catch (\Throwable $e) {
            Log::warning("Sync MongoDB échouée (commande {$commande->id}) : " . $e->getMessage());
        }
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
