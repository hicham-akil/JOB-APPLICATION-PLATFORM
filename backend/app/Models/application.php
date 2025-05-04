<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_id',
        'name',
        'prenom',
        'cin',
        'phone',
        'email',
        'resume',
        'cover_letter',
        'linkedin',
        'portfolio',
        'start_date',
        'experience',
        'education',
       'skills',
       'interview_availability',
        'status',
        'expected_salary',
        'github',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }
}
