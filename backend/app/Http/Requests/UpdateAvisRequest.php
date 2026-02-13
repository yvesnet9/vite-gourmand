<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAvisRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'valide' => ['required', 'boolean'],
        ];
    }

    public function messages()
    {
        return [
            'valide.required' => 'La validation est obligatoire.',
            'valide.boolean' => 'La validation doit être true ou false.',
        ];
    }
}
