<?php

namespace Tests\Feature\Menu;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Menu;
use App\Models\Plat;

class MenuTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_menus()
    {
        Menu::factory()->count(3)->create();

        $response = $this->getJson('/api/menus');

        $response->assertStatus(200);
    }

    public function test_admin_can_create_menu()
    {
        $admin = User::factory()->admin()->create();
        $plats = Plat::factory()->count(3)->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/admin/menus', [
                'titre' => 'Menu Test',
                'description' => 'Description du menu',
                'theme' => 'végétarien',
                'regime' => 'végétarien',
                'nb_personne_min' => 4,
                'prix_base' => 25.50,
                'stock' => 50,
                'actif' => true,
                'plat_ids' => $plats->pluck('id')->toArray(),
            ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('menus', ['titre' => 'Menu Test']);
    }

    public function test_regular_user_cannot_create_menu()
    {
        $user = User::factory()->create();
        $plats = Plat::factory()->count(3)->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/admin/menus', [
                'titre' => 'Menu Test',
                'description' => 'Description',
                'theme' => 'végétarien',
                'regime' => 'normal',
                'nb_personne_min' => 4,
                'prix_base' => 25.50,
                'stock' => 50,
                'plat_ids' => $plats->pluck('id')->toArray(),
            ]);

        $response->assertStatus(403);
    }
}
