<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $table = 'marcas';

    protected $fillable = [
        'marcas'
    ];

    public function vehiculos()
    {
        return $this->hasMany(Vehiculo::class);
    }
}
