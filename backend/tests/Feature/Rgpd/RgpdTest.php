<?php

namespace Tests\Feature\Rgpd;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Commande;
use App\Models\Avis;

class RgpdTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_export_their_data()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/rgpd/export-data');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'informations_personnelles' => [
                    'nom',
                    'prenom',
                    'email',
                    'gsm',
                    'adresse',
                ],
                'commandes',
                'avis',
            ]);
    }

    public function test_user_can_delete_account_with_correct_password()
    {
        $user = User::factory()->create([
            'password' => bcrypt('Test1234!@'),
        ]);
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/rgpd/delete-account', [
                'password' => 'Test1234!@',
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Votre compte et toutes vos données ont été supprimés avec succès.'
            ]);

        // Vérifier que l'utilisateur est supprimé
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

    public function test_user_cannot_delete_account_with_wrong_password()
    {
        $user = User::factory()->create([
            'password' => bcrypt('Test1234!@'),
        ]);
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/rgpd/delete-account', [
                'password' => 'WrongPassword',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        // Vérifier que l'utilisateur existe toujours
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
        ]);
    }

    public function test_user_can_update_consent()
    {
        $user = User::factory()->create([
            'newsletter' => false,
        ]);
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/rgpd/consent', [
                'newsletter' => true,
            ]);

        $response->assertStatus(200);

        // Vérifier que le consentement est mis à jour
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'newsletter' => true,
        ]);
    }

    public function test_guest_can_view_politique_confidentialite()
    {
        $response = $this->getJson('/api/rgpd/politique-confidentialite');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'titre',
                'date_mise_a_jour',
                'sections',
            ]);
    }

    public function test_guest_can_view_mentions_legales()
    {
        $response = $this->getJson('/api/rgpd/mentions-legales');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'titre',
                'sections',
            ]);
    }
}
