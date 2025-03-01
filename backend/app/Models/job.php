<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'description', 'location', 'type', 'salary'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function job_detail()
    {
        return $this->hasOne(job_detail::class, 'job_id'); 
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
