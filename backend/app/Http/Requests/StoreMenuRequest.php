<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'titre' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'theme' => ['required', 'string', 'max:50'],
            'regime' => ['required', 'string', 'max:50'],
            'nb_personne_min' => ['required', 'integer', 'min:1', 'max:100'],
            'prix_base' => ['required', 'numeric', 'min:0', 'max:9999.99'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'conditions' => ['nullable', 'string'],
            'actif' => ['boolean'],
            'plat_ids' => ['nullable', 'array'],
            'plat_ids.*' => ['exists:plats,id'],
        ];
    }

    public function messages()
    {
        return [
            'titre.required' => 'Le titre est obligatoire.',
            'description.required' => 'La description est obligatoire.',
            'theme.required' => 'Le thème est obligatoire.',
            'regime.required' => 'Le régime est obligatoire.',
            'nb_personne_min.required' => 'Le nombre minimum de personnes est obligatoire.',
            'prix_base.required' => 'Le prix de base est obligatoire.',
            'prix_base.numeric' => 'Le prix doit être un nombre.',
            'plat_ids.*.exists' => 'Un ou plusieurs plats n\'existent pas.',
        ];
    }
}
