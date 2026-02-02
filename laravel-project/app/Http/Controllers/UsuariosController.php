<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Rol;
use Illuminate\Support\Facades\Auth;


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

        if (Auth::id() === $usuario->id) {
        
            Auth::logout();
    
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

    }

    public function activeUsuario(Request $request){
        $usuario = User::find($request->id);

        if($usuario){
            $usuario->isDeleted = false;
            $usuario->save();
        }

    }

    public function createUsuario(Request $request){

        $exists = User::where('usuario', $request->usuario)->exists();

        if($exists){
            return back()->withError([
                'usuario'=>'Este usuario ya existe'
            ]);
        }

        $request->validate([
            'usuario'=>'required',
            'nombre'=>'required',
            'apellido'=>'required',
            'email' => 'required|email',
            'password'  => ['required', 'min:8', 'regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/'], 
            'telefono'=>'required|regex: /[0-9]{9}/',
            'rol_id'=>'required',
        ],[
            'usuario.required'=>'Campo  obligatorio',
            'nombre.required'=>'Campo  obligatorio',
            'apellido.required'=>'Campo  obligatorio',
            'email.required'=>'Campo  obligatorio',
            'email.regex'=>'Este campo debe de ser un correo',
            'password.required'=>'Campo  obligatorio',
            'password.regex'=>'Min. 8 carácteres',
            'telefono.required'=>'Campo  obligatorio',
            'telefono.regex'=>'Debe de contener 9 digitos',
            'rol_id.required'=>'Campo  obligatorio', 

        ]);

        

        $usuario=User::create([
            'usuario'=>$request['usuario'],
            'nombre'=>$request['nombre'],
            'apellido'=>$request['apellido'],
            'email'=>$request['email'],
            'password'=>$request['password'],
            'telefono'=>$request['telefono'],
            'rol_id'=>$request['rol_id'],
        ]);

        $usuarios = User::with('rol')->get();
        $roles = Rol::all();
        $totalUsuarios = User::count();
        $totalMes = User::whereMonth('created_at', now()->month)->count();

        return Inertia::location(route('usuarios.index'));
    }

    public function modifyUsuario(Request $request, $id){
        $usuario = User::findOrFail($id);
        

        $usuario->usuario= $request->usuario;
        $usuario->nombre=$request->nombre;
        $usuario->apellido=$request->apellido;
        $usuario->email=$request->email;
        $usuario->telefono=$request->telefono;
        $usuario->rol_id=$request->rol_id;

        $usuario->save();


        

        return Inertia::location(route('usuarios.index'));

    
    }

   public function usuarioLogueado()
    {
        $usuario = auth()->user(); // Usuario logueado

        if (!$usuario) {
            return redirect('/');
        }
        
        $rol = Rol::where('id', $usuario->rol_id)->first();


        return Inertia::render('UserProfile', [
            'usuario' => $usuario,
            'rol' => $rol,
        ]);
    }


    public function modificarPerfil(Request $request, $id){
        $usuario = User::findOrFail($id);
        

        $usuario->usuario= $request->usuario;
        $usuario->nombre=$request->nombre;
        $usuario->apellido=$request->apellido;
        $usuario->email=$request->email;
        $usuario->telefono=$request->telefono;
        $usuario->rol_id=$request->rol_id;

        $usuario->save();


        

        return Inertia::location(route('perfil'));
    }


}
