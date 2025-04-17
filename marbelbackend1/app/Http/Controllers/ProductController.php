<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // public function index()
    // {
    //     return response()->json(Product::with(['images', 'subcategory'])->get());

    // }
    public function index(Request $request)
    {
        $query = Product::with(['images', 'subcategory']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $products = $query->get();

        return response()->json($products);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'product_slug' => 'required|string|max:255',
            'product_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'product_video' => 'nullable|string',
            'product_desc' => 'nullable|string',
            'size' => 'nullable|string',
            'surface' => 'nullable|string',
            'FOB_price' => 'nullable|numeric',
            'material_type' => 'nullable|string',
            'color' => 'nullable|string',
            'min_order' => 'nullable|integer',
            'port' => 'nullable|string',
            'material_origin' => 'nullable|string',
            'province_city' => 'nullable|string',
            'grade' => 'nullable|string',
            'subcategory_id' => 'required|exists:subcategories,id',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        // $imageUrl = $request->product_image;
        // $imageContents = Http::get($imageUrl)->body();
        // $imageName = 'uploads/products/' . time() . '.jpg';
        // Storage::disk('public')->put($imageName, $imageContents);
        // ✅ Ensure file is actually uploaded
        if (!$request->hasFile('product_image')) {
            return response()->json(['error' => 'Product image is required and must be a valid image file'], 422);
        }

        // ✅ Store the file securely
        $imagePath = $request->file('product_image')->store('uploads/products', 'public');

        // ✅ Save product with image path
        $product = Product::create(array_merge(
            $request->except('product_image'),
            ['product_image' => $imagePath]
        ));

        return response()->json($product, 201);
    }


    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'product_name' => 'sometimes|string|max:255',
            'product_slug' => 'required|string|max:255',
            'product_image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            // 'product_image' => 'required|string',
            'product_video' => 'nullable|string',
            'product_desc' => 'nullable|string',
            'size' => 'nullable|string',
            'surface' => 'nullable|string',
            'FOB_price' => 'nullable|numeric',
            'material_type' => 'nullable|string',
            'color' => 'nullable|string',
            'min_order' => 'nullable|integer',
            'port' => 'nullable|string',
            'material_origin' => 'nullable|string',
            'province_city' => 'nullable|string',
            'grade' => 'nullable|string',
            'subcategory_id' => 'sometimes|exists:subcategories,id',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('product_image')) {
            $imagePath = $request->file('product_image')->store('uploads/products', 'public');
            $product->update(array_merge($request->except('product_image'), ['product_image' => $imagePath]));
        } else {
            $product->update($request->except('product_image'));
        }

        return response()->json($product);
    }


    public function show($id)
    {
        $product = Product::with(['images', 'subcategory'])->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }



    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
