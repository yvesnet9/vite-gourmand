<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMenuRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'titre' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'theme' => ['sometimes', 'string', 'max:50'],
            'regime' => ['sometimes', 'string', 'max:50'],
            'nb_personne_min' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'prix_base' => ['sometimes', 'numeric', 'min:0', 'max:9999.99'],
            'stock' => ['sometimes', 'integer', 'min:0'],
            'conditions' => ['nullable', 'string'],
            'actif' => ['sometimes', 'boolean'],
            'plat_ids' => ['sometimes', 'array'],
            'plat_ids.*' => ['exists:plats,id'],
        ];
    }

    public function messages()
    {
        return [
            'titre.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            'prix_base.numeric' => 'Le prix doit être un nombre.',
            'plat_ids.*.exists' => 'Un ou plusieurs plats n\'existent pas.',
        ];
    }
}
