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
        Schema::create('empleados_turnos', function (Blueprint $table) {
            $table->foreignId('turno_id')
               ->constrained('turnos')
               ->onDelete('cascade');

            $table->foreignId('empleado_id')
                        ->constrained('empleados')
                        ->onDelete('cascade');

            $table->boolean('isDeleted')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados_turnos');
    }
};
