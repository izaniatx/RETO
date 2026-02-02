<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use Inertia\Inertia;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\Carroceria;
class VehiculosController extends Controller
{
    public function getVehiculos(){
        
        $vehiculos = Vehiculo::with(['marca', 'modelo', 'carroceria'])
                         ->orderBy('id', 'desc')
                         ->paginate(10); 

        $totalVehiculos =Vehiculo::count();

        $ventasMes = Vehiculo::whereNotNull('fecha_venta')   
                    ->whereMonth('fecha_venta', now()->month)
                    ->whereYear('fecha_venta', now()->year)
                    ->count();

        $cochesSinStock = Vehiculo::where('isDeleted', true)->count();
        $marcas = Marca::all();
        $modelos = Modelo::all();
        $carrocerias = Carroceria::all();

        return Inertia::render('listadocoches', [
            'vehiculos' => $vehiculos,
            'totalVehiculos' => $totalVehiculos,
            'ventasMes' => $ventasMes,   
            'cochesSinStock' => $cochesSinStock,
            'marcas' => $marcas,
            'modelos' => $modelos,
            'carrocerias' => $carrocerias,
        ]);

    }



    public function deleteVehiculo(Request $request){
        $vehiculo = Vehiculo::find($request->id);

        if($vehiculo){
            $vehiculo->isDeleted = true;
            $vehiculo->save();
        }

    }

    public function activeVehiculo(Request $request){
       $vehiculo = Vehiculo::find($request->id);

        if($vehiculo){
            $vehiculo->isDeleted = false;
            $vehiculo->save();
        }
    }

    public function createVehiculo(Request $request)
    {
        $request->validate([
            'color' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'carroceria' => 'required',
            'precio' => 'required|numeric',
        ],[
            'color.required' => 'Campo obligatorio',
            'marca.required' => 'Campo obligatorio',
            'modelo.required' => 'Campo obligatorio',
            'carroceria.required' => 'Campo obligatorio',
            'precio.required' => 'Campo obligatorio',
            'precio.numeric' => 'Debe ser un número',
        ]);

        // Crear vehículo
        Vehiculo::create([
            'color' => $request['color'],
            'marca_id' => $request['marca'],
            'modelo_id' => $request['modelo'],
            'precio' => $request['precio'],
            'carroceria_id' => $request['carroceria'],
            'fecha_alta' => now(),
        ]);

        // Obtener datos para la vista
        $vehiculos = Vehiculo::with(['marca', 'modelo', 'carroceria'])
            ->orderBy('id', 'desc')
            ->paginate(10);

        $totalVehiculos = Vehiculo::count();

        $ventasMes = Vehiculo::whereNotNull('fecha_venta')
            ->whereMonth('fecha_venta', now()->month)
            ->whereYear('fecha_venta', now()->year)
            ->count();

        $cochesSinStock = Vehiculo::where('isDeleted', true)->count();

        $marcas = Marca::all();
        $modelos = Modelo::all();
        $carrocerias = Carroceria::all();

        return Inertia::render('listadocoches', [
            'vehiculos' => $vehiculos,
            'totalVehiculos' => $totalVehiculos,
            'ventasMes' => $ventasMes,
            'cochesSinStock' => $cochesSinStock,
            'marcas' => $marcas,
            'modelos' => $modelos,
            'carrocerias' => $carrocerias,
        ]);
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


        $usuarios = User::with('rol')->get();
        $roles = Rol::all();
        $totalUsuarios = User::count();
        $totalMes = User::whereMonth('created_at', now()->month)->count();

            return Inertia::render('admin/usuarios', [
                'users' => $usuarios,
                'roles' => $roles,
                'total' => $totalUsuarios,
                'totalMes' => $totalMes,
                'newUser' => $usuario->load('rol') // para usar en handleSubmit
            ]);
    
    }
}
