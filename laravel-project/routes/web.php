<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\RegistroController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\LoginController;

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

Route::get('/admin/usuarios', function () {
    return Inertia::render('admin/usuarios');
});

Route::get('/recoveryPassword', function () {
    return Inertia::render('recoveryPassword');
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
