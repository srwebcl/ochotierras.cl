<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->text('description_en')->nullable()->after('description');
            $table->text('short_description_en')->nullable()->after('short_description');
            $table->text('tasting_notes_en')->nullable()->after('tasting_notes');
            $table->text('pairing_en')->nullable()->after('pairing');
            $table->string('service_temp_en')->nullable()->after('service_temp');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->text('description_en')->nullable()->after('description');
        });

        Schema::table('hero_sections', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->string('subtitle_en')->nullable()->after('subtitle');
            $table->string('button_primary_text_en')->nullable()->after('button_primary_text');
            $table->string('button_secondary_text_en')->nullable()->after('button_secondary_text');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en', 'short_description_en', 'tasting_notes_en', 'pairing_en', 'service_temp_en']);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en']);
        });

        Schema::table('hero_sections', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'subtitle_en', 'button_primary_text_en', 'button_secondary_text_en']);
        });
    }
};
