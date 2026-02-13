<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlatRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'type' => ['required', 'in:entree,plat,dessert'],
            'allergene_ids' => ['nullable', 'array'],
            'allergene_ids.*' => ['exists:allergenes,id'],
        ];
    }

    public function messages()
    {
        return [
            'nom.required' => 'Le nom du plat est obligatoire.',
            'nom.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'description.required' => 'La description est obligatoire.',
            'description.max' => 'La description ne peut pas dépasser 1000 caractères.',
            'type.required' => 'Le type de plat est obligatoire.',
            'type.in' => 'Le type doit être: entrée, plat ou dessert.',
            'allergene_ids.array' => 'Le format des allergènes est invalide.',
            'allergene_ids.*.exists' => 'Un ou plusieurs allergènes n\'existent pas.',
        ];
    }
}
