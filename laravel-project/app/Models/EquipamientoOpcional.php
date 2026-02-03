<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipamientoOpcional extends Model
{
    protected $table = 'equipamientos_opcionales';

    protected $fillable = [
        'equipamiento'
    ];

    public function vehiculos()
    {
        return $this->belongsToMany(Vehiculo::class, 'equipamientos_vehiculos', 'equipamiento_id', 'vehiculo_id');
    }
}
