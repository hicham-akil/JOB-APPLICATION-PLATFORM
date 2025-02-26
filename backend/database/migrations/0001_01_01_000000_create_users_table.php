<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['student', 'company', 'admin'])->default('student');
            $table->integer('age')->nullable(); // Age field
            $table->string('school_or_company_name')->nullable(); // For school (students) or company name (companies)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

