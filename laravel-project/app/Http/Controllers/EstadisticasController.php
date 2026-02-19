<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EstadisticasController extends Controller
{
    public function graficoVentas() {
        $anioActual = now()->year;
    
        
        $ventasSemanales = Vehiculo::whereNotNull('fecha_venta')
            ->whereYear('fecha_venta', $anioActual)
            ->select(
                DB::raw("count(*) as uv"),
                DB::raw("WEEK(fecha_venta) as semana_num"),
                DB::raw("CONCAT('Sem ', WEEK(fecha_venta)) as name")
            )
            ->groupBy('semana_num', 'name')
            ->orderBy('semana_num')
            ->get();
    
       
        $usuariosSemanales = User::whereYear('created_at', $anioActual)
            ->select(
                DB::raw("count(*) as uv"),
                DB::raw("WEEK(created_at) as semana_num"),
                DB::raw("CONCAT('Sem ', WEEK(created_at)) as name")
            )
            ->groupBy('semana_num', 'name')
            ->orderBy('semana_num')
            ->get();
    
       
        $altasSemanales = Vehiculo::whereYear('fecha_alta', $anioActual)
            ->select(
                DB::raw("count(*) as uv"),
                DB::raw("WEEK(fecha_alta) as semana_num"),
                DB::raw("CONCAT('Sem ', WEEK(fecha_alta)) as name")
            )
            ->groupBy('semana_num', 'name')
            ->orderBy('semana_num')
            ->get();
    
        return Inertia::render('ventas', [
            'datosVentas'   => $ventasSemanales,
            'datosUsuarios' => $usuariosSemanales,
            'datosAltas'    => $altasSemanales,
        ]);
    }
    
    
    private function getMesCaseSql($columna) {
        return "CASE 
            WHEN MONTH($columna) = 1 THEN 'Ene' WHEN MONTH($columna) = 2 THEN 'Feb'
            WHEN MONTH($columna) = 3 THEN 'Mar' WHEN MONTH($columna) = 4 THEN 'Abr'
            WHEN MONTH($columna) = 5 THEN 'May' WHEN MONTH($columna) = 6 THEN 'Jun'
            WHEN MONTH($columna) = 7 THEN 'Jul' WHEN MONTH($columna) = 8 THEN 'Ago'
            WHEN MONTH($columna) = 9 THEN 'Sep' WHEN MONTH($columna) = 10 THEN 'Oct'
            WHEN MONTH($columna) = 11 THEN 'Nov' WHEN MONTH($columna) = 12 THEN 'Dic'
        END as name";
    }
}
