<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Autorise uniquement les utilisateurs ayant l'un des rôles passés.
     * Usage : ->middleware('role:administrateur,employe')
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user || ! in_array($user->role, $roles, true)) {
            abort(403, 'Accès réservé : rôle insuffisant.');
        }

        return $next($request);
    }
}
