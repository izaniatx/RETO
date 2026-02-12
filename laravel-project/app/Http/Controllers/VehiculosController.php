<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use Inertia\Inertia;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\Carroceria;
use App\Models\EquipamientoOpcional;
use Illuminate\Support\Facades\DB;

class VehiculosController extends Controller
{
    public function getVehiculos(){
    
        $vehiculos = Vehiculo::with(['marca', 'modelo', 'carroceria', 'equipamientos'])
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
    
        
        $todosEquipamientos = \App\Models\EquipamientoOpcional::all();
    
        return Inertia::render('listadocoches', [
            'vehiculos' => $vehiculos,
            'totalVehiculos' => $totalVehiculos, 
            'ventasMes' => $ventasMes,   
            'cochesSinStock' => $cochesSinStock,
            'marcas' => $marcas,
            'modelos' => $modelos,
            'carrocerias' => $carrocerias,
            'todosEquipamientos' => $todosEquipamientos,
        ]);
    }
    
    public function syncEquipamiento(Request $request, $id) 
    {
        $vehiculo = Vehiculo::findOrFail($id);
        
        
        $vehiculo->equipamientos()->sync($request->equipamientos);
    
        return back(); 
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

        
        Vehiculo::create([
            'color' => $request['color'],
            'marca_id' => $request['marca'],
            'modelo_id' => $request['modelo'],
            'precio' => $request['precio'],
            'carroceria_id' => $request['carroceria'],
            'fecha_alta' => now(),
        ]);

  
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

        return Inertia::location(route('inventario.index'));
    }


    public function modifyVehiculo(Request $request, $id){
        $vehiculo = Vehiculo::findOrFail($id);
        
        $vehiculo->update([
            'marca_id' => $request->marca,
            'modelo_id' => $request->modelo,
            'carroceria_id' => $request->carroceria,
            'precio' => $request->precio,
            'color' => $request->color,
        ]);
    
        
        if ($request->has('equipamientos')) {
            $vehiculo->equipamientos()->sync($request->equipamientos);
        }
    
        return Inertia::location(route('inventario.index'));
    }


    public function graficoVentas() {
        $ventasPorMes = Vehiculo::whereNotNull('fecha_venta')
            ->select(
                DB::raw("count(*) as uv"),
                DB::raw("MONTH(fecha_venta) as mes_num"),
                DB::raw("CASE 
                    WHEN MONTH(fecha_venta) = 1 THEN 'Ene'
                    WHEN MONTH(fecha_venta) = 2 THEN 'Feb'
                    WHEN MONTH(fecha_venta) = 3 THEN 'Mar'
                    WHEN MONTH(fecha_venta) = 4 THEN 'Abr'
                    WHEN MONTH(fecha_venta) = 5 THEN 'May'
                    WHEN MONTH(fecha_venta) = 6 THEN 'Jun'
                    WHEN MONTH(fecha_venta) = 7 THEN 'Jul'
                    WHEN MONTH(fecha_venta) = 8 THEN 'Ago'
                    WHEN MONTH(fecha_venta) = 9 THEN 'Sep'
                    WHEN MONTH(fecha_venta) = 10 THEN 'Oct'
                    WHEN MONTH(fecha_venta) = 11 THEN 'Nov'
                    WHEN MONTH(fecha_venta) = 12 THEN 'Dic'
                END as name")
            )
            ->groupBy('mes_num', 'name')
            ->orderBy('mes_num')
            ->get();

          
    
        return Inertia::render('ventas', [
            'datosVentas' => $ventasPorMes,
            
        ]);
    }

    public function getVehiculo($id)
    {
        
        $vehiculo = Vehiculo::with(['marca', 'modelo', 'carroceria', 'equipamientos'])
            ->findOrFail($id); 
    
        return Inertia::render('detalleVehiculo', [
            'vehiculo' => $vehiculo,
        ]);
    }

}
