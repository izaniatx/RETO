<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\VentaVehiculo; // Importante
use App\Models\User;          // Opcional pero recomendado
use Inertia\Inertia;

class VentaVehiculo extends Model
{
    protected $table = 'venta_vehiculos';

    protected $fillable = [
        'user_id',
        'vehiculo_id',
        'mensaje_id',
        'estado_id',
        'tipo'
    ];

    public function estado()
    {
        
        return $this->belongsTo(Estado::class, 'estado_id');
    }

    public function mensaje()
    {
       
        return $this->belongsTo(Mensaje::class, 'mensaje_id');
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }

    public function user()
    {
        // Una venta pertenece a un usuario (el cliente)
        return $this->belongsTo(User::class, 'user_id');
    }
}
