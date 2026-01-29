<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\RegistroController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuariosController;

/*Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');*/

Route::get('/', function () {
    return Inertia::render('landingpage');
});

Route::get('/registro', function () {
    return Inertia::render('registro');
});

Route::get('/catalogo', function () {
    return Inertia::render('catalogo');
});

Route::post('/registro', [RegistroController::class, 'registrar']);
Route::get('/inicio', [RegistroController::class, 'inicio'])->name('inicio');


Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/dashboard');
});

Route::get('/admin/usuarios', [UsuariosController::class, 'getUsuarios']);

Route::post('/admin/usuarios/delete', [UsuariosController::class, 'deleteUsuario']);

Route::post('/admin/usuarios/active', [UsuariosController::class, 'activeUsuario']);

Route::post('/admin/usuarios/create', [UsuariosController::class, 'createUsuario']);

Route::put('/admin/usuarios/{id}', [UsuariosController::class, 'modifyUsuario']);

Route::get('/admin/mensajes', function () {
    return Inertia::render('admin/mensajes');
});

Route::get('/recoveryPassword', function () {
    return Inertia::render('recoveryPassword');
});

Route::get('/contacto', function () {
    return Inertia::render('contacto');
});

Route::get('/dondeEncontrarnos', function () {
    return Inertia::render('dondeEncontrarnos');
});

Route::get('/vendeTuCoche', function () {
    return Inertia::render('vendeTuCoche');
});

Route::get('/email/verify', function () {
    return inertia('Auth/VerifyEmail'); 
})->middleware('auth')->name('verification.notice');


Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/inicio');
})->middleware(['auth', 'signed'])->name('verification.verify');




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::post('/login', [LoginController::class, 'login'])->name('login');

require __DIR__.'/settings.php';
