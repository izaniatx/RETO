<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Estado;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Estado::Create(['id'=>1, 'estado'=> 'En revisión']);
        Estado::Create(['id'=>2,'estado'=> 'Denegado']);
        Estado::Create(['id'=>3,'estado'=> 'En venta']);
        Estado::Create(['id'=>4,'estado'=> 'Nuevo']);
      

        
    
    }

}
