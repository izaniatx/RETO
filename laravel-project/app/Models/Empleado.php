<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table = 'empleados';

    protected $fillable = [
        'concesionario_id',
        'user_id'
    ];

    public function concesionario()
    {
        return $this->belongsTo(Concesionario::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'cursos_empleados', 'empleado_id', 'curso_id')
                    ->withPivot('fecha_finalizacion', 'isDeleted')
                    ->withTimestamps();
    }

    public function turnos()
    {
        return $this->belongsToMany(Turno::class);
    }

    
    
}

