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
    Schema::create('menus', function (Blueprint $table) {
        $table->id();
        $table->string('titre', 255);
        $table->text('description');
        $table->string('theme', 50);
        $table->string('regime', 50);
        $table->integer('nb_personne_min');
        $table->decimal('prix_base', 10, 2);
        $table->integer('stock')->default(0);
        $table->text('conditions')->nullable();
        $table->boolean('actif')->default(true);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
