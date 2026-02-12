<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Gate;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'usuario' => $request->user()->usuario,
                    // AÑADE ESTOS CAMPOS:
                    'nombre' => $request->user()->nombre,
                    'apellido' => $request->user()->apellido,
                    'email' => $request->user()->email,
                    'telefono' => $request->user()->telefono,
                    
                    'can_access_admin' => Gate::allows('admin-access'), 
                    'is_client' => Gate::allows('client-access'),
                    'gestor_ventas' => Gate::allows('gestor_ventas'),
                    'gestor_compras' => Gate::allows('gestor_compras'),
                ] : null,
            ],
        ]);
    }
}
