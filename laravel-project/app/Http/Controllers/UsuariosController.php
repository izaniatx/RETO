<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Rol;


class UsuariosController extends Controller
{
    public function getUsuarios()
    {
        $usuarios = User::with('rol')->get();
        $roles = Rol::all(); // Traemos todos los roles

        $totalUsuarios = User::count();
        $totalMes = User::whereMonth('created_at', now()->month)->count();

        return Inertia::render('admin/usuarios', [
            'users' => $usuarios,
            'total' => $totalUsuarios,
            'totalMes' => $totalMes,
            'roles' => $roles, // <-- enviamos los roles
        ]);
    }


    public function deleteUsuario(Request $request){
        $usuario = User::find($request->id);

        if($usuario){
            $usuario->isDeleted = true;
            $usuario->save();
        }

    }


}
