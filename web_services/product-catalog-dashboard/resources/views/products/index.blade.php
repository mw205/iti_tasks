<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Catalog</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="min-h-screen bg-[#fdfcfb] text-stone-900 antialiased">
    <div class="relative isolate overflow-hidden">
        <div
            class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.08),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.08),transparent_25%)]">
        </div>

        <header class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div class="flex flex-col items-center justify-between gap-4 border-b border-stone-200 pb-8 sm:flex-row">
                <div>
                    <h1 class="text-3xl font-semibold tracking-tight text-stone-950">Product Catalog</h1>
                    <p class="mt-1 text-stone-500">Discover our curated collection of premium goods.</p>
                </div>
                <div
                    class="inline-flex items-center rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-600 border border-stone-200">
                    {{ count($products) }} products available
                </div>
            </div>
        </header>

        <main class="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                @foreach ($products as $product)
                    @php
                        $price = \Illuminate\Support\Number::currency($product['price'] ?? 0, 'USD');
                        $rating = number_format((float) ($product['rating'] ?? 0), 1);
                        $stock = (int) ($product['stock'] ?? 0);
                        $isLowStock = $stock < 25;
                    @endphp

                    <a href="{{ route('products.show', $product['id']) }}"
                        class="group block relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1">
                        <div class="relative aspect-4/3 overflow-hidden">
                            <img src="{{ $product['thumbnail'] ?? ($product['images'][0] ?? 'https://placehold.co/600x600?text=Product') }}"
                                alt="{{ $product['title'] }}"
                                class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                            <div class="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                                <span
                                    class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-700 backdrop-blur shadow-sm border border-stone-100">
                                    {{ $product['category'] ?? 'General' }}
                                </span>
                                <span
                                    class="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider {{ $isLowStock ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100' }}">
                                    {{ $isLowStock ? 'Low stock' : 'In stock' }}
                                </span>
                            </div>
                        </div>

                        <div class="p-6">
                            <div class="flex items-start justify-between gap-4">
                                <div>
                                    <h3
                                        class="text-xl font-semibold text-stone-950 group-hover:text-amber-600 transition-colors">
                                        {{ $product['title'] }}</h3>
                                    <p class="mt-1 text-sm text-stone-500 line-clamp-2">
                                        {{ $product['description'] ?? 'No description available.' }}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6 flex items-center justify-between border-t border-stone-100 pt-5">
                                <div class="flex flex-col">
                                    <span
                                        class="text-xs uppercase tracking-widest text-stone-400 font-semibold">Price</span>
                                    <span class="text-lg font-bold text-stone-950">{{ $price }}</span>
                                </div>
                                <div class="flex flex-col items-end">
                                    <span
                                        class="text-xs uppercase tracking-widest text-stone-400 font-semibold">Rating</span>
                                    <div class="flex items-center gap-1.5 mt-0.5">
                                        <span class="text-sm font-bold text-stone-950">{{ $rating }}</span>
                                        <svg class="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
        </main>
    </div>
</body>

</html>
