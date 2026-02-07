<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\PlatController;
use App\Http\Controllers\Api\AllergeneController;

// Routes publiques - Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes publiques - Menus (consultation)
Route::get('/menus', [MenuController::class, 'index']);
Route::get('/menus/{id}', [MenuController::class, 'show']);

// Routes publiques - Allergènes (consultation)
Route::get('/allergenes', [AllergeneController::class, 'index']);

// Routes protégées - Authentification
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Gestion des menus (employé/admin)
    Route::post('/menus', [MenuController::class, 'store']);
    Route::put('/menus/{id}', [MenuController::class, 'update']);
    Route::delete('/menus/{id}', [MenuController::class, 'destroy']);

    // Gestion des plats (employé/admin)
    Route::apiResource('plats', PlatController::class);

    // Gestion des allergènes (employé/admin)
    Route::post('/allergenes', [AllergeneController::class, 'store']);
    Route::put('/allergenes/{id}', [AllergeneController::class, 'update']);
    Route::delete('/allergenes/{id}', [AllergeneController::class, 'destroy']);
});
