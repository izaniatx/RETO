<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EquipamientoOpcional;
use App\Models\Vehiculo;
use Inertia\Inertia;

class EquipamientoController extends Controller
{
    public function getEquipamientos() {
        return Inertia::render('equipamiento', [
            'equipamiento' => EquipamientoOpcional::with('vehiculos.modelo', 'vehiculos.marca')->get(),
            'totalVehiculos' => Vehiculo::count(),
            'ventasMes' => Vehiculo::whereNotNull('fecha_venta')->whereMonth('fecha_venta', now()->month)->count(),
            'cochesSinStock' => Vehiculo::where('isDeleted', true)->count()
        ]);
    }

    // Método para CREAR (Añádelo a tus rutas como /equipamientos/create)
    public function storeEquipamiento(Request $request) 
    {
        $request->validate([
            // 'unique:tabla,columna'
            'nombre' => 'required|string|max:255|unique:equipamientos_opcionales,equipamiento',
        ], [
            // Opcional: Personalizar el mensaje de error
            'nombre.unique' => 'Este equipamiento ya existe en la base de datos.',
        ]);

        EquipamientoOpcional::create([
            'equipamiento' => $request->nombre,
            'isDeleted' => false
        ]);

        // Usar redirect()->back() es más eficiente en Inertia para recargar datos
        return Inertia::location(route('inventario.equipamientos'));
    }

    // Coincide con tu ruta: Route::put('/equipamientos/{id}', ...)
    public function modifyEquipamiento(Request $request, $id) 
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $item = EquipamientoOpcional::findOrFail($id);
        $item->update([
            'equipamiento' => $request->nombre
        ]);

        return Inertia::location(route('inventario.equipamientos'));
    }

    // Coincide con tu ruta: Route::post('/equipamientos/delete', ...)
    public function deleteEquipamiento(Request $request) {
        $equipamiento = EquipamientoOpcional::find($request->id);

        if($equipamiento){
            $equipamiento->isDeleted = true;
            $equipamiento->save();
        }
        return redirect()->back();
    }

    // Coincide con tu ruta: Route::post('/equipamiento/active', ...)
    public function activeEquipamiento(Request $request) {
        $equipamiento = EquipamientoOpcional::find($request->id);

        if($equipamiento){
            $equipamiento->isDeleted = false;
            $equipamiento->save();
        }
        return redirect()->back();
    }
}