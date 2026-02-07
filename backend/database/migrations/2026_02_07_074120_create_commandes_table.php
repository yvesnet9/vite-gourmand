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
    Schema::create('commandes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('menu_id')->constrained('menus')->onDelete('restrict');
        $table->integer('nb_personnes');
        $table->date('date_prestation');
        $table->time('heure_prestation');
        $table->text('adresse_livraison');
        $table->string('ville_livraison', 100);
        $table->string('code_postal', 10);
        $table->decimal('distance_km', 10, 2)->default(0);
        $table->decimal('prix_menu', 10, 2);
        $table->decimal('prix_livraison', 10, 2)->default(0);
        $table->decimal('reduction', 10, 2)->default(0);
        $table->decimal('prix_total', 10, 2);
        $table->enum('statut', [
            'en_attente',
            'accepte',
            'en_preparation',
            'en_cours_livraison',
            'livre',
            'en_attente_retour_materiel',
            'terminee',
            'annulee'
        ])->default('en_attente');
        $table->boolean('pret_materiel')->default(false);
        $table->date('date_retour_materiel')->nullable();
        $table->text('motif_annulation')->nullable();
        $table->string('mode_contact_annulation', 50)->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
