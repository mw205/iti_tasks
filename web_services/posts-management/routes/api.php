<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix("v1")->group(function () {
    Route::get('posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('posts/{id}', [PostController::class, 'show'])->name('posts.show');
    Route::middleware("auth:sanctum")->group(
        function () {
            Route::post('posts', [PostController::class, 'store'])->name('posts.store');
            Route::put('posts/{id}', [PostController::class, 'update'])->name('posts.update');
            Route::delete('posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
        }
    );
    Route::post('register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
    Route::middleware("auth:sanctum")->group(
        function () {
            Route::get('me', [AuthController::class, 'me'])->name('auth.me');
            Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        }
    );
});
