<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
class VehiculosController extends Controller
{
    public function getVehiculos(){
        $Vehiculos = Vehiculo::all();

    }
}
