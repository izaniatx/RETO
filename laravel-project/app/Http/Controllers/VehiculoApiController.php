<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoApiController extends Controller
{
    public function index()
    {
        // Solo devolvemos los datos técnicos y relaciones
        $vehiculos = Vehiculo::with(['marca', 'modelo', 'carroceria', 'equipamientos'])
                         ->where('isDeleted', false)
                         ->orderBy('id', 'desc')
                         ->get(); // O paginate()

        // DEVOLVEMOS JSON PURO
        return response()->json([
            'status' => 'success',
            'count'  => $vehiculos->count(),
            'data'   => $vehiculos
        ], 200);
    }

    public function show($id)
    {
        $vehiculo = Vehiculo::with(['marca', 'modelo', 'carroceria', 'equipamientos'])->find($id);
        
        if (!$vehiculo) {
            return response()->json(['message' => 'Vehículo no encontrado'], 404);
        }

        return response()->json($vehiculo, 200);
    }
}