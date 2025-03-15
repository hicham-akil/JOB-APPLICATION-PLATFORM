<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;
use App\Models\User;
use Faker\Factory as Faker;

class JobsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        // Create sample jobs
        $companies = User::where('role', 'company')->get();

        foreach ($companies as $company) {
            Job::create([
                'user_id' => $company->id,
                'title' => $faker->jobTitle,
                'description' => $faker->paragraph,
                'location' => $faker->city,
                'type' => $faker->randomElement(['internship', 'full-time', 'part-time']),
                'salary' => $faker->randomFloat(2, 500, 5000),
            ]);
        }
    }
}
