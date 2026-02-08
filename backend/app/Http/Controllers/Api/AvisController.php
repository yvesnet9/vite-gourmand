<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Models\Commande;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    /**
     * Liste tous les avis validés
     */
    public function index()
    {
        $avis = Avis::where('valide', true)
            ->with(['user', 'commande.menu'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($avis);
    }

    /**
     * Créer un avis (uniquement si commande terminée)
     */
    public function store(Request $request)
    {
        $request->validate([
            'commande_id' => 'required|exists:commandes,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string',
        ]);

        $commande = Commande::findOrFail($request->commande_id);

        // Vérifier que c'est bien la commande de l'utilisateur
        if ($commande->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        // Vérifier que la commande est terminée
        if ($commande->statut !== 'terminee') {
            return response()->json([
                'message' => 'Vous ne pouvez laisser un avis que pour une commande terminée'
            ], 400);
        }

        // Vérifier qu'il n'y a pas déjà un avis
        if ($commande->avis) {
            return response()->json([
                'message' => 'Vous avez déjà laissé un avis pour cette commande'
            ], 400);
        }

        $avis = Avis::create([
            'user_id' => $request->user()->id,
            'commande_id' => $request->commande_id,
            'note' => $request->note,
            'commentaire' => $request->commentaire,
            'valide' => false, // Doit être validé par un admin
        ]);

        return response()->json([
            'message' => 'Avis créé avec succès. Il sera visible après validation.',
            'avis' => $avis,
        ], 201);
    }

    /**
     * Afficher un avis spécifique
     */
    public function show($id)
    {
        $avis = Avis::with(['user', 'commande.menu', 'validateur'])->findOrFail($id);

        return response()->json($avis);
    }

    /**
     * Valider un avis (admin uniquement)
     */
    public function update(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $avis = Avis::findOrFail($id);

        $request->validate([
            'valide' => 'required|boolean',
        ]);

        $avis->valide = $request->valide;

        if ($request->valide) {
            $avis->date_validation = now();
            $avis->validateur_id = $request->user()->id;
        }

        $avis->save();

        return response()->json([
            'message' => $request->valide ? 'Avis validé avec succès' : 'Avis rejeté',
            'avis' => $avis,
        ]);
    }

    /**
     * Supprimer un avis
     */
    public function destroy(Request $request, $id)
    {
        $avis = Avis::findOrFail($id);

        // Seul l'auteur ou un admin peut supprimer
        if ($avis->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $avis->delete();

        return response()->json([
            'message' => 'Avis supprimé avec succès',
        ]);
    }
}
