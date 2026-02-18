<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curso;
use Inertia\Inertia;

class CursosController extends Controller
{
    public function getCursos()
    {
        $user = auth()->user();
        $cursos = Curso::all();
         
        $misCursosIds = $user->empleado 
            ? $user->empleado->cursos()->wherePivot('isDeleted', false)->pluck('cursos.id')->toArray() 
            : [];

        return Inertia::render('cursos', [
            'cursos' => $cursos,
            'misCursosIds' => $misCursosIds
        ]);
    }

    public function anyadirCurso(Request $request)
    {
        $request->validate([
            'curso_id' => 'required|exists:cursos,id'
        ]);

        $user = auth()->user();
        
        if (!$user->empleado) {
            return back()->withErrors(['error' => 'Solo los empleados pueden inscribirse en cursos.']);
        }
       
        $user->empleado->cursos()->syncWithoutDetaching([
            $request->curso_id => [
                'fecha_finalizacion' => now()->addMonths(1),
                'isDeleted' => false
            ]
        ]);

        return back()->with('message', 'Curso añadido con éxito');
    }
}
