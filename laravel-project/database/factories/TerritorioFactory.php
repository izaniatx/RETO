<?php

namespace Database\Factories;

use App\Models\Pais;
use Illuminate\Database\Eloquent\Factories\Factory;

class TerritorioFactory extends Factory
{
    public function definition(): array
    {
        return [
            'pais_id' => Pais::factory(),
            'comunidad_autonoma' => $this->faker->state(),
        ];
    }
}
