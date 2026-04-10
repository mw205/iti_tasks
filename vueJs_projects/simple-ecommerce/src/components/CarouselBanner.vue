<template>
  <section class="glass-panel overflow-hidden rounded-[2.25rem]">
    <div class="grid min-h-128 gap-0 lg:grid-cols-[1.15fr_0.85fr]">
      <div class="relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.14),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(240,249,255,0.78))]">
        </div>

        <div class="relative z-10 flex h-full flex-col justify-between gap-10">
          <div class="space-y-6">
            <div class="badge-soft w-fit">
              Spring 2026 collection
            </div>
            <div class="max-w-xl space-y-4">
              <h1 class="text-4xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
                Sneakers that look sharp and wear even better.
              </h1>
              <p class="max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
                Minimal, comfortable, and built to move. Discover performance
                pairs and lifestyle staples with a cleaner shopping experience.
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <RouterLink to="/" class="btn btn-brand rounded-full px-6">
                Shop now
              </RouterLink>
              <RouterLink to="/about" class="btn btn-soft rounded-full px-6">
                Why Stride
              </RouterLink>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-3xl bg-white/75 p-4 shadow-sm ring-1 ring-slate-200/70">
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Comfort
              </p>
              <p class="mt-2 text-2xl font-extrabold text-slate-900">All-day</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">
                Cushioned support for commuting, training, and travel.
              </p>
            </div>
            <div class="rounded-3xl bg-slate-900 p-4 text-white shadow-sm">
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Edit
              </p>
              <p class="mt-2 text-2xl font-extrabold">Curated</p>
              <p class="mt-2 text-sm leading-6 text-slate-300">
                Fewer choices, better products, faster decisions.
              </p>
            </div>
            <div class="rounded-3xl bg-amber-100 p-4 shadow-sm ring-1 ring-amber-200/60">
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                Offers
              </p>
              <p class="mt-2 text-2xl font-extrabold text-slate-900">Up to 30%</p>
              <p class="mt-2 text-sm leading-6 text-slate-700">
                Limited discounts on featured running and streetwear pairs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative min-h-88 bg-slate-900">
        <img
          src="https://contents.mediadecathlon.com/p2393880/k$2218276b66b7e147c6cd53323fb131e4/men-s-running-shoes-jogflow-1001-black-grey.jpg"
          alt="Featured sneaker" class="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div class="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div class="rounded-[1.75rem] bg-white/12 p-5 text-white backdrop-blur-md ring-1 ring-white/20">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
              Featured pair
            </p>
            <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 class="text-2xl font-extrabold">Urban Motion Runner</h2>
                <p class="mt-1 text-sm text-white/70">
                  Lightweight upper, responsive sole, and a cleaner silhouette.
                </p>
              </div>
              <RouterLink to="/product/1"
                class="inline-flex items-center gap-2 self-start rounded-full border border-white/18 bg-slate-900/80 px-5 py-3 text-sm font-bold text-white transition hover:border-white/30 hover:bg-slate-950">
                <span>View pair</span>
                <span class="text-base leading-none">→</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
