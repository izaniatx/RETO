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
        Schema::create('concesionarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('telefono', 20);
            $table->foreignId('ciudad_id')
                ->constrained('ciudades')
                ->onDelete('cascade');
            $table->decimal('latitud', 10, 8)->nullable();
            $table->decimal('longitud', 11, 8)->nullable();
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concesionarios');
    }
};
