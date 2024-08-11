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
        Schema::create('url_links', function (Blueprint $table) {
            $table->id(); 
            $table->string('url');
            $table->string('title');
            $table->string('subject');
            $table->string('roomASsign');
            $table->string('teacher');
            $table->string('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
        
        Schema::create('videos_backlogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');  
            $table->foreignId('url_links_id')->constrained('url_links')->onDelete('cascade');  
            $table->string('duration_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('url_links');
    }
};
