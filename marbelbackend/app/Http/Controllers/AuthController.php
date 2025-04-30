<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|max:12',
            'role' => 'required|in:admin,user,seller',
            'phone' => 'required|digits:10|unique:users,phone',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check email OTP
        $otpRecord = DB::table('otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->where('expires_at', '>=', now())
            ->first();

        if (!$otpRecord) {
            return response()->json(['error' => 'Invalid or expired OTP'], 401);
        }

        // Proceed with registration
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone_verified_at' => now(),
        ]);

        DB::table('otps')->where('email', $request->email)->delete();

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }


    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:8|max:12',
        'role' => 'required|in:user,seller,admin', // Add allowed roles
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['error' => 'Invalid email address'], 401);
    }

    if (!Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Incorrect password'], 401);
    }

    if ($user->role !== $request->role) {
        return response()->json(['error' => 'Invalid role selected'], 401);
    }

    $token = JWTAuth::fromUser($user);

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user->makeHidden(['password', 'created_at', 'updated_at']),
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

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $token = Str::random(64);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        $frontendURL = env('FRONTEND_URL', 'http://localhost:3000');

        $resetLink = "{$frontendURL}/reset-password?token={$token}&email={$request->email}";

        Mail::raw("Click the link to reset your password: $resetLink", function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Reset Password Link');
        });

        return response()->json(['message' => 'Reset password link sent to your email.']);
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $record = DB::table('password_reset_tokens')->where([
            'email' => $request->email,
            'token' => $request->token
        ])->first();

        if (!$record) {
            return response()->json(['error' => 'Invalid or expired token'], 400);
        }

        User::where('email', $request->email)->update([
            'password' => Hash::make($request->password)
        ]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password has been reset successfully.']);
    }


    public function sendOtpToEmail(Request $request)
{
    $request->validate([
        'email' => 'required|email|unique:users,email',
    ]);

    $otp = rand(100000, 999999);

    DB::table('otps')->updateOrInsert(
        ['email' => $request->email],
        [
            'otp' => $otp,
            'expires_at' => now()->addMinutes(10),
            'created_at' => now(),
            'updated_at' => now()
        ]
    );

    Mail::raw("Your OTP is: {$otp}. It expires in 10 minutes.", function ($message) use ($request) {
        $message->from(config('mail.from.address'), config('mail.from.name'));
        $message->to($request->email)
                ->subject('Your OTP Code');
    });

    return response()->json([
        'message' => 'OTP sent to email successfully'
    ], 200);
}
}