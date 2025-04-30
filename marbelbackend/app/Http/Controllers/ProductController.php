<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\ProductImage;
// use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['images', 'subcategory']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('color')) {
            $query->where('color', $request->color);
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
            'category_id' => 'required|exists:categories,id',
            'is_popular' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!$request->hasFile('product_image')) {
            return response()->json(['error' => 'Product image is required and must be a valid image file'], 422);
        }
        $imagePath = $request->file('product_image')->store('uploads/products', 'public');

        $product = Product::create(array_merge(
            $request->except('product_image'),
            ['product_image' => $imagePath]
        ));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $image_name = uniqid() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/products'), $image_name);

                ProductImage::create([
                    'product_id' => $product->id, // <-- corrected this
                    'image_path' => 'uploads/products/' . $image_name,
                ]);
            }
        }
        return response()->json($product, 201);
    }
    
    // public function update(Request $request, $id)
    // {
    //     $product = Product::find($id);
    //     if (!$product) {
    //         return response()->json(['message' => 'Product not found'], 404);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         'product_name' => 'sometimes|string|max:255',
    //         'product_slug' => 'required|string|max:255',
    //         'product_image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         // 'product_image' => 'required|string',
    //         'product_video' => 'nullable|string',
    //         'product_desc' => 'nullable|string',
    //         'size' => 'nullable|string',
    //         'surface' => 'nullable|string',
    //         'FOB_price' => 'nullable|numeric',
    //         'material_type' => 'nullable|string',
    //         'color' => 'nullable|string',
    //         'min_order' => 'nullable|integer',
    //         'port' => 'nullable|string',
    //         'material_origin' => 'nullable|string',
    //         'province_city' => 'nullable|string',
    //         'grade' => 'nullable|string',
    //         'subcategory_id' => 'sometimes|exists:subcategories,id',
    //         'category_id' => 'sometimes|exists:categories,id',
    //         'is_popular' => 'nullable|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     if ($request->hasFile('product_image')) {
    //         $imagePath = $request->file('product_image')->store('uploads/products', 'public');
    //         $product->update(array_merge($request->except('product_image'), ['product_image' => $imagePath]));
    //     } else {
    //         $product->update($request->except('product_image'));
    //     }

    //     return response()->json($product);
    // }


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
            'is_popular' => 'nullable|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Update product main image if uploaded
        if ($request->hasFile('product_image')) {
            $imagePath = $request->file('product_image')->store('uploads/products', 'public');
            $product->update(array_merge($request->except('product_image'), ['product_image' => $imagePath]));
        } else {
            $product->update($request->except('product_image'));
        }
    
        // ✅ Delete existing additional images
        foreach ($product->images as $image) {
            $imagePath = public_path($image->image_path);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            $image->delete();
        }
    
        // ✅ Upload new additional images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $image_name = uniqid() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/products'), $image_name);
    
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'uploads/products/' . $image_name,
                ]);
            }
        }
    
        return response()->json($product->load('images'));
    }
    

    
public function relatedProducts($subcategory_id)
{
    return Product::where('subcategory_id', $subcategory_id)
        ->latest()
        ->take(4)
        ->get();
}
    public function show($slug)
{
    // Fetch the product by slug
    $product = Product::with(['images', 'subcategory'])->where('product_slug', $slug)->first(); // Using 'product_slug' for matching

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

    public function popular()
    {
        return Product::where('is_popular', 1)->get();
    }

    public function getByColor($color)
    {
        $products = Product::where('color', $color)->get();
        return response()->json($products);
    }


}
