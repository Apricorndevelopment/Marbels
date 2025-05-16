<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use App\Models\Product;
use App\Models\SubCategory;
use ZipArchive;

class UploadCsvController extends Controller
{
    public function uploadCsv(Request $request)
{
    try {
        $request->validate([
            'product_file' => 'required|file|mimes:csv,txt',
            'image_zip' => 'required|file|mimes:zip',
        ]);

        // Store and read CSV
        $csvPath = $request->file('product_file')->storeAs('temp', 'products.csv');
        $file = Storage::path($csvPath);
        $csvData = array_map('str_getcsv', file($file));
        $header = array_map('trim', $csvData[0]);

        // Extract ZIP
        $zip = new ZipArchive;
        $zipFile = $request->file('image_zip');
        $zipName = time() . '_images.zip';
        $zipPath = storage_path('app/temp/' . $zipName);
        $zipFile->move(storage_path('app/temp'), $zipName);

        $extractPath = public_path('product_images');
        if (!File::exists($extractPath)) {
            File::makeDirectory($extractPath, 0755, true);
        }

        if ($zip->open($zipPath) === TRUE) {
            $zip->extractTo($extractPath);
            $zip->close();
        } else {
            return response()->json(['msg' => 'Failed to extract ZIP'], 500);
        }

        // Process each row
        foreach (array_slice($csvData, 1) as $row) {
            $rowData = array_combine($header, $row);

            // Lookup subcategory and category
            $subcategory = SubCategory::where('subcategory_name', trim($rowData['subcategory_name'] ?? ''))->first();
            $category = \App\Models\Category::where('category_name', trim($rowData['category_name'] ?? ''))->first();

            if (!$subcategory || !$category) {
                Log::warning("Missing category/subcategory: " . json_encode($rowData));
                continue;
            }

            // Ensure image file exists in extracted folder
            $mainImage = 'product_images/' . $rowData['product_image'];
            if (!File::exists(public_path($mainImage))) {
                Log::warning("Image not found: " . $mainImage);
                continue;
            }

            // Create product
            Product::create([
                'product_name' => $rowData['product_name'],
                'product_slug' => $rowData['product_slug'],
                'product_image' => $mainImage,
                'product_video' => $rowData['product_video'] ?? null,
                'product_desc' => $rowData['product_desc'] ?? null,
                'size' => $rowData['size'] ?? null,
                'surface' => $rowData['surface'] ?? null,
                'FOB_price' => $rowData['FOB_price'] ?? null,
                'stock' => $rowData['stock'] ?? null,
                'material_type' => $rowData['material_type'] ?? null,
                'color' => $rowData['color'] ?? null,
                'min_order' => $rowData['min_order'] ?? null,
                'port' => $rowData['port'] ?? null,
                'material_origin' => $rowData['material_origin'] ?? null,
                'province_city' => $rowData['province_city'] ?? null,
                'grade' => $rowData['grade'] ?? null,
                'subcategory_id' => $subcategory->id,
                'category_id' => $category->id,
                'is_popular' => $rowData['is_popular'] ?? null,
                'additonal_name' => $rowData['additonal_name'] ?? null,
            ]);
        }

        return response()->json(['msg' => 'Products uploaded successfully!']);
    } catch (\Exception $e) {
        Log::error('Upload CSV Error: ' . $e->getMessage());
        return response()->json(['msg' => 'Something went wrong. Check logs.'], 500);
    }
}
}