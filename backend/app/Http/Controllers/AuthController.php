<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Psy\CodeCleaner\FunctionContextPass;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        // Validation
       $validated= $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'age' => 'required|integer',
            'school_or_company_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|string|same:password',
            'role' => 'required|in:student,company', 
        ]);

      
        $user = User::create($validated);

        return response()->json([
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.']
            ]);
        }

        $user = Auth::user();

        // Create token for the authenticated user
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('YourAppName')->plainTextToken,
        ], 201);
    }
    public function logout(Request $request) {
        if ($request->user()) {
            $request->user()->tokens()->delete();
        }
    
        return response()->json(['message' => 'Déconnexion réussie'], 200);
    }
    
}


