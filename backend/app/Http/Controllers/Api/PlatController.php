<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePlatRequest;
use App\Http\Requests\UpdatePlatRequest;
use App\Models\Plat;
use Illuminate\Http\Request;

class PlatController extends Controller
{
    /**
     * Liste de tous les plats
     */
    public function index()
    {
        // Public access

        $plats = Plat::with('allergenes')->get();
        return response()->json($plats);
    }

    /**
     * Afficher un plat spécifique
     */
    public function show($id)
    {
        $plat = Plat::with('allergenes')->findOrFail($id);
        // Public access

        return response()->json($plat);
    }

    /**
     * Créer un nouveau plat (admin/employé)
     */
    public function store(StorePlatRequest $request)
    {
        // Public access

        $plat = Plat::create([
            'nom' => $request->nom,
            'description' => $request->description,
            'type' => $request->type,
        ]);

        if ($request->has('allergene_ids')) {
            $plat->allergenes()->attach($request->allergene_ids);
        }

        return response()->json($plat->load('allergenes'), 201);
    }

    /**
     * Mettre à jour un plat (admin/employé)
     */
    public function update(UpdatePlatRequest $request, $id)
    {
        $plat = Plat::findOrFail($id);
        // Public access

        $plat->update($request->only([
            'nom',
            'description',
            'type'
        ]));

        if ($request->has('allergene_ids')) {
            $plat->allergenes()->sync($request->allergene_ids);
        }

        return response()->json($plat->load('allergenes'));
    }

    /**
     * Supprimer un plat (admin uniquement)
     */
    public function destroy($id)
    {
        $plat = Plat::findOrFail($id);
        // Public access

        $plat->delete();

        return response()->json([
            'message' => 'Plat supprimé avec succès'
        ]);
    }
}
