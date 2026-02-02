<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Vehiculo;

class DatabaseSeeder extends Seeder
{
    
    public function run(): void
    {
        // User::factory(10)->create();

       $this->call([
                RolSeeder::class,
                TablaUsuariosSeeder::class,
                DatosVehiculosSeeder::class, // ✅ BIEN
            ]);


        Vehiculo::factory()->count(20)->create();

        /*User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );*/
    }
}
