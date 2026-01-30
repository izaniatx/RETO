<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Rol; 

class RolSeeder extends Seeder
{
    public function run(): void
    {
        
        Rol::create(['id'=>1,'rol' => 'Administrador']);
        Rol::create(['id'=>2,'rol' => 'Cliente']);
        Rol::create(['id'=>3, 'rol' => 'GestorVentas']);
        Rol::create(['id'=>4, 'rol' => 'GestorCompras']);


        
    }
}