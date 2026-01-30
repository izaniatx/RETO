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
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id();
            $table->string('color')->nullable();;
            $table->double('precio', 8, 2)->nullable();;
            $table->datetime('fecha_alta')->nullable();;
            $table->datetime('fecha_venta')->nullable();;
            $table->string('imagen');

            $table->foreignId('marca_id')
                        ->constrained('marcas')
                        ->onDelete('cascade');

            $table->foreignId('carroceria_id')
                        ->constrained('carrocerias')
                        ->onDelete('cascade');

            $table->foreignId('modelo_id')
                        ->constrained('modelos')
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
        Schema::dropIfExists('vehiculos');
    }
};
