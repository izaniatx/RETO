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

        User::create(['usuario' => 'Admin', 
                    'nombre'=> 'Administrador', 
                    'Apellido' => 'Administrador', 
                    'telefono' => 123456789, 
                    'email' => 'admin@gmail.com', 
                    'password'=>'Admin123*',
                    'rol_id'=>1]);

        User::create(['usuario' => 'Nerea', 
                    'nombre'=> 'Nerea', 
                    'Apellido' => 'Manzano', 
                    'telefono' => 123456789, 
                    'email' => 'nerea@gmail.com', 
                    'password'=>'Nerea123*', 
                    'rol_id'=>2]);
        
        User::create(['usuario' => 'Izani', 
                    'nombre'=> 'Izani', 
                    'Apellido' => 'Achega', 
                    'telefono' => 123456789, 
                    'email' => 'izani@gmail.com', 
                    'password'=>'Izani123*', 
                    'rol_id'=>3]);

        User::create(['usuario' => 'Viktor', 
                    'nombre'=> 'Viktor', 
                    'Apellido' => 'Zahariuk', 
                    'telefono' => 123456789, 
                    'email' => 'viktor@gmail.com', 
                    'password'=>'Viktor123*', 
                    'rol_id'=>4]);

        
    }
}
 