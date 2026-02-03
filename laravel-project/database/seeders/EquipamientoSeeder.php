<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EquipamientoOpcional;
use App\Models\Vehiculo;
use Illuminate\Support\Facades\DB; // Añade esto para limpiar la tabla

class EquipamientoSeeder extends Seeder
{
    public function run(): void
    {
        // OPCIONAL: Limpia las tablas antes de empezar para que no se dupliquen datos
        // Desactivamos checks de llaves foráneas para poder vaciar tablas con relaciones
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('equipamientos_vehiculos')->truncate();
        EquipamientoOpcional::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. Definimos una lista de equipamientos comunes
        $equipamientos = [
            'Techo Panorámico', 'Asientos de Cuero', 'Sistema de Sonido Premium',
            'Navegador GPS', 'Cámara 360º', 'Control de Crucero Adaptativo',
            'Llantas de Aleación 19"', 'Faros Matrix LED', 'Apple CarPlay / Android Auto',
            'Sensores de Aparcamiento', 'Asientos Calefactables', 'Paquete Deportivo M / S-Line'
        ];

        // 2. Insertamos los equipamientos
        foreach ($equipamientos as $item) {
            EquipamientoOpcional::create(['equipamiento' => $item]);
        }

        // 3. Asignar equipamientos aleatorios
        $todosLosEquipamientos = EquipamientoOpcional::all();
        $vehiculos = Vehiculo::all();

        // Verificación de seguridad en consola
        if ($vehiculos->count() === 0) {
            $this->command->warn("No hay vehículos en la base de datos. No se puede llenar la tabla intermedia.");
            return;
        }

        foreach ($vehiculos as $vehiculo) {
            // Tomamos entre 2 y 5 IDs aleatorios y los convertimos explícitamente a Array
            $randomExtrasIds = $todosLosEquipamientos->random(rand(2, 5))->pluck('id')->toArray();
            
            // Usamos sync() en lugar de attach(). 
            // sync() es más seguro porque evita duplicados si vuelves a correr el seeder.
            $vehiculo->equipamientos()->sync($randomExtrasIds);
        }

        $this->command->info("Equipamientos asignados correctamente a " . $vehiculos->count() . " vehículos.");
    }
}