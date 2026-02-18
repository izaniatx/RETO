<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehiculo;
use App\Models\Pais;
use App\Models\Territorio;
use App\Models\Ciudad;
use App\Models\Concesionario;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
 
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        Vehiculo::truncate();
        Concesionario::truncate();
        Ciudad::truncate();
        Territorio::truncate();
        Pais::truncate();
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        
        $this->call([
            RolSeeder::class,
            EstadosSeeder::class,
            DatosVehiculosSeeder::class, 
            CursoSeeder::class,
        ]);

     
        $pais = Pais::create(['pais' => 'España']);

        $zonas = [
            'Euskadi' => [
                'Bilbao' => ['lat' => 43.2630, 'lng' => -2.9350],
                'San Sebastián' => ['lat' => 43.3183, 'lng' => -1.9812],
                'Vitoria' => ['lat' => 42.8467, 'lng' => -2.6716],
            ],
            'Madrid' => [
                'Madrid' => ['lat' => 40.4167, 'lng' => -3.7032],
                'Getafe' => ['lat' => 40.3083, 'lng' => -3.7327],
                'Alcalá de Henares' => ['lat' => 40.4820, 'lng' => -3.3596],
            ],
            'Catalunya' => [
                'Barcelona' => ['lat' => 41.3851, 'lng' => 2.1734],
                'Girona' => ['lat' => 41.9794, 'lng' => 2.8214],
                'Tarragona' => ['lat' => 41.1189, 'lng' => 1.2445],
            ],
            'Andalucía' => [
                'Sevilla' => ['lat' => 37.3891, 'lng' => -5.9845],
                'Málaga' => ['lat' => 36.7212, 'lng' => -4.4214],
                'Granada' => ['lat' => 37.1773, 'lng' => -3.5986],
            ],
            'Galicia' => [
                'Vigo' => ['lat' => 42.2406, 'lng' => -8.7207],
                'A Coruña' => ['lat' => 43.3623, 'lng' => -8.4115],
            ],
            'Comunidad Valenciana' => [
                'Valencia' => ['lat' => 39.4699, 'lng' => -0.3763],
                'Alicante' => ['lat' => 38.3452, 'lng' => -0.4810],
            ]
        ];

        foreach ($zonas as $nombreTerritorio => $ciudades) {
            $territorio = Territorio::create([
                'pais_id' => $pais->id,
                'comunidad_autonoma' => $nombreTerritorio
            ]);

            foreach ($ciudades as $nombreCiudad => $coords) {
                $ciudad = Ciudad::create([
                    'territorio_id' => $territorio->id,
                    'ciudad' => $nombreCiudad
                ]);

                Concesionario::create([
                    'nombre' => "Automóviles " . $nombreCiudad . " " . fake()->lastName(),
                    'telefono' => '+34 ' . fake()->numerify('#########'),
                    'latitud' => $coords['lat'],  
                    'longitud' => $coords['lng'], 
                    'ciudad_id' => $ciudad->id,
                    'isDeleted' => false,
                ]);
            }
        }

     
        $this->call([TablaUsuariosSeeder::class]);

     
        if (Vehiculo::count() == 0) {
            Vehiculo::factory()->count(20)->create();
            $this->call([EquipamientoSeeder::class]);
        }
    }
}