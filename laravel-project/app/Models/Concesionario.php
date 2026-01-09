<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Concesionario extends Model
{
    protected $table = 'concesionarios';

    protected $fillable = [
        'nombre',
        'telefono',
        'ciudad_id'

    ];


    public function ciudad()
    {
        return $this->belongsTo(Ciudad::class);
    }

    public function empleados()
    {
        return $this->hasMany(Empleado::class);
    }
}
