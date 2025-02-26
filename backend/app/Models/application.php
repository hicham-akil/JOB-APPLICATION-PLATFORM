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
        'resume',
        'status',
        'name',
        'prenom',
        'cin',
        'phone',
        'email',
        'cover_letter',
        'linkedin',
        'portfolio',
        'expected_salary',
        'start_date',
    ];

    // Relationship: An application belongs to a student (user)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relationship: An application belongs to a job
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }
}
