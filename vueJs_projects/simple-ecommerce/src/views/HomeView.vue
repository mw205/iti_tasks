<script setup>
import { onMounted } from "vue";
import CarouselBanner from "@/components/CarouselBanner.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/productStore.js";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<template>
  <section class="space-y-10 pb-8">
    <CarouselBanner />

    <section class="glass-panel rounded-4xl px-6 py-8 sm:px-8">
      <div
        class="mb-8 flex flex-col gap-4 border-b border-slate-200/70 pb-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div class="max-w-2xl">
          <p class="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-teal-700">
            New season drop
          </p>
          <h2 class="section-title">Clean design, strong comfort, daily-ready pairs.</h2>
          <p class="section-copy mt-3">
            A refined selection of sneakers built for movement, training, and
            all-day wear. Explore standout silhouettes without the clutter.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <div class="badge-soft">Premium cushioning</div>
          <div class="badge-soft">Limited offers</div>
          <div class="badge-soft">Fast local delivery</div>
        </div>
      </div>

      <div
        v-if="productStore.loading"
        class="flex min-h-72 items-center justify-center"
      >
        <span class="loading loading-spinner loading-lg text-teal-700"></span>
      </div>

      <div
        v-else-if="productStore.error"
        class="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700"
      >
        We couldn’t load the products right now.
      </div>

      <div
        v-else
        class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </section>
</template>
