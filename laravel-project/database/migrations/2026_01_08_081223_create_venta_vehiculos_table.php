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
        Schema::create('venta_vehiculos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
               ->constrained('users')
               ->onDelete('cascade');

            $table->foreignId('vehiculo_id')
                        ->constrained('vehiculos')
                        ->onDelete('cascade');

            $table->foreignId('mensaje_id')
                        ->constrained('mensajes')
                        ->onDelete('cascade');

            $table->foreignId('estado_id')
                        ->constrained('estados')
                        ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venta_vehiculos');
    }
};
