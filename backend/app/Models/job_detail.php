<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class job_detail extends Model
{
    use HasFactory;
    protected $table = 'job_details'; 
    protected $fillable = [
        'job_id',
        'requirements',
        'responsibilities',
        'company_website',
        'company_values',
        'how_to_apply',
    ];

    public function job()
    {
      return $this->belongsTo(Job::class, 'job_id');
    }
}
