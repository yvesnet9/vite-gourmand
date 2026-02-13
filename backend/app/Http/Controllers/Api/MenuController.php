<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Liste tous les menus (avec filtres)
     */
    public function index(Request $request)
    {

        $query = Menu::with(['plats.allergenes']);
        // Filtre par prix maximum
        if ($request->has('prix_max')) {
            $query->where('prix_base', '<=', $request->prix_max);
        }

        // Filtre par fourchette de prix
        if ($request->has('prix_min') && $request->has('prix_max')) {
            $query->whereBetween('prix_base', [$request->prix_min, $request->prix_max]);
        }

        // Filtre par thème
        if ($request->has('theme')) {
            $query->where('theme', $request->theme);
        }

        // Filtre par régime
        if ($request->has('regime')) {
            $query->where('regime', $request->regime);
        }

        // Filtre par nombre de personnes minimum
        if ($request->has('nb_personnes')) {
            $query->where('nb_personne_min', '<=', $request->nb_personnes);
        }

        // Seulement les menus actifs par défaut

        $query->where('actif', true);

        $menus = $query->get();

        return response()->json($menus);
    }

    /**
     * Créer un nouveau menu
     */
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'theme' => 'required|string|max:50',
            'regime' => 'required|string|max:50',
            'nb_personne_min' => 'required|integer|min:1',
            'prix_base' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'conditions' => 'nullable|string',
            'plats' => 'nullable|array',
            'plats.*' => 'exists:plats,id',
        ]);

        $menu = Menu::create($request->only([
            'titre',
            'description',
            'theme',
            'regime',
            'nb_personne_min',
            'prix_base',
            'stock',
            'conditions',
        ]));

        // Associer les plats
        if ($request->has('plats')) {
            $menu->plats()->attach($request->plats);
        }

        return response()->json([
            'message' => 'Menu créé avec succès',
            'menu' => $menu->load(['plats']),
        ], 201);
    }

    /**
     * Afficher un menu spécifique
     */
    public function show($id)
    {

        $menu = Menu::with(['plats.allergenes'])->findOrFail($id);
        return response()->json($menu);
    }

    /**
     * Mettre à jour un menu
     */
    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'theme' => 'sometimes|required|string|max:50',
            'regime' => 'sometimes|required|string|max:50',
            'nb_personne_min' => 'sometimes|required|integer|min:1',
            'prix_base' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'conditions' => 'nullable|string',
            'plats' => 'nullable|array',
            'plats.*' => 'exists:plats,id',
        ]);

        $menu->update($request->only([
            'titre',
            'description',
            'theme',
            'regime',
            'nb_personne_min',
            'prix_base',
            'stock',
            'conditions',

            'actif',
        ]));

        // Mettre à jour les plats associés
        if ($request->has('plats')) {
            $menu->plats()->sync($request->plats);
        }

        return response()->json([
            'message' => 'Menu mis à jour avec succès',

            'menu' => $menu->load(['plats']),
        ]);
    }

    /**
     * Supprimer un menu
     */
    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json([
            'message' => 'Menu supprimé avec succès',
        ]);
    }
}
