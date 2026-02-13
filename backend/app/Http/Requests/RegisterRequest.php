<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'gsm' => ['required', 'string', 'regex:/^[0-9]{10}$/', 'unique:users'],
            'adresse' => ['required', 'string'],
            'password' => ['required', 'confirmed', Password::min(10)
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised()],
            'consentement_rgpd' => ['required', 'accepted'],
        ];
    }

    public function messages()
    {
        return [
            'nom.required' => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'email.unique' => 'Cet email est déjà utilisé.',
            'gsm.required' => 'Le numéro de téléphone est obligatoire.',
            'gsm.regex' => 'Le téléphone doit contenir 10 chiffres.',
            'gsm.unique' => 'Ce numéro de téléphone est déjà utilisé.',
            'adresse.required' => 'L\'adresse est obligatoire.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min' => 'Le mot de passe doit contenir au moins 10 caractères.',
            'consentement_rgpd.required' => 'Vous devez accepter la politique de confidentialité.',
            'consentement_rgpd.accepted' => 'Vous devez accepter la politique de confidentialité.',
        ];
    }
}
