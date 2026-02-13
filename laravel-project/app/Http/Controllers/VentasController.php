<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VentaVehiculo;
use App\Models\Mensaje;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Estado;

class VentasController extends Controller
{
    public function createReserva(Request $request)
    {
       
        $request->validate([
           
            'vehiculo_id' => 'required|exists:vehiculos,id', 
            'nombre' => 'required|string',
            'email' => 'required|email',
            'telefono' => 'required',
            'mensaje' => 'nullable|string',
        ]);

        
        $contacto = "Reserva de: {$request->nombre} | Tel: {$request->telefono} | Email: {$request->email} | Mensaje: {$request->mensaje}";
        
        $nuevoMensaje = Mensaje::create([
            'mensaje' => $contacto
        ]);

       
        VentaVehiculo::create([
            'user_id' => Auth::id(),        
            'vehiculo_id' => $request->vehiculo_id,
            'mensaje_id' => $nuevoMensaje->id,
            'estado_id' => 4, 
            'tipo'=> 'venta',              
        ]);

        return redirect()->back()->with('success', '¡Reserva confirmada! Nos pondremos en contacto contigo pronto.');
    }

    public function indexGestorVentas()
    {
        // Filtramos por tipo 'venta' y cargamos relaciones para evitar consultas extra
        $ventas = VentaVehiculo::with(['vehiculo.marca', 'vehiculo.modelo', 'estado'])
                    ->where('tipo', 'venta')
                    ->get();

        return inertia('gestorVentas', [
            'ventas' => $ventas
        ]);
    }

    
   public function showDetalleVenta($id)
    {
        $venta = VentaVehiculo::with(['vehiculo.marca', 'vehiculo.modelo', 'estado', 'mensaje', 'user'])->findOrFail($id);
        $estados = Estado::all();

        return Inertia::render('detalleVenta', [
            'venta' => $venta,
            'estados' => $estados, // <-- Asegúrate de que termine en 's'
        ]);
    }

    // ComprasController.php

    public function actualizarEstado(Request $request, $id)
    {
        $request->validate([
            'estado_id' => 'required|exists:estados,id',
        ]);

        $venta = VentaVehiculo::findOrFail($id);
        $venta->estado_id = $request->estado_id;
        $venta->save();

        // Redirigir de vuelta con un mensaje de éxito
        return redirect()->back();
    }
}