<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'prenom',
        'email',
        'password',
        'role',
        'age',
        'school_or_company_name'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    // Relationship: A company (user) can post multiple jobs
    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    // Relationship: A student (user) can apply to multiple jobs
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    // Relationship: A user can send multiple messages
    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    // Relationship: A user can receive multiple messages
    public function receivedMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }
    public function profile()
{
    return $this->hasOne(Profile::class);
}

}
