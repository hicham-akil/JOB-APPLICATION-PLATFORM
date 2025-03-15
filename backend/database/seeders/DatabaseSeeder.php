<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UsersSeeder;
use Database\Seeders\JobsSeeder;
use Database\Seeders\JobDetailsSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersSeeder::class,
            JobsSeeder::class,
            JobDetailsSeeder::class,
        ]);
    }
}
