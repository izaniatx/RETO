<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehiculo;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Semillas de configuración base (Roles y Usuarios)
        $this->call([
            RolSeeder::class,
            TablaUsuariosSeeder::class,
        ]);

        // 2. Semillas de Datos Maestros (Marcas, Modelos, etc.)
        // Supongo que DatosVehiculosSeeder llena marcas y modelos
        $this->call([
            DatosVehiculosSeeder::class,
        ]);

        // 3. Crear los Vehículos (Usando el Factory)
        // Esto asegura que existan coches ANTES de ponerles equipamiento
        Vehiculo::factory()->count(20)->create();

        // 4. Ejecutar el seeder de Equipamientos
        // Ahora sí, encontrará los 20 vehículos creados arriba
        $this->call([
            EquipamientoSeeder::class,
        ]);
    }
}