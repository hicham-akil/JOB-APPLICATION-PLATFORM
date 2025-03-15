<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        // Create sample users
        User::create([
            'name' => $faker->firstName,
            'prenom' => $faker->lastName,
            'email' => $faker->unique()->safeEmail,
            'password' => bcrypt('password123'),
            'role' => 'student',
            'age' => $faker->numberBetween(18, 30),
            'school_or_company_name' => $faker->company,
        ]);

        User::create([
            'name' => $faker->firstName,
            'prenom' => $faker->lastName,
            'email' => $faker->unique()->safeEmail,
            'password' => bcrypt('password123'),
            'role' => 'company',
            'age' => $faker->numberBetween(25, 60),
            'school_or_company_name' => $faker->company,
        ]);

        User::create([
            'name' => $faker->firstName,
            'prenom' => $faker->lastName,
            'email' => $faker->unique()->safeEmail,
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'age' => $faker->numberBetween(30, 60),
            'school_or_company_name' => $faker->company,
        ]);
    }
}
