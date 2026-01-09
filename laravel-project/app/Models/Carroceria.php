<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carroceria extends Model
{
    protected $table = 'carrocerias';

    protected $fillable = [
        'carroceria'
    ];

    public function vehiculos()
    {
        return $this->hasMany(Vehiculo::class);
    }
}
