<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //
    protected $table = 'blogs';
    protected $fillable = ['blog_name','blog_type', 'blog_slug', 'blog_shortdesc', 'blog_desc', 'blog_image', 'post_by'];
}
