<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";

const cartStore = useCartStore();
const props = defineProps({ product: Object });

const discountedPrice = computed(() => {
  return (
    props.product.price - (props.product.price * props.product.discount) / 100
  );
});

const handleBuy = () => {
  if (props.product.stock > 0) {
    cartStore.addToCart(props.product);
  }
};
</script>

<template>
  <section class="glass-panel mx-auto max-w-260 overflow-hidden rounded-4xl">
    <div class="grid gap-6 px-5 py-5 lg:grid-cols-[0.92fr_1.08fr] lg:px-6 lg:py-6">
      <div class="rounded-[1.75rem] bg-linear-to-br from-white to-slate-100 p-4 ring-1 ring-slate-200/70 sm:p-5">
        <img :src="product.image" :alt="product.name"
          class="mx-auto h-full max-h-100 w-full max-w-104 object-contain" />
      </div>

      <div class="flex flex-col justify-center gap-5 py-1">
        <div class="flex flex-wrap gap-2">
          <span v-if="product.stock === 0"
            class="rounded-full bg-red-600 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.2em] text-white">
            Out of stock
          </span>
          <span v-else-if="product.discount > 0"
            class="rounded-full bg-amber-300 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.2em] text-slate-900">
            Save {{ product.discount }}%
          </span>
          <span v-if="product.badge"
            class="rounded-full bg-sky-100 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-sky-800">
            {{ product.badge }}
          </span>
        </div>

        <div>
          <p class="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
            Featured sneaker
          </p>
          <h1 class="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-4xl">
            {{ product.name }}
          </h1>
          <p class="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            {{ product.description }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <span v-for="tag in product.tags" :key="tag"
            class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 ring-1 ring-slate-200">
            {{ tag }}
          </span>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-[1.35rem] bg-white p-4 ring-1 ring-slate-200/80">
            <p class="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              Price
            </p>
            <div class="mt-4 space-y-3">
              <div class="flex items-end gap-3">
                <p class="text-3xl font-extrabold tracking-[-0.05em] text-slate-950">
                  ${{ discountedPrice.toFixed(2) }}
                </p>
                <span v-if="product.discount > 0"
                  class="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-800">
                  Save {{ product.discount }}%
                </span>
              </div>
              <div v-if="product.discount > 0" class="flex items-center gap-2 text-sm text-slate-500">
                <span class="font-semibold">Was</span>
                <span class="font-bold line-through">
                  ${{ product.price.toFixed(2) }}
                </span>
                <span class="text-slate-300">•</span>
                <span class="font-semibold text-emerald-700">
                  You save ${(product.price - discountedPrice).toFixed(2)}
                </span>
              </div>
              <p v-else class="text-sm font-semibold text-slate-500">
                Premium everyday pricing
              </p>
            </div>
          </div>
          <div class="rounded-[1.35rem] bg-white p-4 ring-1 ring-slate-200/80">
            <p class="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              Stock
            </p>
            <p class="mt-3 text-2xl font-extrabold tracking-tight"
              :class="product.stock > 0 ? 'text-emerald-700' : 'text-red-600'">
              {{ product.stock }}
            </p>
            <p class="mt-2 text-sm text-slate-500">
              {{ product.stock > 0 ? "Ready to ship" : "Restock pending" }}
            </p>
          </div>
          <div class="rounded-[1.35rem] bg-slate-900 p-4 text-white">
            <p class="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              Delivery
            </p>
            <p class="mt-3 text-2xl font-extrabold tracking-tight">2-4 days</p>
            <p class="mt-2 text-sm text-white/70">Fast regional fulfillment</p>
          </div>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <button class="btn btn-brand flex-1 rounded-full px-6" @click="handleBuy" :disabled="product.stock === 0">
            {{ product.stock > 0 ? "Add to cart" : "Currently unavailable" }}
          </button>
          <RouterLink to="/cart" class="btn btn-soft flex-1 rounded-full px-6">
            Review cart
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
