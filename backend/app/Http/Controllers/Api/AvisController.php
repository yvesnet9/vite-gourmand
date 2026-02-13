<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAvisRequest;
use App\Http\Requests\UpdateAvisRequest;
use App\Models\Avis;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    /**
     * Liste des avis validés
     */
    public function index()
    {
        $this->authorize('viewAny', Avis::class);

        $avis = Avis::with(['user', 'commande.menu'])
            ->where('valide', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($avis);
    }

    /**
     * Liste des avis en attente de validation (admin/employé)
     */
    public function pending(Request $request)
    {
        $this->authorize('viewPending', Avis::class);

        $avis = Avis::with(['user', 'commande.menu'])
            ->where('valide', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($avis);
    }

    /**
     * Afficher un avis spécifique
     */
    public function show($id)
    {
        $avis = Avis::with(['user', 'commande.menu'])->findOrFail($id);
        $this->authorize('view', $avis);

        return response()->json($avis);
    }

    /**
     * Créer un nouvel avis
     */
    public function store(StoreAvisRequest $request)
    {
        $this->authorize('create', Avis::class);

        // Vérifier que la commande appartient à l'utilisateur
        $commande = \App\Models\Commande::where('id', $request->commande_id)
            ->where('user_id', $request->user()->id)
            ->where('statut', 'livree')
            ->firstOrFail();

        // Vérifier qu'il n'y a pas déjà un avis pour cette commande
        $existingAvis = Avis::where('commande_id', $request->commande_id)->first();
        if ($existingAvis) {
            return response()->json([
                'message' => 'Un avis existe déjà pour cette commande'
            ], 422);
        }

        $avis = Avis::create([
            'user_id' => $request->user()->id,
            'commande_id' => $request->commande_id,
            'note' => $request->note,
            'commentaire' => $request->commentaire,
            'valide' => false,
        ]);

        return response()->json($avis->load('user', 'commande.menu'), 201);
    }

    /**
     * Valider ou rejeter un avis (admin/employé)
     */
    public function update(UpdateAvisRequest $request, $id)
    {
        $avis = Avis::findOrFail($id);
        $this->authorize('update', $avis);

        $avis->update([
            'valide' => $request->valide,
        ]);

        return response()->json($avis->load('user', 'commande.menu'));
    }

    /**
     * Supprimer un avis (admin uniquement)
     */
    public function destroy($id)
    {
        $avis = Avis::findOrFail($id);
        $this->authorize('delete', $avis);

        $avis->delete();

        return response()->json([
            'message' => 'Avis supprimé avec succès'
        ]);
    }
}
