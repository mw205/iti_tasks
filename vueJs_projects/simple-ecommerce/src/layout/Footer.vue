<template>
  <footer class="px-3 pb-5 sm:px-5">
    <div
      class="glass-panel mx-auto grid w-full max-w-295 gap-8 rounded-4xl px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]"
    >
      <div class="max-w-sm">
        <p class="text-sm font-bold uppercase tracking-[0.28em] text-teal-700">
          Stride
        </p>
        <h3 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
          Cleaner sneaker shopping with better visual focus.
        </h3>
        <p class="mt-3 text-sm leading-7 text-slate-500">
          Discover elevated everyday footwear, quick delivery, and a storefront
          designed to help you choose faster.
        </p>
      </div>

      <nav class="space-y-3">
        <h6 class="text-sm font-extrabold uppercase tracking-[0.24em] text-slate-400">
          Shop
        </h6>
        <RouterLink to="/" class="block text-sm font-semibold text-slate-600 hover:text-slate-950">
          New arrivals
        </RouterLink>
        <RouterLink to="/" class="block text-sm font-semibold text-slate-600 hover:text-slate-950">
          Running
        </RouterLink>
        <RouterLink to="/" class="block text-sm font-semibold text-slate-600 hover:text-slate-950">
          Lifestyle
        </RouterLink>
      </nav>

      <nav class="space-y-3">
        <h6 class="text-sm font-extrabold uppercase tracking-[0.24em] text-slate-400">
          Company
        </h6>
        <RouterLink to="/about" class="block text-sm font-semibold text-slate-600 hover:text-slate-950">
          About us
        </RouterLink>
        <a class="block text-sm font-semibold text-slate-600 hover:text-slate-950">
          Shipping
        </a>
        <a class="block text-sm font-semibold text-slate-600 hover:text-slate-950">
          Support
        </a>
      </nav>

      <div class="space-y-3">
        <h6 class="text-sm font-extrabold uppercase tracking-[0.24em] text-slate-400">
          Contact
        </h6>
        <p class="text-sm font-semibold text-slate-600">support@stride.shop</p>
        <p class="text-sm font-semibold text-slate-600">Cairo, Egypt</p>
        <p class="text-sm font-semibold text-slate-600">Open daily, 9am to 8pm</p>
      </div>
    </div>
  </footer>
</template>
