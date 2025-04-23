<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::where('role', 'user')->get();
        return response()->json([
            'status' => true,
            'data' => $users
        ]);
    }

    public function getAllSeller()
    {
        $sellers = User::where('role', 'seller')->get();
        return response()->json([
            'status' => true,
            'data' => $sellers
        ]);
    }
}
