<?php

namespace App\Http\Controllers;

use App\Models\Enquire;
use App\Mail\EnquiryMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class EnquireController extends Controller
{
    // Get all enquiries
    public function index()
    {
        $enquiries = Enquire::all();
        return response()->json($enquiries);
    }

    // Store a new enquiry
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'phone'   => 'required|string|max:20',
            'product' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $enquiry = Enquire::create($validated);
        Mail::to('developerapricorn1234@gmail.com')->send(new EnquiryMail($enquiry));
        return response()->json([
            'message' => 'Enquiry submitted successfully',
            'data' => $enquiry
        ], 201);
    }

    // Get enquiry by ID
    public function show($id)
    {
        $enquiry = Enquire::find($id);

        if (!$enquiry) {
            return response()->json(['message' => 'Enquiry not found'], 404);
        }

        return response()->json($enquiry);
    }

    // Delete an enquiry
    public function destroy($id)
    {
        $enquiry = Enquire::find($id);

        if (!$enquiry) {
            return response()->json(['message' => 'Enquiry not found'], 404);
        }

        $enquiry->delete();
        return response()->json(['message' => 'Enquiry deleted successfully']);
    }
}
