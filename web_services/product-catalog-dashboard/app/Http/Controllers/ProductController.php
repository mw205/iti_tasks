<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(): View
    {
        $response = Http::get('https://dummyjson.com/products');

        return view('products.index', [
            'products' => $response->json('products', []),
        ]);
    }

    public function show(int $id): View
    {
        $response = Http::get("https://dummyjson.com/products/{$id}");

        return view('products.show', [
            'product' => $response->json(),
        ]);
    }
}
