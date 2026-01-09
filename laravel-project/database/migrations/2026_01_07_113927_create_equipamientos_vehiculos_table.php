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
        Schema::create('equipamientos_vehiculos', function (Blueprint $table) {

            $table->foreignId('equipamiento_id')
                        ->constrained('equipamientos_opcionales')
                        ->onDelete('cascade');

            $table->foreignId('vehiculo_id')
                        ->constrained('vehiculos')
                        ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipamientos_vehiculos');
    }
};
