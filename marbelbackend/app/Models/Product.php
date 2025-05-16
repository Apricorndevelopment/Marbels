<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_name',
        'product_slug',
        'product_image',
        'product_video',
        'product_desc',
        'size',
        'surface',
        'FOB_price',
        'material_type',
        'color',
        'min_order',
        'port',
        'material_origin',
        'province_city',
        'grade',
        'subcategory_id',
        'category_id',
        'is_popular',
        'additonal_name',
        'seller_id',
        'stock',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class, 'subcategory_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
}
