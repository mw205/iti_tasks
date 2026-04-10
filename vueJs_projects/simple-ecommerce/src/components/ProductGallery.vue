<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
  products: Array,
});
</script>

<template>
  <section class="glass-panel rounded-4xl px-6 py-8 sm:px-8">
    <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-bold uppercase tracking-[0.28em] text-slate-400">
          More to explore
        </p>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
          Similar pairs you may like
        </h2>
      </div>
      <p class="max-w-md text-sm leading-7 text-slate-500">
        Browse related styles with the same clean visual language and quick
        purchase flow.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
