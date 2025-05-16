<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'establishment_year',
        'website',
        'email',
        'country_code',
        'phone',
        'address',
        'city',
        'country',
        'pincode',
        'description',
        'logo',
        'authorized_person',
        'linkedin',
    ];
}
