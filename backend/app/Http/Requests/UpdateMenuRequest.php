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
            'description' => ['sometimes', 'string', 'max:1000'],
            'prix' => ['sometimes', 'numeric', 'min:0', 'max:9999.99'],
            'date_debut' => ['sometimes', 'date'],
            'date_fin' => ['sometimes', 'date', 'after:date_debut'],
            'actif' => ['sometimes', 'boolean'],
            'plat_ids' => ['sometimes', 'array', 'min:1'],
            'plat_ids.*' => ['exists:plats,id'],
        ];
    }

    public function messages()
    {
        return [
            'titre.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            'description.max' => 'La description ne peut pas dépasser 1000 caractères.',
            'prix.numeric' => 'Le prix doit être un nombre.',
            'prix.min' => 'Le prix doit être positif.',
            'prix.max' => 'Le prix ne peut pas dépasser 9999.99.',
            'date_fin.after' => 'La date de fin doit être après la date de début.',
            'plat_ids.array' => 'Le format des plats est invalide.',
            'plat_ids.*.exists' => 'Un ou plusieurs plats n\'existent pas.',
        ];
    }
}
