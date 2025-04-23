<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use Illuminate\Http\Request;

class SubcategoryController extends Controller
{
    public function index()
    {
        return Subcategory::with('category')->get();
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'subcategorie_name' => 'required|string|max:255',
                'subcategorie_slug'  => 'required|string|max:255|unique:subcategories',
                'category_id'        => 'required|exists:categories,id',
                'image'              => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
    
            $imageName = null;
            if ($request->hasFile('image')) {
                $image      = $request->file('image');
                $imageName  = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/subcategories'), $imageName);
            }
    
            $subcategory = Subcategory::create([
                'subcategorie_name' => $request->subcategorie_name,
                'subcategorie_slug' => $request->subcategorie_slug,
                'category_id'       => $request->category_id,
                'image'             => $imageName,
            ]);
    
            return response()->json($subcategory, 201);
    
        } catch (\Exception $e) {
            // return JSON error so frontend doesn’t try to parse HTML
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'subcategorie_name' => 'required|string|max:255',
    //         'subcategorie_slug' => 'required|string|max:255|unique:subcategories',
    //         'category_id' => 'required|exists:categories,id',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    //     ]);
    //     $imageName = null;
    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
    //         $image->move(public_path('uploads/categories'), $imageName);
    //     }

    //     $subcategory = Subcategory::create([
    //         'subcategorie_name' => $request->subcategorie_name,
    //         'subcategorie_slug' => $request->subcategorie_slug,
    //         'image' => $imageName,
    //     ]);
    //     // $subcategory = Subcategory::create($request->all());
    //     return response()->json($subcategory, 201);
    // }

    public function show($id)
    {
        return Subcategory::with('category')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate incoming data
            $request->validate([
                'subcategorie_name' => 'sometimes|required|string|max:255',
                'subcategorie_slug' => 'sometimes|required|string|max:255|unique:subcategories,subcategorie_slug,' . $id,
                'category_id'       => 'sometimes|required|exists:categories,id',
                'image'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
    
            $subcategory = Subcategory::findOrFail($id);
    
            // Handle new image upload
            if ($request->hasFile('image')) {
                $oldImagePath = public_path('uploads/subcategories/' . $subcategory->image);
                if ($subcategory->image && file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
    
                $image      = $request->file('image');
                $imageName  = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/subcategories'), $imageName);
                $subcategory->image = $imageName;
            }
    
            // Only update fields if present in the request
            if ($request->filled('subcategorie_name')) {
                $subcategory->subcategorie_name = $request->input('subcategorie_name');
            }
    
            if ($request->filled('subcategorie_slug')) {
                $subcategory->subcategorie_slug = $request->input('subcategorie_slug');
            }
    
            if ($request->filled('category_id')) {
                $subcategory->category_id = $request->input('category_id');
            }
    
            $subcategory->save();
    
            return response()->json($subcategory, 200);
    
        } catch (\Illuminate\Validation\ValidationException $ve) {
            // Return JSON validation errors
            return response()->json([
                'errors' => $ve->errors(),
            ], 422);
    
        } catch (\Exception $e) {
            // Catch-all for other exceptions
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

    public function destroy($id)
    {
        $subcategory = Subcategory::findOrFail($id);
        $subcategory->delete();
        return response()->json(null, 204);
    }
}
