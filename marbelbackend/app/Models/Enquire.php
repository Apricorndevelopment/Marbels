<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enquire extends Model
{
    protected $table = 'enquires';

    protected $fillable = ['name', 'email', 'phone', 'product', 'message'];
}
