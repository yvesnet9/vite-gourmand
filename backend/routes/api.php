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

// Route de test
Route::middleware('auth:sanctum')->post('/test', function() {
    return response()->json(['message' => 'Test réussi !']);
});
// Routes publiques - Avis (consultation)
Route::get('/avis', [AvisController::class, 'index']);
Route::get('/avis/{id}', [AvisController::class, 'show']);

// Routes publiques - Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Routes publiques - Menus (consultation)
Route::get('/menus', [MenuController::class, 'index']);
Route::get('/menus/{id}', [MenuController::class, 'show']);

// Routes publiques - Plats (consultation)
Route::get('/plats', [PlatController::class, 'index']);
Route::get('/plats/{id}', [PlatController::class, 'show']);

// Routes publiques - Allergènes (consultation)
Route::get('/allergenes', [AllergeneController::class, 'index']);
Route::get('/allergenes/{id}', [AllergeneController::class, 'show']);

// Routes protégées - Authentification
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Gestion des menus (employé/admin)
    Route::post('/menus', [MenuController::class, 'store']);
    Route::put('/menus/{id}', [MenuController::class, 'update']);
    Route::delete('/menus/{id}', [MenuController::class, 'destroy']);

    // Gestion des plats (employé/admin)
    Route::post('/plats', [PlatController::class, 'store']);
    Route::put('/plats/{id}', [PlatController::class, 'update']);
    Route::delete('/plats/{id}', [PlatController::class, 'destroy']);

    // Gestion des allergènes (employé/admin)
    Route::post('/allergenes', [AllergeneController::class, 'store']);
    Route::put('/allergenes/{id}', [AllergeneController::class, 'update']);
    Route::delete('/allergenes/{id}', [AllergeneController::class, 'destroy']);
    // Gestion des commandes (utilisateurs authentifiés)
    Route::apiResource('commandes', CommandeController::class);

    // Suivi des commandes
    Route::get('/commandes/{commande_id}/suivis', [SuiviCommandeController::class, 'index']);
    Route::post('/commandes/{commande_id}/suivis', [SuiviCommandeController::class, 'store']);

    // Gestion des avis (création et gestion)
    Route::apiResource('avis', AvisController::class)->except(['index', 'show']);
});
