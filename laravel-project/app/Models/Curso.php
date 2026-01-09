<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'cursos';

    protected $fillable = [
        'curso'
    ];

    public function empleados()
    {
        return $this->belongsToMany(Empleado::class);
    }
}
