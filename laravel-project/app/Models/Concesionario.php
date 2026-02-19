<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Concesionario extends Model
{

    use HasFactory;

    protected $table = 'concesionarios';

    protected $fillable = [
        'nombre',
        'telefono',
        'ciudad_id',
        'latitud',   
        'longitud', 
        'isDeleted'  
    ];

    public function ciudad()
    {
        return $this->belongsTo(Ciudad::class);
    }

    public function empleados()
    {
        return $this->hasMany(Empleado::class);
    }

   public function territorio()
    {
        return $this->hasOneThrough(
            Territorio::class, 
            Ciudad::class,    
            'id',             
            'id',              
            'ciudad_id',       
            'territorio_id'    
        );
    }

}
