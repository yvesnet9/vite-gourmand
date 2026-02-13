<?php

namespace App\Providers;

use App\Models\Menu;
use App\Models\Plat;
use App\Models\Commande;
use App\Models\Avis;
use App\Models\Allergene;
use App\Policies\MenuPolicy;
use App\Policies\PlatPolicy;
use App\Policies\CommandePolicy;
use App\Policies\AvisPolicy;
use App\Policies\AllergenePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Menu::class => MenuPolicy::class,
        Plat::class => PlatPolicy::class,
        Commande::class => CommandePolicy::class,
        Avis::class => AvisPolicy::class,
        Allergene::class => AllergenePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
