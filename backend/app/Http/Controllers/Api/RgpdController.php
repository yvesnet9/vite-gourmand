<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RgpdController extends Controller
{
    /**
     * Télécharger toutes les données personnelles de l'utilisateur (export JSON)
     */
    public function exportData(Request $request)
    {
        $user = $request->user();

        // Récupérer toutes les données de l'utilisateur
        $userData = [
            'informations_personnelles' => [
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'gsm' => $user->gsm,
                'adresse' => $user->adresse,
                'role' => $user->role,
                'date_inscription' => $user->created_at,
                'consentement_rgpd' => $user->consentement_rgpd,
                'date_consentement' => $user->date_consentement,
                'newsletter' => $user->newsletter,
            ],
            'commandes' => $user->commandes()->with('menu.plats.allergenes')->get(),
            'avis' => $user->avis()->with('commande.menu')->get(),
        ];

        return response()->json($userData, 200, [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="mes-donnees-' . $user->id . '.json"',
        ]);
    }

    /**
     * Supprimer le compte utilisateur et toutes ses données
     */
    public function deleteAccount(Request $request)
    {
        // Validation du mot de passe pour confirmer la suppression
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        // Vérifier le mot de passe
        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['Le mot de passe est incorrect.'],
            ]);
        }

        // Supprimer toutes les données associées
        // Les avis et commandes seront supprimés automatiquement si cascade est configuré
        // Sinon, il faut les supprimer manuellement
        $user->avis()->delete();
        $user->commandes()->delete();
        $user->tokens()->delete(); // Supprimer tous les tokens d'authentification

        // Supprimer l'utilisateur
        $user->delete();

        return response()->json([
            'message' => 'Votre compte et toutes vos données ont été supprimés avec succès.'
        ], 200);
    }

    /**
     * Modifier le consentement RGPD (newsletter, etc.)
     */
    public function updateConsent(Request $request)
    {
        $request->validate([
            'newsletter' => 'required|boolean',
        ]);

        $user = $request->user();

        $user->update([
            'newsletter' => $request->newsletter,
        ]);

        return response()->json([
            'message' => 'Vos préférences ont été mises à jour.',
            'user' => $user,
        ]);
    }

    /**
     * Afficher la politique de confidentialité (texte)
     */
    public function politiqueConfidentialite()
    {
        $politique = [
            'titre' => 'Politique de Confidentialité - Vite & Gourmand',
            'date_mise_a_jour' => '2024-02-13',
            'sections' => [
                [
                    'titre' => '1. Collecte des données',
                    'contenu' => 'Nous collectons les données personnelles suivantes : nom, prénom, email, numéro de téléphone, adresse de livraison. Ces données sont nécessaires pour traiter vos commandes et vous contacter.',
                ],
                [
                    'titre' => '2. Utilisation des données',
                    'contenu' => 'Vos données sont utilisées uniquement pour : traiter vos commandes, vous contacter concernant vos commandes, améliorer nos services, vous envoyer notre newsletter (avec votre consentement).',
                ],
                [
                    'titre' => '3. Conservation des données',
                    'contenu' => 'Vos données sont conservées pendant toute la durée de votre compte actif. En cas de suppression de compte, toutes vos données sont définitivement supprimées.',
                ],
                [
                    'titre' => '4. Vos droits',
                    'contenu' => 'Conformément au RGPD, vous disposez des droits suivants : droit d\'accès à vos données, droit de rectification, droit à l\'effacement (droit à l\'oubli), droit à la portabilité de vos données, droit d\'opposition au traitement.',
                ],
                [
                    'titre' => '5. Sécurité',
                    'contenu' => 'Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte ou destruction.',
                ],
                [
                    'titre' => '6. Contact',
                    'contenu' => 'Pour toute question concernant vos données personnelles, vous pouvez nous contacter à : contact@vite-gourmand.fr',
                ],
            ],
        ];

        return response()->json($politique);
    }

    /**
     * Afficher les mentions légales
     */
    public function mentionsLegales()
    {
        $mentions = [
            'titre' => 'Mentions Légales - Vite & Gourmand',
            'sections' => [
                [
                    'titre' => 'Éditeur du site',
                    'contenu' => 'Vite & Gourmand\nAdresse : [À compléter]\nTéléphone : [À compléter]\nEmail : contact@vite-gourmand.fr',
                ],
                [
                    'titre' => 'Hébergeur',
                    'contenu' => '[Nom de l\'hébergeur]\n[Adresse]\n[Contact]',
                ],
                [
                    'titre' => 'Propriété intellectuelle',
                    'contenu' => 'Tout le contenu du site Vite & Gourmand est protégé par le droit d\'auteur. Toute reproduction est interdite sans autorisation.',
                ],
            ],
        ];

        return response()->json($mentions);
    }
}
