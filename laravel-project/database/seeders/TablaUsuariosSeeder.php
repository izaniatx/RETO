<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User; 

class TablaUsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create(['usuario' => 'Admin', 'nombre'=> 'Administrador', 'Apellido' => 'Administrador', 'telefono' => 123456789, 'email' => 'admin@gmail.com', 'password'=>'Admin1**', 'rol_id'=>1]);
        User::create(['usuario' => 'Nerea', 'nombre'=> 'Nerea', 'Apellido' => 'Manzano', 'telefono' => 123456789, 'email' => 'nerea@gmail.com', 'password'=>'Nerea1*', 'rol_id'=>2]);
    }
}
 