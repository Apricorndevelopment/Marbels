<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OTPController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|numeric|digits:10'
        ]);

        $otp = rand(100000, 999999);

        DB::table('otps')->updateOrInsert(
            ['phone' => $request->phone],
            [
                'otp' => $otp,
                'expires_at' => now()->addMinutes(5),
                'created_at' => now(),
                'updated_at' => now()
            ]
        );

        Log::info("OTP for {$request->phone} is: $otp");

        return response()->json(['message' => 'OTP sent successfully.']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|numeric|digits:10',
            'otp' => 'required|numeric'
        ]);

        $otpData = DB::table('otps')->where('phone', $request->phone)->first();

        if (!$otpData || $otpData->otp !== $request->otp || now()->gt($otpData->expires_at)) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 400);
        }

        DB::table('otps')->where('phone', $request->phone)->delete();

        // Cache or store phone verification temporarily (optional: Redis, or set a session/flag)
        return response()->json(['message' => 'OTP verified successfully']);
    }
}
