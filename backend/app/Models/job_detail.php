<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class job_detail extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'requirements',
        'responsibilities',
        'company_website',
        'company_values',
        'how_to_apply',
    ];

    // Define the relationship with Job
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
