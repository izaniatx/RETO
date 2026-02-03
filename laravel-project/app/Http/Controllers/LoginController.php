<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\Rol;

class LoginController extends Controller
{
   
    public function login(Request $request)
    {
        $credentials = $request->validate([
        
        'usuario'  => ['required', 'string'],
        'password' => ['required', 'string'],
        ], [
           
            'usuario.required'  => 'El nombre de usuario es obligatorio.',
            'password.required' => 'La contraseña es obligatoria.',
        ]);

        $usuario = User::where('usuario', $credentials['usuario'])
               ->where('isDeleted', false)
               ->first();

        if (!$usuario) {
            return back()->withErrors([
                'usuario' => 'No existe este usuario',
            ]);
        }

        if (Auth::attempt(['usuario' => $credentials['usuario'], 'password' => $credentials['password']])) {
          
            $user = Auth::user();

            Log::info('Login exitoso. Usuario: ' . $user->usuario . ' - Rol ID: ' . $user->rol_id);

            $rol = Rol::find($user->rol_id);

            if ($rol) {
                Log::info('El nombre del rol es: ' . $rol->nombre);
            }

            $request->session()->regenerate();

            if ($user->rol_id == 1) {
               return redirect()->intended('/admin/usuarios');
            } else {
                return redirect()->intended('/inicio');
            }
        
            return redirect()->intended('/inicio');
        }

        return back()->withErrors([
            'usuario' => 'Usuario o contraseña incorrecta.',
        ]);
    }
}