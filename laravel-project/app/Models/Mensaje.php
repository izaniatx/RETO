<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    protected $table = 'mensajes';

    protected $fillable = [
        'mensaje'
    ];

    public function ventaVehiculo()
    {
        return $this->belongsTo(VentaVehiculo::class);
    }
}
