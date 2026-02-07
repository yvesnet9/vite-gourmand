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
    Schema::create('plat_allergene', function (Blueprint $table) {
        $table->id();
        $table->foreignId('plat_id')->constrained('plats')->onDelete('cascade');
        $table->foreignId('allergene_id')->constrained('allergenes')->onDelete('cascade');
        $table->timestamps();

        // Éviter les doublons
        $table->unique(['plat_id', 'allergene_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plat_allergene');
    }
};
