<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use Inertia\Inertia;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\Carroceria;

class CatalogoController extends Controller
{
    public function getVehiculos()
{
    // Buscamos vehículos que TENGAN una relación con VentaVehiculo
    // y que en esa relación el estado_id sea 3 (En venta)
    $vehiculos = Vehiculo::with(['marca', 'modelo', 'carroceria', 'ventaVehiculo'])
        ->whereHas('ventaVehiculo', function ($query) {
            $query->where('estado_id', 3);
        })
        ->orderBy('id', 'desc')
        ->get();

    // Contamos solo los que cumplen la misma condición
    $totalVehiculos = Vehiculo::whereHas('ventaVehiculo', function ($query) {
        $query->where('estado_id', 3);
    })->count();

    // Estadísticas adicionales
    $ventasMes = Vehiculo::whereNotNull('fecha_venta')
        ->whereMonth('fecha_venta', now()->month)
        ->whereYear('fecha_venta', now()->year)
        ->count();

    $marcas = Marca::all();
    $modelos = Modelo::all();
    $carrocerias = Carroceria::all();

    return Inertia::render('catalogo', [
        'vehiculos' => $vehiculos,
        'totalVehiculos' => $totalVehiculos,
        'ventasMes' => $ventasMes,
        'marcas' => $marcas,
        'modelos' => $modelos,
        'carrocerias' => $carrocerias,
    ]);
}
}
