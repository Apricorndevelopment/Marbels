<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Company;

class CompanyController extends Controller
{
    // Show company details by ID
    public function index($id)
    {
        $company = Company::where('user_id', $id)->first();

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        return response()->json($company);
    }

    // Store new company
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'company_name' => 'required|string|max:255',
            'establishment_year' => 'nullable|integer',
            'website' => 'nullable|url',
            'email' => 'nullable|email',
            'country_code' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'authorized_person' => 'nullable|string',
            'linkedin' => 'nullable|url',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $company = Company::create($validated);

        return response()->json([
            'message' => 'Company created successfully',
            'data' => $company
        ], 201);
    }

    // Update existing company
    public function update(Request $request, $id)
{
    $company = Company::where('user_id', $id)->first();

    if (!$company) {
        return response()->json(['message' => 'Company not found'], 404);
    }

    // Validate the incoming request
    $validated = $request->validate([
        'user_id' => 'nullable|exists:users,id',
        'company_name' => 'sometimes|required|string|max:255',
        'establishment_year' => 'nullable|integer',
        'website' => 'nullable|url',
        'email' => 'nullable|email',
        'country_code' => 'nullable|string',
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string',
        'city' => 'nullable|string',
        'country' => 'nullable|string',
        'description' => 'nullable|string',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'authorized_person' => 'nullable|string',
        'linkedin' => 'nullable|url',
    ]);

    // Handle logo upload only if a new file is uploaded
    if ($request->hasFile('logo')) {
        // Delete the old logo file from storage if necessary
        if ($company->logo) {
            Storage::disk('public')->delete($company->logo);
        }
        // Store the new logo
        $validated['logo'] = $request->file('logo')->store('logos', 'public');
    }

    // Remove keys with null values from the validated data before updating
    $validated = array_filter($validated, function ($value) {
        return !is_null($value);
    });

    // Update the company details with validated data
    $company->update($validated);

    return response()->json([
        'message' => 'Company updated successfully',
        'data' => $company
    ]);
}

}
