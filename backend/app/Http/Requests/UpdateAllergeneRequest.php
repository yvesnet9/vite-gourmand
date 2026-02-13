<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAllergeneRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => ['sometimes', 'string', 'max:255', Rule::unique('allergenes')->ignore($this->allergene)],
        ];
    }

    public function messages()
    {
        return [
            'nom.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'nom.unique' => 'Cet allergène existe déjà.',
        ];
    }
}
