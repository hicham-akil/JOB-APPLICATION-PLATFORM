<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('job_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('jobs')->onDelete('cascade'); // Job ID (Foreign Key)
            $table->text('requirements')->nullable(); // Additional requirements for the job
            $table->text('responsibilities')->nullable(); // Responsibilities for the job
            $table->string('company_website')->nullable(); // Company's website
            $table->text('company_values')->nullable(); // Company values/culture
            $table->text('how_to_apply')->nullable(); // How to apply instructions
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_details');
    }
};
