<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\job_detail;
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
        $jobs = Job::where('user_id', $userId)->get();
        return response()->json($jobs);
    }
    
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        $user = Auth::user();
        if ($user->role !== 'company') {
            return response()->json(['message' => 'Only companies can post jobs'], 403);
        }
    
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'type' => 'required|string',
            'salary' => 'required|numeric',
            'requirements' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'company_website' => 'nullable|url',
            'company_values' => 'nullable|string',
        ]);
    
        try {
            $job = Job::create([
                'title' => $request->title,
                'description' => $request->description,
                'location' => $request->location,
                'type' => $request->type,
                'salary' => $request->salary,
                'user_id' => $user->id,
            ]);
    
            job_detail::create([
                'job_id' => $job->id,
                'requirements' => $request->requirements,
                'responsibilities' => $request->responsibilities,
                'company_website' => $request->company_website,
                'company_values' => $request->company_values,
            ]);
    
            return response()->json(['message' => 'Job posted successfully!', 'job' => $job], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to post job.'], 500);
        }
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
    $location = $request->input('location');

    $jobs = Job::query();

    if (!empty($query)) {
        $jobs->where('title', 'like', "%{$query}%");
    }

    if (!empty($location)) {
        $jobs->where('location', 'like', "%{$location}%");
    }

    return response()->json($jobs->get());
}
public function filterByLocation($location)
{
    $jobs = Job::where('location', 'LIKE', '%' . $location . '%')->get();
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

    