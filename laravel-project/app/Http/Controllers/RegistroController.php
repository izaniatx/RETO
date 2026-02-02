<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered; 
use Illuminate\Support\Facades\Auth;

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

        $request->validate([
            'firstName'    => ['required', 'string', 'regex:/^[A-Z]/'], 
            'lastName'     => ['required', 'string', 'regex:/^[A-Z]/'],
            'email'        => ['required', 'email', 'unique:users,email'],
            'usuario'      => ['required', 'string', 'unique:users,usuario'],
            'telefono'     => ['required', 'min:9'],
            'contrasenya'  => ['required', 'min:8', 'regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/'], 
            'contrasenya2' => ['required', 'same:contrasenya'], 
            ], [
                
                'firstName.required'   => 'El nombre es obligatorio.',
                'lastName.required'    => 'El apellido es obligatorio.',
                'email.required'       => 'El email es obligatorio.',
                'usuario.required'     => 'El nombre de usuario es obligatorio.',
                'contrasenya.required' => 'La contraseña es obligatoria.',
                'telefono.required'    => 'El teléfono es obligatorio.',

                'firstName.regex'      => 'La primera letra del nombre debe ser mayúscula',
                'lastName.regex'       => 'La primera letra del apellido debe ser mayúscula',
                'email.email'          => 'Introduce un email válido',
                'email.unique'         => 'Este email ya está en uso',
                'usuario.unique'       => 'Este nombre de usuario ya existe',
                'telefono.min'         => 'El teléfono debe tener al menos 9 dígitos',
                'contrasenya.min'      => 'Mín. 8 caracteres, mayúscula, número y un caracter especial',
                'contrasenya.regex'    => 'Mín. 8 caracteres, mayúscula, número y símbolo',
                'contrasenya2.same'    => 'Las contraseñas no coinciden',
                'contrasenya2.required'=> 'Debes confirmar la contraseña',
            ]);

        $user = User::create([
            'usuario' => $request->usuario,
            'nombre' => $request->firstName,
            'apellido' => $request->lastName,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'password' => bcrypt($request->contrasenya),
            'rol_id' => 2,
            
        ]);

               
        event(new Registered($user));

      
        auth()->login($user);

       
        //return redirect()->route('verification.notice');
        
        return Inertia::render('registro', [
            'showVerifyModal' => true,
        ]);
    }

    public function inicio()
    {
        return Inertia::render('inicio');
    }
}
