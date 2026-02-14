<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test inscription réussie avec consentement RGPD
     */
   public function test_user_can_register_with_valid_data()
{
    $response = $this->postJson('/api/register', [
        'nom' => 'Dupont',
        'prenom' => 'Jean',
        'email' => 'jean.dupont@example.com',
        'password' => 'Test1234!@',
        'password_confirmation' => 'Test1234!@',
        'gsm' => '0612345678',
        'adresse' => '123 Rue de Paris, 75001 Paris',
        'consentement_rgpd' => true,
    ]);

    // DIAGNOSTIC - AJOUTEZ CES 3 LIGNES


    $response->assertStatus(201)
        ->assertJsonStructure([
            'message',
            'user' => [
                'id',
                'nom',
                'prenom',
                'email',
                'gsm',
                'adresse',
                'role',
                'consentement_rgpd',
                'date_consentement',
            ],
            'token',
        ]);

    // Reste du code...

        // Vérifier que l'utilisateur est bien créé en base
        $this->assertDatabaseHas('users', [
            'email' => 'jean.dupont@example.com',
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'consentement_rgpd' => true,
        ]);
    }

    /**
     * Test inscription échouée sans consentement RGPD
     */
    public function test_user_cannot_register_without_rgpd_consent()
    {
        $response = $this->postJson('/api/register', [
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'email' => 'jean.dupont@example.com',
            'password' => 'Test1234!@',
            'password_confirmation' => 'Test1234!@',
            'gsm' => '0612345678',
            'adresse' => '123 Rue de Paris, 75001 Paris',
            'consentement_rgpd' => false,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['consentement_rgpd']);
    }

    /**
     * Test inscription échouée avec email déjà existant
     */
    public function test_user_cannot_register_with_existing_email()
    {
        // Créer un utilisateur existant
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $response = $this->postJson('/api/register', [
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'email' => 'existing@example.com',
            'password' => 'Test1234!@',
            'password_confirmation' => 'Test1234!@',
            'gsm' => '0612345678',
            'adresse' => '123 Rue de Paris, 75001 Paris',
            'consentement_rgpd' => true,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test inscription échouée avec mot de passe faible
     */
    public function test_user_cannot_register_with_weak_password()
    {
        $response = $this->postJson('/api/register', [
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'email' => 'jean.dupont@example.com',
            'password' => 'weak',
            'password_confirmation' => 'weak',
            'gsm' => '0612345678',
            'adresse' => '123 Rue de Paris, 75001 Paris',
            'consentement_rgpd' => true,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test inscription échouée avec mots de passe non correspondants
     */
    public function test_user_cannot_register_with_mismatched_passwords()
    {
        $response = $this->postJson('/api/register', [
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'email' => 'jean.dupont@example.com',
            'password' => 'Test1234!@',
            'password_confirmation' => 'Different1234!@',
            'gsm' => '0612345678',
            'adresse' => '123 Rue de Paris, 75001 Paris',
            'consentement_rgpd' => true,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test inscription échouée avec téléphone invalide
     */
    public function test_user_cannot_register_with_invalid_phone()
    {
        $response = $this->postJson('/api/register', [
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'email' => 'jean.dupont@example.com',
            'password' => 'Test1234!@',
            'password_confirmation' => 'Test1234!@',
            'gsm' => '123', // Invalide
            'adresse' => '123 Rue de Paris, 75001 Paris',
            'consentement_rgpd' => true,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['gsm']);
    }
}
