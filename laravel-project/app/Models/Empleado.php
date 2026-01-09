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
        return $this->hasOne(User::class);
    }

    public function cursos()
    {
        return $this->belongsToMany(Curso::class);
    }

    public function turnos()
    {
        return $this->belongsToMany(Turno::class);
    }

    public function equipamientos()
    {
        return $this->belongsToMany(EquipamientoOpcional::class);
    }
    
}

