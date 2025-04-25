<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
    
        // Append full image URL to each category
        foreach ($categories as $cat) {
            $cat->image_url = $cat->image ? asset('uploads/categories/' . $cat->image) : null;
        }
    
        return response()->json($categories, 200);
    }
    

    public function store(Request $request)
    {
        $request->validate([
            'categorie_name' => 'required|string|max:255',
            'categorie_slug' => 'required|string|max:255|unique:categories',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
        ]);
        $imageName = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/categories'), $imageName);
        }

        // $category = Category::create($request->all());
        $category = Category::create([
            'categorie_name' => $request->categorie_name,
            'categorie_slug' => $request->categorie_slug,
            'image' => $imageName,
        ]);
    
    
        return response()->json($category, 201);
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }


    public function update(Request $request, $id)
{
    $request->validate([
        'categorie_name' => 'sometimes|required|string|max:255',
        'categorie_slug' => 'sometimes|required|string|max:255|unique:categories,categorie_slug,' . $id,
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $category = Category::findOrFail($id);

    if ($request->hasFile('image')) {
        // Optional: Delete old image from server
        if ($category->image && file_exists(public_path('uploads/categories/' . $category->image))) {
            unlink(public_path('uploads/categories/' . $category->image));
        }

        $image = $request->file('image');
        $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('uploads/categories'), $imageName);
        $category->image = $imageName;
    }

    // Update other fields
    $category->categorie_name = $request->categorie_name ?? $category->categorie_name;
    $category->categorie_slug = $request->categorie_slug ?? $category->categorie_slug;

    $category->save();

    return response()->json($category, 200);
}

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'categorie_name' => 'sometimes|required|string|max:255',
    //         'categorie_slug' => 'sometimes|required|string|max:255|unique:categories,categorie_slug,' . $id,
            
    //     ]);

    //     $category = Category::findOrFail($id);
    //     $category->update($request->all());
    //     return response()->json($category, 200);
    // }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
