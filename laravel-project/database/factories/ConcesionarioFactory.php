<?php

namespace Database\Factories;

use App\Models\Ciudad;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConcesionarioFactory extends Factory
{
    public function definition(): array
    {
        $coordenadasCiudades = [
            'Madrid'    => ['lat' => 40.4167, 'lng' => -3.7032],
            'Barcelona' => ['lat' => 41.3851, 'lng' => 2.1734],
            'Sevilla'   => ['lat' => 37.3891, 'lng' => -5.9845],
            'Bilbao'    => ['lat' => 43.2630, 'lng' => -2.9350],
            'Valencia'  => ['lat' => 39.4699, 'lng' => -0.3763],
            'Malaga'    => ['lat' => 36.7212, 'lng' => -4.4214],
        ];

       
        $ciudadNombre = $this->faker->randomElement(array_keys($coordenadasCiudades));
        $centro = $coordenadasCiudades[$ciudadNombre];

        return [
            'nombre' => 'Automóviles ' . $this->faker->lastName . ' ' . $ciudadNombre,
            'telefono' => '+34 ' . $this->faker->numerify('#########'),
            
           
           
            'latitud' => $centro['lat'] + $this->faker->latitude(-0.05, 0.05),
            'longitud' => $centro['lng'] + $this->faker->longitude(-0.05, 0.05),
            
            'ciudad_id' => \App\Models\Ciudad::first()->id ?? 1, 
            'isDeleted' => false,
        ];
    }
}
