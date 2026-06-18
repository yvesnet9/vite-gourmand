<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommandeRequest;
use App\Http\Requests\UpdateCommandeRequest;
use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CommandeController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Commande::class);

        $commandes = Commande::with(['menu.plats.allergenes', 'avis'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($commandes);
    }

    public function show(Request $request, $id)
    {
        $commande = Commande::with(['menu.plats.allergenes', 'avis'])->findOrFail($id);
        $this->authorize('view', $commande);

        return response()->json($commande);
    }

    public function store(StoreCommandeRequest $request)
    {
        $this->authorize('create', Commande::class);

        $menu = \App\Models\Menu::findOrFail($request->menu_id);

        if ($request->nb_personnes < $menu->nb_personne_min) {
            return response()->json([
                'message' => "Ce menu necessite au minimum {$menu->nb_personne_min} personnes.",
            ], 422);
        }

        if ($menu->stock !== null && $menu->stock < 1) {
            return response()->json([
                'message' => 'Ce menu n\'est plus disponible (stock epuise).',
            ], 422);
        }

        $prixMenu = $menu->prix_base * $request->nb_personnes;

        $distanceKm = (float) ($request->distance_km ?? 0);
        $dansBordeaux = strtolower(trim($request->ville_livraison)) === 'bordeaux';
        $prixLivraison = $dansBordeaux ? 5.00 : 5.00 + (0.59 * $distanceKm);

        $reduction = 0;
        if ($request->nb_personnes >= ($menu->nb_personne_min + 5)) {
            $reduction = round($prixMenu * 0.10, 2);
        }

        $prixTotal = $prixMenu + $prixLivraison - $reduction;

        $commande = Commande::create([
            'user_id' => $request->user()->id,
            'menu_id' => $request->menu_id,
            'nb_personnes' => $request->nb_personnes,
            'prix_menu' => $prixMenu,
            'prix_livraison' => $prixLivraison,
            'reduction' => $reduction,
            'prix_total' => $prixTotal,
            'date_prestation' => $request->date_prestation,
            'heure_prestation' => $request->heure_prestation,
            'adresse_livraison' => $request->adresse_livraison,
            'ville_livraison' => $request->ville_livraison,
            'code_postal' => $request->code_postal,
            'distance_km' => $distanceKm,
            'pret_materiel' => $request->pret_materiel ?? false,
            'statut' => 'en_attente',
        ]);

        if ($menu->stock !== null) {
            $menu->decrement('stock');
        }

        return response()->json($commande->load('menu.plats.allergenes'), 201);
    }

    public function update(UpdateCommandeRequest $request, $id)
    {
        $commande = Commande::findOrFail($id);
        $this->authorize('update', $commande);

        $ancienStatut = $commande->statut;
        $commande->statut = $request->statut;

        // Materiel : passage en attente de retour -> echeance a 10 jours ouvres
        if ($request->statut === 'en_attente_retour_materiel' && $commande->pret_materiel) {
            $commande->date_retour_materiel = now()->addWeekdays(10);
        }

        $commande->save();

        // Email au client si le statut a change
        if ($ancienStatut !== $commande->statut && $commande->user) {
            $messages = [
                'accepte' => 'Votre commande a ete acceptee.',
                'en_preparation' => 'Votre commande est en cours de preparation.',
                'en_cours_livraison' => 'Votre commande est en cours de livraison.',
                'livre' => 'Votre commande a ete livree. Bon appetit !',
                'en_attente_retour_materiel' => 'Merci de retourner le materiel prete sous 10 jours ouvres, sous peine d\'une penalite de 600 EUR.',
                'terminee' => 'Votre commande est terminee. Merci de votre confiance !',
                'annulee' => 'Votre commande a ete annulee.',
            ];
            $message = $messages[$commande->statut] ?? "Statut : {$commande->statut}.";

            Mail::raw(
                "Bonjour {$commande->user->prenom},\n\n{$message}\n\nCommande #{$commande->id}\nVite & Gourmand",
                function ($mail) use ($commande) {
                    $mail->to($commande->user->email)
                         ->subject('Mise a jour de votre commande #' . $commande->id);
                }
            );
        }

        return response()->json($commande->load('menu.plats.allergenes'));
    }

    public function cancel(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);
        $this->authorize('cancel', $commande);

        $commande->update(['statut' => 'annulee']);

        return response()->json([
            'message' => 'Commande annulee avec succes',
            'commande' => $commande,
        ]);
    }

    public function all(Request $request)
    {
        if (!in_array($request->user()->role, ['administrateur', 'employe'])) {
            return response()->json(['message' => 'Action non autorisee'], 403);
        }

        $commandes = Commande::with(['menu.plats.allergenes', 'user', 'avis'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($commandes);
    }

    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $this->authorize('delete', $commande);

        $commande->delete();

        return response()->json(['message' => 'Commande supprimee avec succes']);
    }
}
