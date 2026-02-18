<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use App\Models\Concesionario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocalizacionController extends Controller
{
    public function dondeEncontrarnos(Request $request)
    {
        $paises = Pais::with('territorios.ciudades')->get();

        
        $query = Concesionario::query()
            ->where('isDeleted', false)
            ->whereNotNull('latitud')
            ->whereNotNull('longitud');

        if ($request->filled('ciudad_id')) {
            $query->where('ciudad_id', $request->ciudad_id);
        } 
        
        elseif ($request->filled('territorio_id')) {
            $query->whereHas('ciudad', function($q) use ($request) {
                $q->where('territorio_id', $request->territorio_id);
            });
        } 
        
        elseif ($request->filled('pais_id')) {
            $query->whereHas('ciudad.territorio', function($q) use ($request) {
                $q->where('pais_id', $request->pais_id);
            });
        }

        $concesionarios = $query->get();

        return Inertia::render('dondeEncontrarnos', [ 
            'paises' => $paises,
            'concesionarios' => $concesionarios,
            'filters' => $request->only(['pais_id', 'territorio_id', 'ciudad_id'])
        ]);
    }
}