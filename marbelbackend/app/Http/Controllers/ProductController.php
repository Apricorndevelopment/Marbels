<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['images', 'subcategory']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('subcategory_id')) {
            $query->where('subcategory_id', $request->subcategory_id);
        }

        if ($request->has('color')) {
            $query->where('color', $request->color);
        }

        if ($request->has('material_origin')) {
            $query->where('material_origin', $request->material_origin);
        }

        $products = $query->get();

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $user = Auth::user(); // ✅ Get authenticated user

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401); // Unauthorized if no user
        }

        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255',
            'product_slug' => 'required|string|max:255|unique:products,product_slug',
            'product_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'product_video' => 'nullable|string',
            'product_desc' => 'nullable|string',
            'size' => 'nullable|string',
            'surface' => 'nullable|string',
            'FOB_price' => 'nullable|numeric',
            'stock'=>'nullable|numeric',
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
            'additonal_name' => 'nullable|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // ✅ multiple image validation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // ✅ Check if the product image exists
        if (!$request->hasFile('product_image')) {
            return response()->json(['error' => 'Product image file is required'], 422);
        }

        // ✅ Store main product image
        $imagePath = $request->file('product_image')->store('uploads/products', 'public');

        // ✅ Prepare product data
        $productData = $request->except('product_image', 'images');
        $productData['product_image'] = $imagePath;

        // ✅ Assign seller_id or admin_id
        if ($user->role === 'seller') {
            $productData['seller_id'] = $user->id;
        } elseif ($user->role === 'admin') {
            $productData['admin_id'] = $user->id;
        }

        // ✅ Create product
        $product = Product::create($productData);

        // ✅ Store additional images if present
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = uniqid() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/products'), $imageName);

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'uploads/products/' . $imageName,
                ]);
            }
        }

        return response()->json($product->load('images'), 201);
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
            'product_video' => 'nullable|string',
            'product_desc' => 'nullable|string',
            'size' => 'nullable|string',
            'surface' => 'nullable|string',
            'FOB_price' => 'nullable|numeric',
            'stock'=>'nullable|numeric',
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
            'additonal_name' => 'nullable|string',
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

    public function sellerproduct(Request $request)
    {
        // Seller ID ko request ke through pass karen
        $seller_id = $request->input('seller_id');

        // Agar seller_id nahi hai ya invalid hai
        if (!$seller_id) {
            return response()->json(['message' => 'Seller ID is required'], 400);
        }

        // Seller ke products ko fetch karen
        $products = Product::with('images')
            ->where('seller_id', $seller_id)
            ->get();

        return response()->json($products);
    }


    // public function sellerproduct()
    // {

    //     $user = Auth::user(); // ✅ Authenticated user
    //     if (!$user || $user->role !== 'seller') {
    //         return response()->json(['message' => 'Unauthorized'], 403);
    //     }

    //     $products = Product::with('images')
    //         ->where('seller_id', $user->id)
    //         ->get();

    //     return response()->json($products);
    // }

    public function adminproduct()
    {

        $user = Auth::user();

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $products = Product::with('images')->get(); // Admin sees all
        return response()->json($products);
    }
}
