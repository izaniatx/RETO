<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Pais extends Model
{
    
    protected $table = 'paises';
    use HasFactory;
    protected $fillable = [
        'pais'
    ];

    public function territorios()
    {
        return $this->hasMany(Territorio::class);
    }
}
