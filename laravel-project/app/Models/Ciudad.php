<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Ciudad extends Model
{
    use HasFactory;
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
