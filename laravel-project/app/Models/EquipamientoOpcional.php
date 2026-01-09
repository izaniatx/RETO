<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipamientoOpcional extends Model
{
    protected $table = 'equipamientos_opcionales';

    protected $fillable = [
        'equipamiento'
    ];

    public function empleados()
    {
        return $this->belongsToMany(Empleado::class);
    }
}
