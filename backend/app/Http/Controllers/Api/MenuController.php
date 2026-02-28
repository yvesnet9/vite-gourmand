<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Liste des menus actifs
     */
    /**
     * Liste des menus actifs avec filtres
     */
    public function index(Request $request)
    {
        // Public access
        $query = Menu::with('plats.allergenes')
            ->where('actif', true);
        
        // Filtrer par prix maximum
        if ($request->has('prix_max')) {
            $query->where('prix_base', '<=', $request->prix_max);
        }
        
        // Filtrer par prix minimum
        if ($request->has('prix_min')) {
            $query->where('prix_base', '>=', $request->prix_min);
        }
        
        // Filtrer par thème
        if ($request->has('theme')) {
            $query->where('theme', $request->theme);
        }
        
        // Filtrer par régime
        if ($request->has('regime')) {
            $query->where('regime', $request->regime);
        }
        
        // Filtrer par nombre de personnes minimum
        if ($request->has('nb_personnes')) {
            $query->where('nb_personne_min', '<=', $request->nb_personnes);
        }
        
        $menus = $query->get();
        
        return response()->json($menus);
    }
    /**
     * Afficher un menu spécifique
     */
    public function show($id)
    {
        $menu = Menu::with('plats.allergenes')->findOrFail($id);
        // Public access

        return response()->json($menu);
    }

    /**
     * Créer un nouveau menu (admin/employé)
     */
    public function store(StoreMenuRequest $request)
    {
        // Public access

        $menu = Menu::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'theme' => $request->theme,
            'regime' => $request->regime,
            'nb_personne_min' => $request->nb_personne_min,
            'prix_base' => $request->prix_base,
            'stock' => $request->stock ?? 0,
            'conditions' => $request->conditions,
            'actif' => $request->actif ?? true,
        ]);

        if ($request->has('plat_ids')) {
            $menu->plats()->attach($request->plat_ids);
        }

        return response()->json($menu->load('plats.allergenes'), 201);
    }

    /**
     * Mettre à jour un menu (admin/employé)
     */
    public function update(UpdateMenuRequest $request, $id)
    {
        $menu = Menu::findOrFail($id);
        // Public access

        $menu->update($request->only([
            'titre',
            'description',
            'theme',
            'regime',
            'nb_personne_min',
            'prix_base',
            'stock',
            'conditions',
            'actif'
        ]));

        if ($request->has('plat_ids')) {
            $menu->plats()->sync($request->plat_ids);
        }

        return response()->json($menu->load('plats.allergenes'));
    }

    /**
     * Supprimer un menu (admin uniquement)
     */
    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        // Public access

        $menu->delete();

        return response()->json([
            'message' => 'Menu supprimé avec succès'
        ]);
    }
}
