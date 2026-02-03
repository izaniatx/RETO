<?php

namespace Database\Factories;

use App\Models\Vehiculo;
use Illuminate\Database\Eloquent\Factories\Factory;


class VehiculoFactory extends Factory
{
    protected $model = Vehiculo::class;

    public function definition(): array
    {
        return [
            'color' => $this->faker->randomElement([
                'Rojo', 'Blanco', 'Negro', 'Gris', 'Azul'
            ]),
            'precio' => $this->faker->numberBetween(8000, 60000),

            'fecha_alta' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'fecha_venta' => $this->faker->optional(0.4)->dateTimeBetween('now', '+3 months'),
            'imagen' => 'vehiculos/default.jpg',
            'marca_id' => $this->faker->numberBetween(1, 4),
            'carroceria_id' => $this->faker->numberBetween(1, 4),
            'modelo_id' => $this->faker->numberBetween(1, 4),
        ];
    }
}
