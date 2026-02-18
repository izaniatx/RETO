<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'cursos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'nivel',
        'duracion_horas',
        'categoria'
    ];

    public function empleados()
    {
        return $this->belongsToMany(Empleado::class, 'cursos_empleados', 'curso_id', 'empleado_id')
                    ->withPivot('fecha_finalizacion', 'isDeleted')
                    ->withTimestamps();
    }
}
