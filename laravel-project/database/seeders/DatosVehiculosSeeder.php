<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\Carroceria;

class DatosVehiculosSeeder extends Seeder
{
    
    public function run(): void
{
   
    Marca::Create(['Marca' => 'Toyota', 'isDeleted' => false]);
    Marca::Create(['Marca' => 'Ford', 'isDeleted' => false]);
    Marca::Create(['Marca' => 'BMW', 'isDeleted' => false]);
    Marca::Create(['Marca' => 'Volkswagen', 'isDeleted' => false]);
    Marca::Create(['Marca' => 'Hyundai', 'isDeleted' => false]);

   
    Modelo::Create(['Modelo' => 'Corolla', 'isDeleted' => false]);
    Modelo::Create(['Modelo' => 'Focus', 'isDeleted' => false]);
    Modelo::Create(['Modelo' => 'E36', 'isDeleted' => false]);
    Modelo::Create(['Modelo' => 'Golf', 'isDeleted' => false]);
    Modelo::Create(['Modelo' => 'Kona', 'isDeleted' => false]);


   
    Carroceria::Create(['Carroceria' => 'Sedán', 'isDeleted' => false]);
    Carroceria::Create(['Carroceria' => 'Hatchback', 'isDeleted' => false]);
    Carroceria::Create(['Carroceria' => 'SUV', 'isDeleted' => false]);
    Carroceria::Create(['Carroceria' => 'Pickup', 'isDeleted' => false]);
}

}
