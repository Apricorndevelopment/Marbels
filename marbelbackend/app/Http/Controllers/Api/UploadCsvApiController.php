<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class UploadCsvApiController extends Controller
{
    public function uploadCsv(Request $request)
    {
        if (!$request->hasFile('upload_file')) {
            return response()->json(['status' => 'error', 'msg' => 'File is required'], 400);
        }

        $file = $request->file('upload_file');

        if (($open = fopen($file->getRealPath(), "r")) !== FALSE) {
            $r = 0;
            while (($row = fgetcsv($open, 1000, ",")) !== FALSE) {
                if ($r > 0) {
                    $product = new Product();
                    $product->product_name = $row[0];
                    $product->product_slug = $row[1];
                    $product->product_image = $row[2]; // This assumes the image is a filename or URL
                    $product->product_video = $row[3];
                    $product->product_desc = $row[4];
                    $product->size = $row[5];
                    $product->surface = $row[6];
                    $product->FOB_price = $row[7];
                    $product->material_type = $row[8];
                    $product->color = $row[9];
                    $product->min_order = $row[10];
                    $product->port = $row[11];
                    $product->material_origin = $row[12];
                    $product->province_city = $row[13];
                    $product->grade = $row[14];
                    $product->subcategory_id = $row[15];
                    $product->category_id = $row[16];
                    $product->is_popular = $row[17];
                    $product->save();
                }
                $r++;
            }
        }

        return response()->json(['status' => 'success', 'msg' => 'Products uploaded successfully']);
    }
}