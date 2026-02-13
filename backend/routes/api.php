<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\PlatController;
use App\Http\Controllers\Api\AllergeneController;
use App\Http\Controllers\Api\CommandeController;
use App\Http\Controllers\Api\SuiviCommandeController;
use App\Http\Controllers\Api\AvisController;
use App\Http\Controllers\Api\RgpdController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques - Authentification (rate limit strict : 5 tentatives/minute)
Route::middleware(['throttle:login'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Routes publiques - Lecture seule (rate limit : 60 requêtes/minute)
Route::middleware(['throttle:api'])->group(function () {
    // Menus
    Route::get('/menus', [MenuController::class, 'index']);
    Route::get('/menus/{id}', [MenuController::class, 'show']);

    // Plats
    Route::get('/plats', [PlatController::class, 'index']);
    Route::get('/plats/{id}', [PlatController::class, 'show']);

    // Allergènes
    Route::get('/allergenes', [AllergeneController::class, 'index']);
    Route::get('/allergenes/{id}', [AllergeneController::class, 'show']);

    // Avis validés
    Route::get('/avis', [AvisController::class, 'index']);
    Route::get('/avis/{id}', [AvisController::class, 'show']);

    // RGPD - Routes publiques
    Route::get('/rgpd/politique-confidentialite', [RgpdController::class, 'politiqueConfidentialite']);
    Route::get('/rgpd/mentions-legales', [RgpdController::class, 'mentionsLegales']);
});

// Routes protégées - Authentification requise
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {

    // Route de test
    Route::post('/test', function() {
        return response()->json(['message' => 'Test réussi !']);
    });

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Gestion des commandes (utilisateurs authentifiés)
    Route::apiResource('commandes', CommandeController::class);

    // Suivi des commandes
    Route::get('/commandes/{commande_id}/suivis', [SuiviCommandeController::class, 'index']);
    Route::post('/commandes/{commande_id}/suivis', [SuiviCommandeController::class, 'store']);

    // Gestion des avis (création uniquement pour les utilisateurs)
    Route::post('/avis', [AvisController::class, 'store']);
    Route::put('/avis/{id}', [AvisController::class, 'update']);
    Route::delete('/avis/{id}', [AvisController::class, 'destroy']);

    // RGPD - Routes protégées
    Route::get('/rgpd/export-data', [RgpdController::class, 'exportData']);
    Route::delete('/rgpd/delete-account', [RgpdController::class, 'deleteAccount']);
    Route::put('/rgpd/consent', [RgpdController::class, 'updateConsent']);
});

// Routes Admin/Employé (rate limit plus élevé : 100 requêtes/minute)
Route::middleware(['auth:sanctum', 'throttle:admin'])->prefix('admin')->group(function () {

    // CRUD complet pour les menus
    Route::get('/menus', [MenuController::class, 'index']);
    Route::post('/menus', [MenuController::class, 'store']);
    Route::get('/menus/{id}', [MenuController::class, 'show']);
    Route::put('/menus/{id}', [MenuController::class, 'update']);
    Route::delete('/menus/{id}', [MenuController::class, 'destroy']);

    // CRUD complet pour les plats
    Route::get('/plats', [PlatController::class, 'index']);
    Route::post('/plats', [PlatController::class, 'store']);
    Route::get('/plats/{id}', [PlatController::class, 'show']);
    Route::put('/plats/{id}', [PlatController::class, 'update']);
    Route::delete('/plats/{id}', [PlatController::class, 'destroy']);

    // CRUD complet pour les allergènes
    Route::get('/allergenes', [AllergeneController::class, 'index']);
    Route::post('/allergenes', [AllergeneController::class, 'store']);
    Route::get('/allergenes/{id}', [AllergeneController::class, 'show']);
    Route::put('/allergenes/{id}', [AllergeneController::class, 'update']);
    Route::delete('/allergenes/{id}', [AllergeneController::class, 'destroy']);

    // Avis en attente de validation
    Route::get('/avis/pending', [AvisController::class, 'pending']);
    Route::put('/avis/{id}', [AvisController::class, 'update']);
    Route::delete('/avis/{id}', [AvisController::class, 'destroy']);
});
