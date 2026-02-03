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
            // Cargamos los equipamientos y sus vehículos relacionados
            'equipamiento' => EquipamientoOpcional::with('vehiculos.modelo', 'vehiculos.marca')->get(),
            
            'totalVehiculos' => Vehiculo::count(),
            'ventasMes' => Vehiculo::whereNotNull('fecha_venta')->whereMonth('fecha_venta', now()->month)->count(),
            'cochesSinStock' => Vehiculo::where('isDeleted', true)->count()
        ]);
    }
}
