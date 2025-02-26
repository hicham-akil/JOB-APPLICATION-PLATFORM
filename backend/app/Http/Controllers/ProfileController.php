<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Profile;
use App\Models\User;

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
    

}
