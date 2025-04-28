<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Log;
class ProfileController extends Controller
{
    public function getProfile()
    {
        $user = Auth::user();
        $profile = $user->profile;
        return response()->json([
            'user' => $user,
            'profile' => $profile
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:500',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();
        $user->name = $request->name;
        $user->save();

        $profile = $user->profile ?? new Profile();
        $profile->user_id = $user->id;
        $profile->bio = $request->bio;

        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($profile->profile_picture) {
                Storage::delete($profile->profile_picture);
            }

            // Store new profile picture
            $imagePath = $request->file('profile_picture')->store('profile_pictures', 'public');
            $profile->profile_picture = $imagePath;
        }

        $profile->save();

        return response()->json([
            'message' => 'Profile updated successfully!',
            'user' => $user,
            'profile' => $profile
        ]);
    }
    public function getUserProfile($id)
    {
        $user = User::findOrFail($id);
        $profile = $user->Profile;
    
        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }
    public function uploadResume(Request $request)
    {
        $user = Auth::user();
        $userid = $user->id;
    
        try {
            if (!$request->hasFile('resume')) {
                Log::error('No resume file found in the request.');
                return response()->json(['error' => 'No resume uploaded'], 400);
            }
    
            $file = $request->file('resume');
    
            if (!$file->isValid()) {
                Log::error('Uploaded file is not valid.');
                return response()->json(['error' => 'Invalid file upload'], 400);
            }
    
            // Save file to storage/app/public/resumes
            $path = $file->store('resumes', 'public'); // Corrected this line
            $filename = basename($path);
    
            $profile = Profile::where('user_id', $userid)->first();
    
            if ($profile) {
                $profile->resume = $filename;
                $profile->save();
    
                Log::info('Resume uploaded and linked to profile.', ['user_id' => $userid, 'filename' => $filename]);
            } else {
                Log::error('Profile not found for user.', ['user_id' => $userid]);
                return response()->json(['error' => 'Profile not found.'], 404);
            }
    
            return response()->json([
                'message' => 'Resume uploaded and saved successfully',
                'resume_url' => asset('storage/resumes/' . $filename), // send full URL
            ], 200);
    
        } catch (\Exception $e) {
            Log::error('Error uploading resume: ' . $e->getMessage());
            return response()->json([
                'error' => 'Something went wrong while uploading the resume.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
    

}
