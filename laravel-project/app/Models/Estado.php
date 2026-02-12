<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $table = 'estados';

    protected $fillable = [
        'estado'
    ];

    public function ventas()
    {
        
        return $this->hasMany(VentaVehiculo::class, 'estado_id');
    }
}
