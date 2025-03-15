<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;
use App\Models\job_detail;
use Faker\Factory as Faker;

class JobDetailsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        // Create sample job details for each job
        $jobs = Job::all();

        foreach ($jobs as $job) {
            job_detail::create([
                'job_id' => $job->id,
                'requirements' => $faker->paragraph,
                'responsibilities' => $faker->paragraph,
                'company_website' => $faker->url,
                'company_values' => $faker->paragraph,
                'how_to_apply' => $faker->sentence,
            ]);
        }
    }
}
