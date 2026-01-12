<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\RegistroController;

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

Route::post('/registro', [RegistroController::class, 'registrar']);
Route::get('/inicio', [RegistroController::class, 'inicio'])->name('inicio');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
