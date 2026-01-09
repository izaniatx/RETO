<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    protected $table = 'ciudades';

    protected $fillable = [
        'ciudad',
        'territorio_id'

    ];

    public function territorio()
    {
        return $this->belongsTo(Territorio::class);
    }

    public function concesionarios()
    {
        return $this->hasMany(Concesionario::class);
    }
}
