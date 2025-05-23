<?php
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use Symfony\Component\HttpKernel\DataCollector\DataCollector;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::post('/profile/update', [ProfileController::class, 'updateProfile']);
    Route::post('/upload-resume', [ProfileController::class, 'uploadResume']);
});

Route::middleware('auth:sanctum')->get('/jobs', [DataController::class, 'index']); 
Route::get('/jobs/search', [DataController::class, 'search']);
Route::get('/jobs/location/{location}', [DataController::class, 'filterByLocation']);
Route::get('/locations', [DataController::class, 'getLocations']);

Route::get('/jobs/{id}', [DataController::class, 'show']);
Route::get('/companies/{companyId}/jobs', [DataController::class, 'getCompanyJobs']);
Route::middleware('auth:sanctum')->post('/jobs', [DataController::class, 'store']); 
Route::get('/users/{userId}/jobs', [DataController::class, 'getJobsByUser']);
Route::delete('/jobs/{job}', [DataController::class, 'destroy']);

Route::get('/users/{id}', [ProfileController::class, 'getUserProfile']); 

Route::middleware('auth:sanctum')->post('/applications', [ApplicationController::class, 'store']); 
Route::middleware('auth:sanctum')->get('/applications/{jobId}', [ApplicationController::class, 'index']); 
Route::middleware('auth:sanctum')->delete('/applications/{jobId}/delete', [ApplicationController::class, 'deleteaply']); 
Route::middleware('auth:sanctum')->get('/users/{userId}/applications', [ApplicationController::class, 'getApplicationsByUser']); // Get applications by user
Route::get('jobs/{jobId}/applications', [ApplicationController::class, 'getJobApplications']);
Route::put('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);

Route::get('/applications', [ApplicationController::class, 'getUserApplications']);

Route::middleware('auth:sanctum')->post('/applications/count', [ApplicationController::class, 'getApplicationCountsByUser']);

Route::middleware('auth:sanctum')->post('/applications/details', [ApplicationController::class, 'getUserApplications']);
Route::get('/jobs/{jobId}/details', [ApplicationController::class, 'getJobDetails']);

Route::post('conversations', [ConversationController::class, 'store']);
// Route::middleware('auth:sanctum')->post('/contact', [ContactController::class, 'store']);

