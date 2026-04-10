<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { computed, onMounted } from "vue";

defineProps({
  links: Array,
  shopName: String,
});

const productStore = useProductStore();
const cartStore = useCartStore();

const totalStock = computed(() => {
  return productStore.products.reduce((acc, product) => acc + product.stock, 0);
});

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
});
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/88 backdrop-blur-xl">
    <div
      class="mx-auto flex w-full max-w-295 flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-center justify-between gap-4">
        <RouterLink to="/" class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-extrabold tracking-[0.2em] text-white">
            S
          </div>
          <div class="leading-tight">
            <p class="text-base font-extrabold tracking-tight text-slate-950">
              {{ shopName }}
            </p>
            <p class="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Sneaker store
            </p>
          </div>
        </RouterLink>

        <RouterLink to="/cart"
          class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 lg:hidden">
          <span>Cart</span>
          <span class="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
      </div>

      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5">
        <nav class="flex flex-wrap items-center gap-1">
          <RouterLink v-for="link in links" :key="link.href" :to="link.href"
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            active-class="app-link-active">
            {{ link.text }}
          </RouterLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <div class="text-right">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
              Stock
            </p>
            <p class="text-sm font-bold text-slate-700">{{ totalStock }} items</p>
          </div>

          <RouterLink to="/cart" class="flex items-center gap-3 rounded-full bg-slate-900 px-4 py-2.5 text-white">
            <span class="text-sm font-bold">Cart</span>
            <span class="text-sm font-semibold text-slate-300">
              ${{ cartStore.totalPrice.toFixed(2) }}
            </span>
            <span class="rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-slate-900">
              {{ cartStore.totalItems }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
