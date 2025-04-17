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
        $request->validate([
            'subcategorie_name' => 'required|string|max:255',
            'subcategorie_slug' => 'required|string|max:255|unique:subcategories',
            'category_id' => 'required|exists:categories,id',
        ]);

        $subcategory = Subcategory::create($request->all());
        return response()->json($subcategory, 201);
    }

    public function show($id)
    {
        return Subcategory::with('category')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'subcategorie_name' => 'sometimes|required|string|max:255',
            'subcategorie_slug' => 'sometimes|required|string|max:255|unique:subcategories,subcategorie_slug,' . $id,
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $subcategory = Subcategory::findOrFail($id);
        $subcategory->update($request->all());
        return response()->json($subcategory, 200);
    }

    public function destroy($id)
    {
        $subcategory = Subcategory::findOrFail($id);
        $subcategory->delete();
        return response()->json(null, 204);
    }
}
