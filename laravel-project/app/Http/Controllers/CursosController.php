<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curso;
use Inertia\Inertia;

class CursosController extends Controller
{
    public function getCursos(){

        $cursos = Curso::all();

         return Inertia::render('cursos');
    }
}
