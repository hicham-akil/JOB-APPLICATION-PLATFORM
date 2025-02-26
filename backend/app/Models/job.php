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

    // Relationship: A job belongs to a company (user)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relationship: A job can have multiple applications
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
