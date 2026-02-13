<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommandeRequest;
use App\Http\Requests\UpdateCommandeRequest;
use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    /**
     * Liste des commandes de l'utilisateur connecté
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Commande::class);

        $commandes = Commande::with(['menu.plats.allergenes', 'avis'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($commandes);
    }

    /**
     * Afficher une commande spécifique
     */
    public function show(Request $request, $id)
    {
        $commande = Commande::with(['menu.plats.allergenes', 'avis'])
            ->findOrFail($id);

        $this->authorize('view', $commande);

        return response()->json($commande);
    }

    /**
     * Créer une nouvelle commande
     */
    public function store(StoreCommandeRequest $request)
    {
        $this->authorize('create', Commande::class);

        $menu = \App\Models\Menu::findOrFail($request->menu_id);

        $commande = Commande::create([
            'user_id' => $request->user()->id,
            'menu_id' => $request->menu_id,
            'quantite' => $request->quantite,
            'prix_total' => $menu->prix * $request->quantite,
            'date_livraison' => $request->date_livraison,
            'heure_livraison' => $request->heure_livraison,
            'adresse_livraison' => $request->adresse_livraison,
            'instructions' => $request->instructions,
            'statut' => 'en_attente',
        ]);

        return response()->json($commande->load('menu.plats.allergenes'), 201);
    }

    /**
     * Mettre à jour le statut d'une commande (admin/employé)
     */
    public function update(UpdateCommandeRequest $request, $id)
    {
        $commande = Commande::findOrFail($id);
        $this->authorize('update', $commande);

        $commande->update([
            'statut' => $request->statut,
        ]);

        return response()->json($commande->load('menu.plats.allergenes'));
    }

    /**
     * Annuler une commande (client uniquement si en_attente)
     */
    public function cancel(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);
        $this->authorize('cancel', $commande);

        $commande->update(['statut' => 'annulee']);

        return response()->json([
            'message' => 'Commande annulée avec succès',
            'commande' => $commande
        ]);
    }

    /**
     * Liste de toutes les commandes (admin/employé)
     */
    public function all(Request $request)
    {
        // Vérifier que l'utilisateur est admin ou employé
        if (!in_array($request->user()->role, ['administrateur', 'employe'])) {
            return response()->json([
                'message' => 'Action non autorisée'
            ], 403);
        }

        $commandes = Commande::with(['menu.plats.allergenes', 'user', 'avis'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($commandes);
    }

    /**
     * Supprimer une commande (admin uniquement)
     */
    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $this->authorize('delete', $commande);

        $commande->delete();

        return response()->json([
            'message' => 'Commande supprimée avec succès'
        ]);
    }
}
