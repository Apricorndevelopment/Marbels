<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_name',
        'product_image',
        'product_video',
        'product_desc',
        'size',
        'surface',
        'FOB_price',
        'material_type',
        'min_order',
        'port',
        'material_origin',
        'province_city',
        'grade',
        'category_id'
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
