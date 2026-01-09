<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cursos_empleados', function (Blueprint $table) {
            $table->datetime('fecha_finalizacion');

            $table->foreignId('curso_id')
                        ->constrained('cursos')
                        ->onDelete('cascade');

            $table->foreignId('empleado_id')
                        ->constrained('empleados')
                        ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos_empleados');
    }
};
