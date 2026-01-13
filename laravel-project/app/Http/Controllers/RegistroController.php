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

        $exists = User::where('usuario', $request->usuario)->exists();

        if ($exists) {
            return redirect()->back()->withErrors([
                'usuario' => 'Este nombre de usuario ya existe',
            ])->withInput();
        }

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
