<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Menu;
use App\Models\SuiviCommande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    /**
     * Liste toutes les commandes (filtrage selon le rôle)
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Commande::with(['user', 'menu', 'suivis']);

        // Si utilisateur simple : voir uniquement ses commandes
        if ($user->role === 'utilisateur') {
            $query->where('user_id', $user->id);
        }

        // Filtres optionnels
        if ($request->has('statut')) {
            $query->where('statut', $request->statut);
        }

        if ($request->has('date_debut') && $request->has('date_fin')) {
            $query->whereBetween('date_prestation', [$request->date_debut, $request->date_fin]);
        }

        $commandes = $query->orderBy('created_at', 'desc')->get();

        return response()->json($commandes);
    }

    /**
     * Créer une nouvelle commande
     */
    public function store(Request $request)
    {
        $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'nb_personnes' => 'required|integer|min:1',
            'date_prestation' => 'required|date|after:today',
            'heure_prestation' => 'required',
            'adresse_livraison' => 'required|string',
            'ville_livraison' => 'required|string',
            'code_postal' => 'required|string',
            'pret_materiel' => 'boolean',
        ]);

        $menu = Menu::findOrFail($request->menu_id);

        // Vérifications
        if (!$menu->actif) {
            return response()->json(['message' => 'Ce menu n\'est pas disponible.'], 400);
        }

        if ($request->nb_personnes < $menu->nb_personne_min) {
            return response()->json([
                'message' => "Le nombre minimum de personnes pour ce menu est {$menu->nb_personne_min}."
            ], 400);
        }

        // Calculs de prix
        $prix_menu = $menu->prix_base * $request->nb_personnes;
        $distance_km = $this->calculerDistance($request->code_postal); // Simplification
        $prix_livraison = $this->calculerPrixLivraison($distance_km);
        $reduction = 0; // À implémenter selon les règles métier
        $prix_total = $prix_menu + $prix_livraison - $reduction;

        DB::beginTransaction();

        try {
            $commande = Commande::create([
                'user_id' => $request->user()->id,
                'menu_id' => $request->menu_id,
                'nb_personnes' => $request->nb_personnes,
                'date_prestation' => $request->date_prestation,
                'heure_prestation' => $request->heure_prestation,
                'adresse_livraison' => $request->adresse_livraison,
                'ville_livraison' => $request->ville_livraison,
                'code_postal' => $request->code_postal,
                'distance_km' => $distance_km,
                'prix_menu' => $prix_menu,
                'prix_livraison' => $prix_livraison,
                'reduction' => $reduction,
                'prix_total' => $prix_total,
                'statut' => 'en_attente',
                'pret_materiel' => $request->pret_materiel ?? false,
            ]);

            // Créer le premier suivi
            SuiviCommande::create([
                'commande_id' => $commande->id,
                'ancien_statut' => null,
                'nouveau_statut' => 'en_attente',
                'commentaire' => 'Commande créée',
                'created_by' => $request->user()->id,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Commande créée avec succès',
                'commande' => $commande->load(['user', 'menu']),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur lors de la création de la commande'], 500);
        }
    }

    /**
     * Afficher une commande spécifique
     */
    public function show(Request $request, $id)
    {
        $commande = Commande::with(['user', 'menu', 'suivis.createur', 'avis'])->findOrFail($id);

        $user = $request->user();

        // Vérifier les permissions
        if ($user->role === 'utilisateur' && $commande->user_id !== $user->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        return response()->json($commande);
    }

    /**
     * Mettre à jour une commande (changement de statut principalement)
     */
    public function update(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);

        // Seuls les employés/admins peuvent modifier
        if (!$request->user()->isEmployee()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'statut' => 'sometimes|in:en_attente,accepte,en_preparation,en_cours_livraison,livre,en_attente_retour_materiel,terminee,annulee',
            'commentaire' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $ancien_statut = $commande->statut;

            if ($request->has('statut')) {
                $commande->statut = $request->statut;

                // Créer un suivi
                SuiviCommande::create([
                    'commande_id' => $commande->id,
                    'ancien_statut' => $ancien_statut,
                    'nouveau_statut' => $request->statut,
                    'commentaire' => $request->commentaire ?? "Statut changé de {$ancien_statut} à {$request->statut}",
                    'created_by' => $request->user()->id,
                ]);
            }

            $commande->save();

            DB::commit();

            return response()->json([
                'message' => 'Commande mise à jour avec succès',
                'commande' => $commande->load(['suivis']),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur lors de la mise à jour'], 500);
        }
    }

    /**
     * Annuler une commande
     */
    public function destroy(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);

        $user = $request->user();

        // Vérifier les permissions
        if ($user->role === 'utilisateur' && $commande->user_id !== $user->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        // Ne peut annuler que si en_attente ou accepte
        if (!in_array($commande->statut, ['en_attente', 'accepte'])) {
            return response()->json([
                'message' => 'Cette commande ne peut plus être annulée'
            ], 400);
        }

        $commande->statut = 'annulee';
        $commande->save();

        SuiviCommande::create([
            'commande_id' => $commande->id,
            'ancien_statut' => $commande->statut,
            'nouveau_statut' => 'annulee',
            'commentaire' => 'Commande annulée par ' . $user->nom,
            'created_by' => $user->id,
        ]);

        return response()->json([
            'message' => 'Commande annulée avec succès',
        ]);
    }

    /**
     * Calculer la distance (simplifié)
     */
    private function calculerDistance($code_postal)
    {
        // Simplification : retourne une distance fictive
        // En production : utiliser une API de géolocalisation
        return rand(5, 50);
    }

    /**
     * Calculer le prix de livraison
     */
    private function calculerPrixLivraison($distance_km)
    {
        // 5€ + 1€/km
        return 5 + ($distance_km * 1);
    }
}
