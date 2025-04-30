<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\EnquireController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\OTPController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Api\UploadCsvApiController;
use App\Models\Enquire;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware([\App\Http\Middleware\CustomMiddleware::class]);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/send-otp-email', [AuthController::class, 'sendOtpToEmail']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::get('/dashboard', [AuthController::class, 'dashboard']);
Route::post('/logout', [AuthController::class, 'logout']);
// category api----------------------
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
// subcategory api----------------------
Route::get('/subcategories', [SubcategoryController::class, 'index']);
Route::post('/subcategories', [SubCategoryController::class, 'store']);
Route::get('/subcategories/{id}', [SubCategoryController::class, 'show']);
Route::put('/subcategories/{id}', [SubCategoryController::class, 'update']);
Route::delete('/subcategories/{id}', [SubCategoryController::class, 'destroy']);
Route::get('/subcategories/by-category/{categoryId}', [SubcategoryController::class, 'getByCategory']);
Route::get('/products/related/{subcategory_id}', [ProductController::class, 'relatedProducts']);


// product api routes------------
Route::prefix('products')->group(function () {

    Route::get('/', [ProductController::class, 'index']);
    Route::get('popular', [ProductController::class, 'popular']);
    Route::get('color/{color}', [ProductController::class, 'getByColor']);
    Route::post('/', [ProductController::class, 'store']);
    // Route::get('{id}', [ProductController::class, 'show']);
    Route::get('{slug}', [ProductController::class, 'show']);
    Route::put('{id}', [ProductController::class, 'update']);
    Route::delete('{id}', [ProductController::class, 'destroy']);
});
// Enquire----------
Route::get('/enquiries', [EnquireController::class, 'index']); // Get all
Route::post('/enquiries', [EnquireController::class, 'store']); // Store new
Route::get('/enquiries/{id}', [EnquireController::class, 'show']); // Get by ID
Route::delete('/enquiries/{id}', [EnquireController::class, 'destroy']); // Delete by ID
Route::prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'getAllUsers']);
    Route::get('/sellers', [UserController::class, 'getAllSeller']);
});

// otp----
Route::post('/send-otp', [OTPController::class, 'sendOtp']);
Route::post('/verify-otp', [OTPController::class, 'verifyOtp']);

// blog----
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);
Route::post('/blogs', [BlogController::class, 'store']);
Route::put('/blogs/{id}', [BlogController::class, 'update']);
Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
Route::post('/upload-csv-api',[UploadCsvApiController::class,'uploadCsv']);
