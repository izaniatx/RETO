<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use Inertia\Inertia;

class VehiculosController extends Controller
{
    public function getVehiculos(){
        
       $vehiculos = Vehiculo::with(['marca', 'modelo', 'carroceria'])
                         ->orderBy('id', 'desc')
                         ->paginate(10); 

        $totalVehiculos =Vehiculo::count();

         return Inertia::render('listadocoches', [
            'vehiculos' => $vehiculos,
            'totalVehiculos' => $totalVehiculos,
        
        ]);

    }
}
