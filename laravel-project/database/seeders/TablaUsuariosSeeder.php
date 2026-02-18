<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User; 
use App\Models\Empleado;
use App\Models\Cliente;

class TablaUsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

       $u1= User::create(['usuario' => 'Admin', 
                    'nombre'=> 'Administrador', 
                    'Apellido' => 'Administrador', 
                    'telefono' => 123456789, 
                    'email' => 'admin@gmail.com', 
                    'password'=>'Admin123*',
                    'rol_id'=>1]);

        $u2= User::create(['usuario' => 'Nerea', 
                    'nombre'=> 'Nerea', 
                    'Apellido' => 'Manzano', 
                    'telefono' => 123456789, 
                    'email' => 'nerea@gmail.com', 
                    'password'=>'Nerea123*', 
                    'rol_id'=>2]);
        
        $u3= User::create(['usuario' => 'Izani', 
                    'nombre'=> 'Izani', 
                    'Apellido' => 'Achega', 
                    'telefono' => 123456789, 
                    'email' => 'izani@gmail.com', 
                    'password'=>'Izani123*', 
                    'rol_id'=>3]);

        $u4= User::create(['usuario' => 'Viktor', 
                    'nombre'=> 'Viktor', 
                    'Apellido' => 'Zahariuk', 
                    'telefono' => 123456789, 
                    'email' => 'viktor@gmail.com', 
                    'password'=>'Viktor123*', 
                    'rol_id'=>4]);

        Empleado::create(['user_id'=>$u1['id'], 'concesionario_id'=>1]);
        Cliente::create(['user_id'=>$u2['id']]);
        Empleado::create(['user_id'=>$u3['id'], 'concesionario_id'=>2]);
        Empleado::create(['user_id'=>$u4['id'], 'concesionario_id'=>3]);

        


        
    }
}
 