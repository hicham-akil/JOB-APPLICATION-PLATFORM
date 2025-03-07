<?php
namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use App\Models\job_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
 class ApplicationController extends Controller
    {
        public function store(Request $request)
{
    $validated = $request->validate([
        'job_id' => 'required|exists:jobs,id',
        'user_id' => 'required|exists:users,id',
        'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
        'name' => 'required|string',
        'prenom' => 'required|string',
        'cin' => 'required|string',
        'phone' => 'required|string',
        'email' => 'required|email',
        'cover_letter' => 'nullable|string',
        'linkedin' => 'nullable|url',
        'portfolio' => 'nullable|url',
        'expected_salary' => 'nullable|numeric',
        'start_date' => 'nullable|date',
    ]);

    $resumePath = $request->file('resume')->store('resumes', 'public');

    $application = Application::create(array_merge($validated, ['resume' => $resumePath]));

    return response()->json(['message' => 'Application submitted successfully!', 'application' => $application], 201);
}
public function deleteaply($jobid){
    $user=Auth::user();
    $userId = $user->id;
    $deleted=application::where(user_id,$userId )->where(job_id,$jobId)->delete();
    if ($deleted) {
        return response()->json(['message' => 'Application deleted successfully'], 200);
    } else {
        return response()->json(['message' => 'No application found'], 404);
    }
}


    public function index($jobId)
    {
        $applications = Application::where('job_id', $jobId)->with('user')->get();
        return response()->json($applications);
    }
    public function getApplicationsByUser($userId)
{
    $applications = Application::where('user_id', $userId)->get();

    return response()->json($applications);
}
public function getJobApplications($jobId)
{
    $applications = Application::where('job_id', $jobId)
                                ->with('user') 
                                ->get();

    return response()->json($applications);
}

public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:pending,accepted,rejected',
    ]);

    $application = Application::findOrFail($id);
    $application->status = $request->status;
    $application->save();

    return response()->json(['message' => 'Status updated successfully', 'application' => $application]);
}


public function getApplicationCountsByUser(Request $request)
{
    $user=Auth::user();
    $userId = $user->id;

    if (!$userId) {
        return response()->json(['error' => 'User not authenticated'], 401);
    }

    $acceptedCount = Application::where('user_id', $userId)
                                ->where('status', 'accepted')
                                ->count();
    $rejectedCount = Application::where('user_id', $userId)
                                ->where('status', 'rejected')
                                ->count();

    return response()->json([
        'acceptedCount' => $acceptedCount,
        'rejectedCount' => $rejectedCount,
    ]);
}


public function getUserApplications(Request $request)
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Fetch accepted jobs and eager load the related user (company)
    $acceptedJobs = Job::with('user') // Eager load the company (user) details
                        ->whereIn('id', function ($query) use ($user) {
                            $query->select('job_id')
                                  ->from('applications')
                                  ->where('user_id', $user->id)
                                  ->where('status', 'accepted');
                        })->get();

    // Fetch rejected jobs and eager load the related user (company)
    $rejectedJobs = Job::with('user') // Eager load the company (user) details
                        ->whereIn('id', function ($query) use ($user) {
                            $query->select('job_id')
                                  ->from('applications')
                                  ->where('user_id', $user->id)
                                  ->where('status', 'rejected');
                        })->get();

    if ($acceptedJobs->isEmpty() && $rejectedJobs->isEmpty()) {
        return response()->json([
            'message' => 'No jobs found for this user.',
        ]);
    }

    // Include the user (company) name in the response
    return response()->json([
        'acceptedJobs' => $acceptedJobs->map(function ($job) {
            $job->company_name = $job->user->name; // Add the company name from the user
            return $job;
        }),
        'rejectedJobs' => $rejectedJobs->map(function ($job) {
            $job->company_name = $job->user->name; // Add the company name from the user
            return $job;
        }),
    ]);
}


public function getJobDetails($jobId)
{
    $job = Job::find($jobId);

    if (!$job) {
        return response()->json(['error' => 'Job not found'], 404);
    }

    $jobDetails = job_detail::where('job_id', $jobId)->first();

    return response()->json([
        'job' => $job,
        'jobDetails' => $jobDetails,
    ]);
}





}

