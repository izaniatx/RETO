<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\Carroceria;
use App\Models\Vehiculo;
use App\Models\VentaVehiculo;
use App\Models\Mensaje;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Estado;


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

    public function venta(Request $r) {
    
        $r->validate([
            'color' => 'required',
            'marca_id' => 'required',
            'modelo_id' => 'required',
            'carroceria_id' => 'required',
            'mensaje' => 'nullable', 
        ]);

    
        $vehiculo = Vehiculo::create([
            'color' => $r->color,
            'marca_id' => $r->marca_id,
            'modelo_id' => $r->modelo_id,
            'carroceria_id' => $r->carroceria_id,
        ]);

    
        $mensaje = Mensaje::create([
            'mensaje' => $r->mensaje ?? 'Sin observaciones adicionales',
        ]);

    
        VentaVehiculo::create([
            'user_id' => Auth::id(),
            'vehiculo_id' => $vehiculo->id,
            'mensaje_id' => $mensaje->id,
            'estado_id' => 4, 
            'tipo' => 'compra'
        ]);

        return redirect()->route('inicio');
    }


     public function indexGestorCompras()
    {
        
        $compras = VentaVehiculo::with(['vehiculo.marca', 'vehiculo.modelo', 'estado'])
                    ->where('tipo', 'compra')
                    ->get();

        return inertia('gestorCompras', [
            'compras' => $compras
        ]);
    }

     public function showDetalleCompra($id)
    {
        $compra = VentaVehiculo::with([
            'vehiculo.marca', 
            'vehiculo.modelo', 
            'estado', 
            'mensaje', 
            'user' 
        ])->findOrFail($id);

        $estados = Estado::all();

        return Inertia::render('detalleCompra', [
            'compra' => $compra,
            'estados' => $estados,
        ]);
    }

     public function actualizarEstado(Request $request, $id)
    {
        $request->validate([
            'estado_id' => 'required|exists:estados,id',
        ]);

        $venta = VentaVehiculo::findOrFail($id);
        $venta->estado_id = $request->estado_id;
        $venta->save();

   
        return redirect()->back();
    }


    public function comprarVehiculo(Request $request, $id){
        $vehiculo = VentaVehiculo::find($id);

        echo $id;
        
        $compras = VentaVehiculo::with(['vehiculo.marca', 'vehiculo.modelo', 'estado'])
                    ->where('tipo', 'compra')
                    ->get();

        return Inertia::render('gestorCompras', [
            'compras' =>$compras
        ]);

    }

}
