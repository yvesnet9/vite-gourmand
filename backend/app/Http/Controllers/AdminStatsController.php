<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\UTCDateTime;

class AdminStatsController extends Controller
{
    public function commandesParMenu(Request $request)
    {
       if (! $request->user()?->isAdmin()) {
            abort(403, 'Accès réservé aux administrateurs.');
        }
        $match = [];

        if ($request->filled('menu_id')) {
            $match['menu_id'] = (int) $request->input('menu_id');
        }

        if ($request->filled('date_debut') || $request->filled('date_fin')) {
            $periode = [];
            if ($request->filled('date_debut')) {
                $periode['$gte'] = new UTCDateTime(new \DateTime($request->input('date_debut')));
            }
            if ($request->filled('date_fin')) {
                $periode['$lte'] = new UTCDateTime(new \DateTime($request->input('date_fin') . ' 23:59:59'));
            }
            $match['date_commande'] = $periode;
        }

        $pipeline = [];
        if (!empty($match)) {
            $pipeline[] = ['$match' => $match];
        }
        $pipeline[] = ['$group' => [
            '_id'              => '$menu_id',
            'menu_titre'       => ['$first' => '$menu_titre'],
            'nb_commandes'     => ['$sum' => 1],
            'chiffre_affaires' => ['$sum' => '$montant'],
        ]];
        $pipeline[] = ['$sort' => ['chiffre_affaires' => -1]];

        $resultats = DB::connection('mongodb')
            ->getMongoClient()
            ->selectDatabase('vite_gourmand_stats')
            ->selectCollection('commandes_stats')
            ->aggregate($pipeline)
            ->toArray();

        $data = array_map(fn ($doc) => [
            'menu_id'          => $doc['_id'],
            'menu_titre'       => $doc['menu_titre'] ?? null,
            'nb_commandes'     => $doc['nb_commandes'],
            'chiffre_affaires' => round($doc['chiffre_affaires'], 2),
        ], $resultats);

        return response()->json($data);
    }
}
