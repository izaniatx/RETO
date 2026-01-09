<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VentaVehiculo extends Model
{
    protected $table = 'venta_vehiculos';

    protected $fillable = [
        'user_id',
        'vehiculo_id',
        'mensaje_id',
        'estado_id'
    ];

    public function estado()
    {
        return $this->hasOne(Estado::class);
    }

    public function mensaje()
    {
        return $this->hasOne(Mensaje::class);
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }
}
