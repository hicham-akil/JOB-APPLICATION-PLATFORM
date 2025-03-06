<?php

use App\Models\Application;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Conversat extends Model
{
    protected $fillable = [
        'application_id', 'applicant_user_id', 'company_user_id', 'message'
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function applicant()
    {
        return $this->belongsTo(User::class, 'applicant_user_id');
    }

    public function company()
    {
        return $this->belongsTo(User::class, 'company_user_id');
    }
}
