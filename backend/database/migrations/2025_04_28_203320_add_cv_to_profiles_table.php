<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('profiles', function (Blueprint $table) {
            // Add the 'resume' field to the 'profiles' table
            $table->string('resume')->nullable(); // Stores the resume file path or name
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('profiles', function (Blueprint $table) {
            // Drop the 'resume' column if the migration is rolled back
            $table->dropColumn('resume');
        });
    }
};
