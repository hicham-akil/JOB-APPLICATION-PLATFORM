<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Student
            $table->foreignId('job_id')->constrained()->onDelete('cascade'); // Job
            
            $table->string('name');
            $table->string('prenom');
            $table->string('cin')->unique();
            $table->string('phone');
            $table->string('email');
            
            $table->text('cover_letter')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('portfolio')->nullable();
            $table->decimal('expected_salary', 10, 2)->nullable();
            $table->date('start_date')->nullable();
            $table->text('experience')->nullable();
            $table->text('education')->nullable();
            $table->string('skills')->nullable();
            // $table->string('interview_availability')->nullable();
            $table->string('referral_source')->nullable();
            // $table->boolean('relocate')->default(false);
            // $table->string('languages')->nullable();
            $table->string('github')->nullable();
            // $table->string('nationality')->nullable();

            // Resume and Status
            $table->string('resume')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
