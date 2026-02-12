<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\Carroceria;
use App\Models\Vehiculo;
use App\Models\VentaVehiculo;
use Inertia\Inertia;

class ComprasController extends Controller
{
    public function vendeTuCoche(){
        $marcas = Marca::all();
        $modelos = Modelo::all();
        $carrocerias = Carroceria::all();

        return Inertia::render('vendeTuCoche', [
            'marcas' => $marcas,
            'modelos' => $modelos,
            'carrocerias' => $carrocerias,
        ]);

    }

    public function venta(Request $r){

         $r->validate([
            'color' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'carroceria' => 'required',
           
        ],[
            'color.required' => 'Campo obligatorio',
            'marca.required' => 'Campo obligatorio',
            'modelo.required' => 'Campo obligatorio',
            'carroceria.required' => 'Campo obligatorio',
           
        ]);

        
        $vechiulo=  Vehiculo::create([
            'color' => $r['color'],
            'marca_id' => $r['marca'],
            'modelo_id' => $r['modelo'],
            'carroceria_id' => $request['carroceria'],
        ]);

        $mensaje = Mensaje::create([
            'mensaje' => $r['mensaje'],
        ]);

        $ventaVehiculo = VentaVehiculo::create([
            'user_id' => Auth::id(),
            'vehiculo_id' => $vehiculo->id,
            'mensaje_id' => $mensaje->id ,
            'estado_id' => 4, 
            'tipo' => 'compra'
        ]);

        return Inertia::location(route('inicio'));


    }


}
