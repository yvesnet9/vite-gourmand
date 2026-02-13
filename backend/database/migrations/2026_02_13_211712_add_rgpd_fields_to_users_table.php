<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('consentement_rgpd')->default(false)->after('active');
            $table->timestamp('date_consentement')->nullable()->after('consentement_rgpd');
            $table->boolean('newsletter')->default(false)->after('date_consentement');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['consentement_rgpd', 'date_consentement', 'newsletter']);
        });
    }
};
