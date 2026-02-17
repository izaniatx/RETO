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

        // Empezamos con la base: solo los que no están borrados y tienen coordenadas
        $query = Concesionario::query()
            ->where('isDeleted', false)
            ->whereNotNull('latitud')
            ->whereNotNull('longitud');

        // FILTRO POR CIUDAD (El más específico)
        if ($request->filled('ciudad_id')) {
            $query->where('ciudad_id', $request->ciudad_id);
        } 
        // FILTRO POR TERRITORIO (Si no hay ciudad, pero hay comunidad)
        elseif ($request->filled('territorio_id')) {
            $query->whereHas('ciudad', function($q) use ($request) {
                $q->where('territorio_id', $request->territorio_id);
            });
        } 
        // FILTRO POR PAÍS (Si no hay nada más)
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