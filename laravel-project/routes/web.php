<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\VehiculosController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
*/

Route::get('/', fn () => Inertia::render('landingpage'));

Route::get('/catalogo', fn () => Inertia::render('catalogo'));
Route::get('/contacto', fn () => Inertia::render('contacto'));
Route::get('/dondeEncontrarnos', fn () => Inertia::render('dondeEncontrarnos'));
Route::get('/vendeTuCoche', fn () => Inertia::render('vendeTuCoche'));


Route::post('/registro', [RegistroController::class, 'registrar']);
Route::get('/inicio', [RegistroController::class, 'inicio'])->name('inicio');

Route::get('/catalogo', function () {
    return Inertia::render('catalogo');
});


Route::post('/login', [LoginController::class, 'login'])->name('login');

Route::get('/recoveryPassword', fn () => Inertia::render('recoveryPassword'));

Route::get('/UserProfile', [UsuariosController::class, 'usuarioLogueado'])->name('perfil');
Route::put('/UserProfile/{id}', [UsuariosController::class, 'modificarPerfil']);
/*
|--------------------------------------------------------------------------
| EMAIL VERIFICATION
|--------------------------------------------------------------------------
*/

Route::get('/email/verify', fn () => inertia('Auth/VerifyEmail'))
    ->middleware('auth')
    ->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/inicio');
})->middleware(['auth', 'signed'])->name('verification.verify');

/*
|--------------------------------------------------------------------------
| ZONA USUARIO (AUTH + VERIFIED)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::get('/inicio', [RegistroController::class, 'inicio'])->name('inicio');

    Route::get('/dashboard', fn () => Inertia::render('dashboard'))
        ->name('dashboard');
});


/*
|--------------------------------------------------------------------------
| INVENTARIO / VEHÍCULOS
|--------------------------------------------------------------------------
*/


Route::prefix('inventario')->group(function () {
    Route::get('/coches', [VehiculosController::class, 'getVehiculos'])->name('inventario.index');
    Route::post('/coches/delete', [VehiculosController::class, 'deleteVehiculo']);
    Route::post('/coches/active', [VehiculosController::class, 'activeVehiculo']);
    Route::post('/coches/create', [VehiculosController::class, 'createVehiculo']);
});


/*
|--------------------------------------------------------------------------
| ZONA ADMIN
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {

    Route::get('/dashboard', fn () => Inertia::render('admin/dashboard'));

    Route::get('/mensajes', fn () => Inertia::render('admin/mensajes'));

    /*
    |-----------------------
    | Usuarios
    |-----------------------
    */

    Route::get('/usuarios', [UsuariosController::class, 'getUsuarios'])->name('usuarios.index');
    Route::post('/usuarios/create', [UsuariosController::class, 'createUsuario']);
    Route::post('/usuarios/delete', [UsuariosController::class, 'deleteUsuario']);
    Route::post('/usuarios/active', [UsuariosController::class, 'activeUsuario']);
    Route::put('/usuarios/{id}', [UsuariosController::class, 'modifyUsuario']);
});


Route::post('/logout', function (Request $request) {
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
})->middleware('auth');

/*
|--------------------------------------------------------------------------
| OTROS
|--------------------------------------------------------------------------
*/

require __DIR__ . '/settings.php';

