<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EquipamientoOpcional;
use App\Models\Vehiculo;
use Illuminate\Support\Facades\DB; 

class EquipamientoSeeder extends Seeder
{
    public function run(): void
    {
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('equipamientos_vehiculos')->truncate();
        EquipamientoOpcional::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        
        $equipamientos = [
            'Techo Panorámico', 'Asientos de Cuero', 'Sistema de Sonido Premium',
            'Navegador GPS', 'Cámara 360º', 'Control de Crucero Adaptativo',
            'Llantas de Aleación 19"', 'Faros Matrix LED', 'Apple CarPlay / Android Auto',
            'Sensores de Aparcamiento', 'Asientos Calefactables', 'Paquete Deportivo M / S-Line'
        ];

        
        foreach ($equipamientos as $item) {
            EquipamientoOpcional::create(['equipamiento' => $item]);
        }

        $todosLosEquipamientos = EquipamientoOpcional::all();
        $vehiculos = Vehiculo::all();

        
        if ($vehiculos->count() === 0) {
            $this->command->warn("No hay vehículos en la base de datos. No se puede llenar la tabla intermedia.");
            return;
        }

        foreach ($vehiculos as $vehiculo) {
           
            $randomExtrasIds = $todosLosEquipamientos->random(rand(2, 5))->pluck('id')->toArray();
            
         
            $vehiculo->equipamientos()->sync($randomExtrasIds);
        }

        $this->command->info("Equipamientos asignados correctamente a " . $vehiculos->count() . " vehículos.");
    }
}