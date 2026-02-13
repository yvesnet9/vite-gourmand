<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAllergeneRequest;
use App\Http\Requests\UpdateAllergeneRequest;
use App\Models\Allergene;
use Illuminate\Http\Request;

class AllergeneController extends Controller
{
    /**
     * Liste de tous les allergènes
     */
    public function index()
    {
        $this->authorize('viewAny', Allergene::class);

        $allergenes = Allergene::orderBy('nom')->get();
        return response()->json($allergenes);
    }

    /**
     * Afficher un allergène spécifique
     */
    public function show($id)
    {
        $allergene = Allergene::findOrFail($id);
        $this->authorize('view', $allergene);

        return response()->json($allergene);
    }

    /**
     * Créer un nouvel allergène (admin)
     */
    public function store(StoreAllergeneRequest $request)
    {
        $this->authorize('create', Allergene::class);

        $allergene = Allergene::create([
            'nom' => $request->nom,
        ]);

        return response()->json($allergene, 201);
    }

    /**
     * Mettre à jour un allergène (admin)
     */
    public function update(UpdateAllergeneRequest $request, $id)
    {
        $allergene = Allergene::findOrFail($id);
        $this->authorize('update', $allergene);

        $allergene->update([
            'nom' => $request->nom,
        ]);

        return response()->json($allergene);
    }

    /**
     * Supprimer un allergène (admin)
     */
    public function destroy($id)
    {
        $allergene = Allergene::findOrFail($id);
        $this->authorize('delete', $allergene);

        $allergene->delete();

        return response()->json([
            'message' => 'Allergène supprimé avec succès'
        ]);
    }
}
