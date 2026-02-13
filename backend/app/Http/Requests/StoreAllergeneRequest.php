<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAllergeneRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => ['required', 'string', 'max:255', 'unique:allergenes,nom'],
        ];
    }

    public function messages()
    {
        return [
            'nom.required' => 'Le nom de l\'allergène est obligatoire.',
            'nom.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'nom.unique' => 'Cet allergène existe déjà.',
        ];
    }
}
