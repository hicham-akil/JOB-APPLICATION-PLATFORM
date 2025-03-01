<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DataController extends Controller
{
   

    public function index()
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        $user = Auth::user();
    
        if ($user->role == 'student') {
            $jobs = Job::all();
            return response()->json($jobs);
        }
    
        if ($user->role == 'company') {
            return response()->json([
                'message' => 'Show form to add a job offer',
                'form_fields' => [
                    'title' => 'Title of the job',
                    'description' => 'Job Description',
                    'location' => 'Location',
                    'type' => 'Job Type (Full-time/Part-time)',
                    'salary' => 'Salary'
                ]
            ]);
        }
    
        return response()->json(['message' => 'Invalid role'], 403);
    }
    
    public function getJobsByUser($userId)
    {
        // Assuming your jobs table has a `user_id` column
        $jobs = Job::where('user_id', $userId)->get();
        return response()->json($jobs);
    }
    
    public function store(Request $request)
    {
        Log::info('🔍 Received job data:', $request->all()); 
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'type' => 'required|string',
            'salary' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
        ]);
    
        $job = Job::create($request->all());
    
        Log::info('✅ Job created:', $job->toArray()); // Log success
    
        return response()->json($job, 201);
    }
    public function getCompanyJobs($companyId)
    {
        $jobs = Job::where('user_id', $companyId)
                    ->withCount('applications')
                    ->get();
    
        return response()->json($jobs);
    }
    public function destroy($jobId)
{
    $job = Job::find($jobId);

    if (!$job) {
        return response()->json(['message' => 'Job not found'], 404);
    }

    $job->delete();
    return response()->json(['message' => 'Job deleted successfully']);
}

    public function search(Request $request)
    {
        $query = $request->input('query');

        $jobs = Job::where('title', 'like', "%{$query}%")->get();

        return response()->json($jobs);
    }

    public function show($id)
    {
        $job = Job::with('job_detail')->find($id);
    
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }
    
        return response()->json($job);
    }
    


    
    }
