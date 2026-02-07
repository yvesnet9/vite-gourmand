<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Allergene;
use Illuminate\Http\Request;

class AllergeneController extends Controller
{
    /**
     * Liste tous les allergènes
     */
    public function index()
    {
        $allergenes = Allergene::all();

        return response()->json($allergenes);
    }

    /**
     * Créer un nouvel allergène
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:100|unique:allergenes,nom',
            'icone' => 'nullable|string|max:50',
        ]);

        $allergene = Allergene::create($request->only([
            'nom',
            'icone',
        ]));

        return response()->json([
            'message' => 'Allergène créé avec succès',
            'allergene' => $allergene,
        ], 201);
    }

    /**
     * Afficher un allergène spécifique
     */
    public function show($id)
    {
        $allergene = Allergene::with('plats')->findOrFail($id);

        return response()->json($allergene);
    }

    /**
     * Mettre à jour un allergène
     */
    public function update(Request $request, $id)
    {
        $allergene = Allergene::findOrFail($id);

        $request->validate([
            'nom' => 'sometimes|required|string|max:100|unique:allergenes,nom,' . $id,
            'icone' => 'nullable|string|max:50',
        ]);

        $allergene->update($request->only([
            'nom',
            'icone',
        ]));

        return response()->json([
            'message' => 'Allergène mis à jour avec succès',
            'allergene' => $allergene,
        ]);
    }

    /**
     * Supprimer un allergène
     */
    public function destroy($id)
    {
        $allergene = Allergene::findOrFail($id);
        $allergene->delete();

        return response()->json([
            'message' => 'Allergène supprimé avec succès',
        ]);
    }
}
