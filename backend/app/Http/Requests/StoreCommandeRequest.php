<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommandeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
{
    return [
        'menu_id' => ['required', 'exists:menus,id'],
        'nb_personnes' => ['required', 'integer', 'min:1', 'max:100'],
        'date_prestation' => ['required', 'date', 'after:today'],
        'heure_prestation' => ['required', 'date_format:H:i'],
        'adresse_livraison' => ['required', 'string', 'max:500'],
        'ville_livraison' => ['required', 'string', 'max:100'],
        'code_postal' => ['required', 'string', 'max:10'],
        'pret_materiel' => ['nullable', 'boolean'],
        'distance_km' => ['nullable', 'numeric', 'min:0'],
        'instructions' => ['nullable', 'string', 'max:1000'],
    ];
}    






    public function messages()
{
    return [
        'menu_id.required' => 'Le menu est obligatoire.',
        'menu_id.exists' => 'Ce menu n\'existe pas.',
        'nb_personnes.required' => 'Le nombre de personnes est obligatoire.',
        'nb_personnes.integer' => 'Le nombre de personnes doit être un entier.',
        'nb_personnes.min' => 'Le minimum est 1 personne.',
        'nb_personnes.max' => 'Le maximum est 100 personnes.',
        'date_prestation.required' => 'La date de prestation est obligatoire.',
        'date_prestation.after' => 'La date doit être dans le futur.',
        'heure_prestation.required' => 'L\'heure de prestation est obligatoire.',
        'heure_prestation.date_format' => 'Le format de l\'heure est invalide (HH:MM).',
        'adresse_livraison.required' => 'L\'adresse de livraison est obligatoire.',
        'ville_livraison.required' => 'La ville est obligatoire.',
        'code_postal.required' => 'Le code postal est obligatoire.',
    ];
}
}
