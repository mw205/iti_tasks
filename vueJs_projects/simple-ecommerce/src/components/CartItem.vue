<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";

const props = defineProps({
  cartItem: Object,
});

const cartStore = useCartStore();
const product = computed(() => props.cartItem.product);
const quantity = computed(() => props.cartItem.quantity);

const discountedPrice = computed(() => {
  return (
    (product.value.price -
      (product.value.price * product.value.discount) / 100) *
    quantity.value
  );
});

const removeFromCart = () => {
  cartStore.removeFromCart(product.value.id);
};

const addToCart = () => {
  cartStore.addToCart(product.value);
};
</script>

<template>
  <article class="grid gap-5 border-b border-slate-200/80 py-6 last:border-b-0 md:grid-cols-[8rem_1fr_auto]">
    <div class="rounded-3xl bg-linear-to-br from-slate-100 to-white p-3 ring-1 ring-slate-200/80">
      <img :src="product.image" :alt="product.name" class="h-28 w-full object-contain" />
    </div>

    <div class="space-y-3">
      <div>
        <h2 class="text-xl font-extrabold tracking-tight text-slate-950">
          {{ product.name }}
        </h2>
        <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
          {{ product.description }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <span class="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
          Unit price: ${{ (product.price - (product.price * product.discount) / 100).toFixed(2) }}
        </span>
        <span class="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
          In cart: {{ quantity }}
        </span>
      </div>
    </div>

    <div class="flex flex-col items-start gap-4 md:items-end">
      <div class="flex items-center rounded-full bg-slate-100 p-1 ring-1 ring-slate-200/80">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-slate-700 hover:bg-white"
          @click="removeFromCart">
          -
        </button>
        <span class="min-w-12 text-center text-base font-extrabold text-slate-900">
          {{ quantity }}
        </span>
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-slate-700 hover:bg-white"
          @click="addToCart">
          +
        </button>
      </div>

      <p class="text-2xl font-extrabold tracking-tight text-slate-950">
        ${{ discountedPrice.toFixed(2) }}
      </p>
    </div>
  </article>
</template>
