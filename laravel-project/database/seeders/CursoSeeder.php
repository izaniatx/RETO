<?php

namespace Database\Seeders;

use App\Models\Curso;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CursoSeeder extends Seeder
{
    public function run(): void
    {
        $cursos = [
           
            [
                'nombre' => 'Técnicas de Cierre de Ventas Automotriz',
                'descripcion' => 'Estrategias avanzadas para convertir leads en compradores reales en el showroom.',
                'categoria' => 'Ventas',
                'nivel' => 'Intermedio',
                'duracion' => 20,
            ],
            [
                'nombre' => 'Psicología del Comprador de Vehículos',
                'descripcion' => 'Cómo entender las necesidades del cliente según el segmento (SUV, Eléctricos, Lujo).',
                'categoria' => 'Ventas',
                'nivel' => 'Básico',
                'duracion' => 15,
            ],
           
            [
                'nombre' => 'Peritaje y Tasación de Vehículos de Ocasión',
                'descripcion' => 'Protocolo técnico para evaluar el estado mecánico y estético de coches usados.',
                'categoria' => 'Compras',
                'nivel' => 'Avanzado',
                'duracion' => 40,
            ],
            [
                'nombre' => 'Gestión de Stock y Rotación de Inventario',
                'descripcion' => 'Optimización del flujo de entrada y salida para maximizar beneficios.',
                'categoria' => 'Compras',
                'nivel' => 'Avanzado',
                'duracion' => 30,
            ],
           
            [
                'nombre' => 'Normativa Legal en Transferencias de Vehículos',
                'descripcion' => 'Todo sobre el cambio de titularidad, impuestos y trámites con la DGT.',
                'categoria' => 'Administración',
                'nivel' => 'Intermedio',
                'duracion' => 25,
            ],
            [
                'nombre' => 'Gestión de Garantías y Post-venta',
                'descripcion' => 'Administración de contratos de garantía y atención a reclamaciones legales.',
                'categoria' => 'Administración',
                'nivel' => 'Básico',
                'duracion' => 10,
            ],
        ];

        foreach ($cursos as $curso) {
            Curso::create([
                'nombre' => $curso['nombre'],
                'descripcion' => $curso['descripcion'],
                'categoria' => $curso['categoria'], 
                'nivel' => $curso['nivel'],
                'duracion_horas' => $curso['duracion'],
               
            
            ]);
        }
    }
}