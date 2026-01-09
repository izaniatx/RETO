<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    protected $table = 'vehiculos';

    protected $fillable = [
        'color',
        'precio',
        'fecha_alta',
        'fecha_venta',
        'imagen',
        'marca_id',
        'carroceria_id',
        'modelo_id'
    ];

    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

    public function carroceria()
    {
        return $this->belongsTo(Carroceria::class);
    }

    public function modelo()
    {
        return $this->belongsTo(Modelo::class);
    }

    public function ventaVehiculo()
    {
        return $this->hasOne(VentaVehiculo::class);
    }
}
