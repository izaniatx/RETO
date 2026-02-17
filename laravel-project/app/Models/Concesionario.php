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
        'latitud',   // Añadido
        'longitud',  // Añadido
        'isDeleted'  // Añadido
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
            Territorio::class, // El destino
            Ciudad::class,     // El intermedio
            'id',              // Clave primaria en Territorio (donde termina la búsqueda)
            'id',              // Clave primaria en Ciudad (el puente)
            'ciudad_id',       // Clave foránea en Concesionarios que apunta a Ciudades
            'territorio_id'    // Clave foránea en Ciudades que apunta a Territorios
        );
    }

}
