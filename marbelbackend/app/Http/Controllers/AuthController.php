<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

// use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{

    // register form
    // orignal
    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|unique:users,email',
    //         'password' => 'required|string|min:8|max:12',
    //         'role' => 'required|in:admin,user,seller',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //         'role' => $request->role,
    //     ]);

    //     $token = JWTAuth::fromUser($user);

    //     return response()->json([
    //         'message' => 'User registered successfully',
    //         'user' => $user,
    //         'token' => $token
    //     ], 201);
    // }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|max:12',
            'role' => 'required|in:admin,user,seller',
            'phone' => 'required|digits:10|unique:users,phone',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if OTP was verified — optional stricter check (use Redis or DB if needed)

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone_verified_at' => now(),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }


    // login from
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|max:12',
        ]);

        $user = User::where('email', $request->email)->first();


        if (!$user) {
            return response()->json(['error' => 'Invalid email address'], 401);
        } elseif (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Incorrect password'], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user->makeHidden(['password', 'created_at', 'updated_at']),  // Hide sensitive fields
        ]);
    }


    // dahboard
    public function dashboard(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token is expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        return response()->json([
            'user' => $user,
            'message' => 'Welcome to your dashboard'
        ]);
    }

    // logout
    public function logout(Request $request)
    {
        try {
            $token = JWTAuth::getToken();

            if (!$token) {
                return response()->json(['error' => 'Token not provided'], 401);
            }

            JWTAuth::invalidate($token);

            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Failed to log out'], 500);
        }
    }
}
