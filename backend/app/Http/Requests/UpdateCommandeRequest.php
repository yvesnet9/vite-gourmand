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
            'statut' => ['sometimes', 'in:en_attente,accepte,en_preparation,en_cours_livraison,livre,en_attente_retour_materiel,terminee,annulee'],
        ];
    }

    public function messages()
    {
        return [
            'statut.in' => 'Statut invalide. Valeurs autorisees : en_attente, accepte, en_preparation, en_cours_livraison, livre, en_attente_retour_materiel, terminee, annulee.',
        ];
    }
}
