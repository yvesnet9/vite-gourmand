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
    Schema::create('images_menu', function (Blueprint $table) {
        $table->id();
        $table->foreignId('menu_id')->constrained('menus')->onDelete('cascade');
        $table->string('url', 500);
        $table->string('alt_text', 255)->nullable();
        $table->integer('ordre')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images_menu');
    }
};
