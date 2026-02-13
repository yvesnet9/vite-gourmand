<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCommandeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'statut' => ['sometimes', 'in:en_attente,confirmee,en_preparation,livree,annulee'],
        ];
    }

    public function messages()
    {
        return [
            'statut.in' => 'Le statut doit être: en_attente, confirmée, en_preparation, livrée ou annulée.',
        ];
    }
}
