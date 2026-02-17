<?php

namespace Database\Factories;

use App\Models\Territorio;
use Illuminate\Database\Eloquent\Factories\Factory;

class CiudadFactory extends Factory
{
    public function definition(): array
    {
        return [
            'territorio_id' => Territorio::factory(),
            'ciudad' => $this->faker->city(),
        ];
    }
}