<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plat;
use Illuminate\Http\Request;

class PlatController extends Controller
{
    /**
     * Liste tous les plats
     */
    public function index(Request $request)
    {
        $query = Plat::with('allergenes');

        // Filtre par type (entrée, plat, dessert)
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Seulement les plats actifs par défaut
        if (!$request->has('show_inactive')) {
            $query->where('actif', true);
        }

        $plats = $query->get();

        return response()->json($plats);
    }

    /**
     * Créer un nouveau plat
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:entree,plat,dessert',
            'image_url' => 'nullable|string|max:500',
            'allergenes' => 'nullable|array',
            'allergenes.*' => 'exists:allergenes,id',
        ]);

        $plat = Plat::create($request->only([
            'nom',
            'description',
            'type',
            'image_url',
        ]));

        // Associer les allergènes
        if ($request->has('allergenes')) {
            $plat->allergenes()->attach($request->allergenes);
        }

        return response()->json([
            'message' => 'Plat créé avec succès',
            'plat' => $plat->load('allergenes'),
        ], 201);
    }

    /**
     * Afficher un plat spécifique
     */
    public function show($id)
    {
        $plat = Plat::with('allergenes', 'menus')->findOrFail($id);

        return response()->json($plat);
    }

    /**
     * Mettre à jour un plat
     */
    public function update(Request $request, $id)
    {
        $plat = Plat::findOrFail($id);

        $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|required|in:entree,plat,dessert',
            'image_url' => 'nullable|string|max:500',
            'actif' => 'sometimes|boolean',
            'allergenes' => 'nullable|array',
            'allergenes.*' => 'exists:allergenes,id',
        ]);

        $plat->update($request->only([
            'nom',
            'description',
            'type',
            'image_url',
            'actif',
        ]));

        // Mettre à jour les allergènes
        if ($request->has('allergenes')) {
            $plat->allergenes()->sync($request->allergenes);
        }

        return response()->json([
            'message' => 'Plat mis à jour avec succès',
            'plat' => $plat->load('allergenes'),
        ]);
    }

    /**
     * Supprimer un plat
     */
    public function destroy($id)
    {
        $plat = Plat::findOrFail($id);
        $plat->delete();

        return response()->json([
            'message' => 'Plat supprimé avec succès',
        ]);
    }
}
