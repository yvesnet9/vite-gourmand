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
            'quantite' => ['required', 'integer', 'min:1', 'max:100'],
            'date_livraison' => ['required', 'date', 'after:today'],
            'heure_livraison' => ['required', 'date_format:H:i'],
            'adresse_livraison' => ['required', 'string', 'max:500'],
            'instructions' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages()
    {
        return [
            'menu_id.required' => 'Le menu est obligatoire.',
            'menu_id.exists' => 'Ce menu n\'existe pas.',
            'quantite.required' => 'La quantité est obligatoire.',
            'quantite.integer' => 'La quantité doit être un nombre entier.',
            'quantite.min' => 'La quantité minimale est 1.',
            'quantite.max' => 'La quantité maximale est 100.',
            'date_livraison.required' => 'La date de livraison est obligatoire.',
            'date_livraison.after' => 'La date de livraison doit être dans le futur.',
            'heure_livraison.required' => 'L\'heure de livraison est obligatoire.',
            'heure_livraison.date_format' => 'Le format de l\'heure est invalide (HH:MM).',
            'adresse_livraison.required' => 'L\'adresse de livraison est obligatoire.',
            'adresse_livraison.max' => 'L\'adresse ne peut pas dépasser 500 caractères.',
            'instructions.max' => 'Les instructions ne peuvent pas dépasser 1000 caractères.',
        ];
    }
}
