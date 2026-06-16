<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TransactionController;

Route::middleware('api')->prefix('api')->group(function () {
    // User route
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    // Categories routes
    Route::apiResource('categories', CategoryController::class);

    // Products routes
    Route::apiResource('products', ProductController::class);

    // Transactions routes
    Route::apiResource('transactions', TransactionController::class);
});
