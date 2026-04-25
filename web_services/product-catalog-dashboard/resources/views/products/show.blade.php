<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $product['title'] }} | Product Details</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="min-h-screen bg-[#fdfcfb] text-stone-900 antialiased">
    @php
        $images = $product['images'] ?? [];
        $reviews = $product['reviews'] ?? [];
        $tags = $product['tags'] ?? [];
        $dimensions = $product['dimensions'] ?? [];
        $meta = $product['meta'] ?? [];
        $price = \Illuminate\Support\Number::currency($product['price'] ?? 0, 'USD');
        $discountedPrice = ($product['price'] ?? 0) * (1 - (($product['discountPercentage'] ?? 0) / 100));
        $discountedPriceLabel = \Illuminate\Support\Number::currency($discountedPrice, 'USD');
        $rating = number_format((float) ($product['rating'] ?? 0), 1);
        $reviewCount = count($reviews);
        $stock = (int) ($product['stock'] ?? 0);
        $availabilityStatus = $product['availabilityStatus'] ?? 'Availability unknown';
    @endphp

    <div class="relative isolate overflow-hidden">
        <div
            class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.06),transparent_25%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.06),transparent_22%)]">
        </div>

        <header class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div class="flex items-center justify-between border-b border-stone-200 pb-8">
                <a href="{{ route('products.index') }}"
                    class="group inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-stone-950">
                    <svg class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to catalog
                </a>

            </div>
        </header>

        <main class="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div class="grid gap-12 lg:grid-cols-2">
                <div class="space-y-6">
                    <div class="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
                        <img src="{{ $product['thumbnail'] ?? ($images[0] ?? 'https://placehold.co/900x900?text=Product') }}"
                            alt="{{ $product['title'] }}" class="aspect-square w-full object-cover">
                    </div>

                    @if(count($images) > 1)
                        <div class="grid grid-cols-4 gap-4">
                            @foreach (array_slice($images, 0, 4) as $image)
                                <div class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                                    <img src="{{ $image }}" alt="{{ $product['title'] }} image"
                                        class="aspect-square w-full object-cover">
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>

                {{-- Product Info --}}
                <div class="flex flex-col">
                    <div class="flex flex-wrap items-center gap-3">
                        <span
                            class="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 border border-amber-100">
                            {{ $product['category'] ?? 'General' }}
                        </span>
                        @if (!empty($product['brand']))
                            <span
                                class="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-600 border border-stone-200">
                                {{ $product['brand'] }}
                            </span>
                        @endif
                    </div>

                    <h1 class="mt-6 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
                        {{ $product['title'] }}
                    </h1>

                    <div class="mt-6 flex items-center gap-6">
                        <div>
                            <p class="text-3xl font-bold text-stone-950">{{ $price }}</p>
                            @if(($product['discountPercentage'] ?? 0) > 0)
                                <p class="mt-1 text-sm font-medium text-emerald-600">Special price:
                                    {{ $discountedPriceLabel }}</p>
                            @endif
                        </div>
                        <div class="h-10 w-px bg-stone-200"></div>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1">
                                <span class="text-xl font-bold text-stone-950">{{ $rating }}</span>
                                <svg class="h-5 w-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="text-sm text-stone-500">({{ $reviewCount }} reviews)</span>
                        </div>
                    </div>

                    <p class="mt-8 text-lg leading-8 text-stone-600">
                        {{ $product['description'] ?? 'No description available.' }}
                    </p>

                    <div class="mt-10 grid gap-4 sm:grid-cols-2">
                        <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                            <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Availability</p>
                            <p class="mt-2 text-xl font-bold text-stone-950">{{ $stock }} in stock</p>
                            <p
                                class="mt-1 text-sm {{ $stock < 25 ? 'text-rose-600' : 'text-emerald-600' }} font-medium">
                                {{ $availabilityStatus }}
                            </p>
                        </div>
                        <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                            <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Warranty</p>
                            <p class="mt-2 text-base font-bold text-stone-950 leading-tight">
                                {{ $product['warrantyInformation'] ?? 'Standard warranty applies' }}
                            </p>
                            <p class="mt-1 text-sm text-stone-500">
                                {{ $product['shippingInformation'] ?? 'Standard shipping' }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-8 flex flex-wrap gap-2">
                        @foreach ($tags as $tag)
                            <span
                                class="rounded-full bg-stone-50 px-3 py-1 text-xs font-medium text-stone-500 border border-stone-100">
                                #{{ $tag }}
                            </span>
                        @endforeach
                    </div>
                </div>
            </div>

            {{-- Reviews Section --}}
            <section class="mt-20">
                <div class="border-t border-stone-200 pt-12">
                    <h2 class="text-2xl font-bold text-stone-950">Customer Reviews</h2>
                    <div class="mt-8 grid gap-6 md:grid-cols-2">
                        @forelse ($reviews as $review)
                            <article class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                                <div class="flex items-center justify-between">
                                    <p class="font-bold text-stone-950">{{ $review['reviewerName'] ?? 'Verified Buyer' }}
                                    </p>
                                    <span class="text-xs text-stone-400 font-medium">
                                        {{ \Illuminate\Support\Carbon::parse($review['date'] ?? now())->format('M d, Y') }}
                                    </span>
                                </div>
                                <div class="mt-2 flex items-center gap-1">
                                    @for($i = 0; $i < 5; $i++)
                                        <svg class="h-3.5 w-3.5 {{ $i < ($review['rating'] ?? 0) ? 'text-amber-400' : 'text-stone-200' }} fill-current"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    @endfor
                                </div>
                                <p class="mt-4 text-stone-600 leading-relaxed italic">
                                    "{{ $review['comment'] ?? 'No comment provided.' }}"</p>
                            </article>
                        @empty
                            <div
                                class="col-span-2 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center text-stone-500">
                                No reviews available yet.
                            </div>
                        @endforelse
                    </div>
                </div>
            </section>
        </main>
    </div>
</body>

</html>
