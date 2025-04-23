<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = ['categorie_name', 'categorie_slug','image'];

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }
}
