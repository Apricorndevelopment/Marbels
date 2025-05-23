<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\ProductController;
// use App\Http\Controllers\Api\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware([\App\Http\Middleware\CustomMiddleware::class]);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/dashboard', [AuthController::class, 'dashboard']);
Route::post('/logout', [AuthController::class, 'logout']);

// category api----------------------
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// subcategory api----------------------
Route::post('/subcategories', [SubcategoryController::class, 'store']);
Route::post('/subcategories', [SubCategoryController::class, 'store']);
Route::get('/subcategories/{id}', [SubCategoryController::class, 'show']);
Route::put('/subcategories/{id}', [SubCategoryController::class, 'update']);
Route::delete('/subcategories/{id}', [SubCategoryController::class, 'destroy']);


// product api routes------------

Route::prefix('products')->group(function () {

    Route::get('/', [ProductController::class, 'index']);

    Route::post('/', [ProductController::class, 'store']);

    Route::get('{id}', [ProductController::class, 'show']);

    // Update an existing product by ID
    Route::put('{id}', [ProductController::class, 'update']);

    // Delete a product by ID
    Route::delete('{id}', [ProductController::class, 'destroy']);
});
