<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    // 1) Whitelist all attributes you plan to mass-assign:
    protected $fillable = [
        'name',
        'email',
        'phone',             // ← added
        'password',
        'role',
        'phone_verified_at', // ← added
    ];

    // 2) Declare casts as a property, not a function:
    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',  // ← if you need to treat it as a Carbon instance
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function getJWTIdentifier()
    {
        return $this->getKey(); // The unique identifier for the user (typically the id)
    }
    public function getJWTCustomClaims()
    {
        return []; // You can add custom claims if needed, like user roles, etc.
    }
}
