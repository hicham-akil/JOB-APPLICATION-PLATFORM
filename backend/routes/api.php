<?php
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use Symfony\Component\HttpKernel\DataCollector\DataCollector;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::post('/profile/update', [ProfileController::class, 'updateProfile']);
});

Route::middleware('auth:sanctum')->get('/jobs', [DataController::class, 'index']); 
Route::get('/jobs/search', [DataController::class, 'search']);
Route::get('/jobs/{id}', [DataController::class, 'show']);
Route::get('/companies/{companyId}/jobs', [DataController::class, 'getCompanyJobs']);
Route::middleware('auth:sanctum')->post('/jobs', [DataController::class, 'store']); 
Route::get('/users/{userId}/jobs', [DataController::class, 'getJobsByUser']);
Route::delete('/jobs/{job}', [DataController::class, 'destroy']);

Route::get('/users/{id}', [ProfileController::class, 'getUserProfile']); 

Route::middleware('auth:sanctum')->post('/applications', [ApplicationController::class, 'store']); // Apply for a job
Route::middleware('auth:sanctum')->get('/applications/{jobId}', [ApplicationController::class, 'index']); // Get applications for a specific job
Route::middleware('auth:sanctum')->get('/users/{userId}/applications', [ApplicationController::class, 'getApplicationsByUser']); // Get applications by user
Route::get('jobs/{jobId}/applications', [ApplicationController::class, 'getJobApplications']);
Route::put('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);

Route::get('/applications', [ApplicationController::class, 'getUserApplications']);

Route::middleware('auth:sanctum')->post('/applications/count', [ApplicationController::class, 'getApplicationCountsByUser']);

Route::middleware('auth:sanctum')->post('/applications/details', [ApplicationController::class, 'getUserApplications']);
Route::get('/jobs/{jobId}/details', [ApplicationController::class, 'getJobDetails']);


Route::post('conversations', [ConversationController::class, 'store']);
