<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // o el modelo que uses para usuarios
use Inertia\Inertia;

class RegistroController extends Controller
{
    // Método que crea el usuario
    public function registrar(Request $request)
    {
        $user = User::create([
            'usuario' => $request->usuario,
            'nombre' => $request->firstName,
            'apellido' => $request->lastName,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'password' => bcrypt($request->contrasenya),
            'rol_id' => 1,
            
        ]);
    
        return Inertia::location(route('inicio'));
    }

    public function inicio()
    {
        return Inertia::render('inicio');
    }
}
