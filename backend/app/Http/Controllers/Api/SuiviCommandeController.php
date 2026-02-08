<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SuiviCommande;
use App\Models\Commande;
use Illuminate\Http\Request;

class SuiviCommandeController extends Controller
{
    /**
     * Obtenir l'historique d'une commande
     */
    public function index(Request $request, $commande_id)
    {
        $commande = Commande::findOrFail($commande_id);

        $user = $request->user();

        // Vérifier les permissions
        if ($user->role === 'utilisateur' && $commande->user_id !== $user->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $suivis = SuiviCommande::where('commande_id', $commande_id)
            ->with('createur')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($suivis);
    }

    /**
     * Ajouter un suivi manuel (commentaire employé)
     */
    public function store(Request $request, $commande_id)
    {
        // Seuls les employés/admins peuvent ajouter un suivi
        if (!$request->user()->isEmployee()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $commande = Commande::findOrFail($commande_id);

        $request->validate([
            'commentaire' => 'required|string',
        ]);

        $suivi = SuiviCommande::create([
            'commande_id' => $commande_id,
            'ancien_statut' => $commande->statut,
            'nouveau_statut' => $commande->statut,
            'commentaire' => $request->commentaire,
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Commentaire ajouté avec succès',
            'suivi' => $suivi->load('createur'),
        ], 201);
    }
}
