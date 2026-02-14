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
    public function index()
    {
        $this->authorize('viewAny', Menu::class);

        $menus = Menu::with('plats.allergenes')
            ->where('actif', true)
            ->get();

        return response()->json($menus);
    }

    /**
     * Afficher un menu spécifique
     */
    public function show($id)
    {
        $menu = Menu::with('plats.allergenes')->findOrFail($id);
        $this->authorize('view', $menu);

        return response()->json($menu);
    }

    /**
     * Créer un nouveau menu (admin/employé)
     */
    public function store(StoreMenuRequest $request)
    {
        $this->authorize('create', Menu::class);

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
        $this->authorize('update', $menu);

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
        $this->authorize('delete', $menu);

        $menu->delete();

        return response()->json([
            'message' => 'Menu supprimé avec succès'
        ]);
    }
}
