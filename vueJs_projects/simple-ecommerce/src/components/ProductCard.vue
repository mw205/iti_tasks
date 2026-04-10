<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";

const cartStore = useCartStore();

const props = defineProps({
  product: Object,
});

const discountedPrice = computed(() => {
  return (
    props.product.price - (props.product.price * props.product.discount) / 100
  );
});
</script>

<template>
  <article class="group glass-panel relative overflow-hidden rounded-4xl p-4">
    <div class="absolute right-4 top-4 z-10 flex flex-wrap justify-end gap-2">
      <span v-if="product.stock === 0"
        class="rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
        Out of stock
      </span>
      <span v-else-if="product.discount > 0"
        class="rounded-full bg-amber-300 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-slate-900">
        -{{ product.discount }}%
      </span>
      <span v-if="product.badge"
        class="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-800">
        {{ product.badge }}
      </span>
    </div>

    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="rounded-[1.75rem] bg-linear-to-br from-slate-100 to-white p-6 ring-1 ring-slate-200/70">
        <img :src="product.image" :alt="product.name"
          class="h-56 w-full object-contain transition duration-300 group-hover:scale-[1.04]" />
      </div>
    </RouterLink>

    <div class="space-y-5 px-2 pb-2 pt-6">
      <div class="space-y-2">
        <p class="text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
          Performance footwear
        </p>
        <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">
          {{ product.name }}
        </h2>
        <p class="line-clamp-2 text-sm leading-6 text-slate-500">
          {{ product.description }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div>
          <p v-if="product.discount > 0" class="text-sm font-semibold text-slate-400 line-through">
            ${{ product.price.toFixed(2) }}
          </p>
          <p class="text-3xl font-extrabold tracking-tight text-slate-950">
            ${{ discountedPrice.toFixed(2) }}
          </p>
        </div>
        <div class="rounded-full px-3 py-2 text-sm font-bold" :class="product.stock === 0
            ? 'bg-red-50 text-red-600'
            : 'bg-emerald-50 text-emerald-700'
          ">
          {{ product.stock === 0 ? "Unavailable" : `${product.stock} left` }}
        </div>
      </div>

      <div class="flex gap-3">
        <RouterLink :to="`/product/${product.id}`" class="btn btn-soft flex-1 rounded-full">
          Details
        </RouterLink>
        <button class="btn btn-brand flex-1 rounded-full" @click="cartStore.addToCart(product)"
          :disabled="product.stock === 0">
          {{ product.stock === 0 ? "Sold out" : "Add to cart" }}
        </button>
      </div>
    </div>
  </article>
</template>
