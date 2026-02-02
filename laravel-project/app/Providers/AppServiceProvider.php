<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('admin-access', function (User $user) {
            return $user->rol_id === 1;
        });
        Gate::define('client-access', function (User $user) {
            return $user->rol_id === 2;
        });

        Gate::define('gestor_ventas', function (User $user) {
            return $user->rol_id === 3;
        });
        Gate::define('gestor_compras', function (User $user) {
            return $user->rol_id === 4;
        });
    }
}
