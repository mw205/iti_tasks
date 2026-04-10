<script setup>
import CartItem from "@/components/CartItem.vue";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const cartStore = useCartStore();

const handleCheckout = async () => {
  for (const item of cartStore.items) {
    for (let i = 0; i < item.quantity; i++) {
      await productStore.decreaseStock(item.product.id);
    }
  }

  cartStore.clearCart();
  alert("Checkout successful! Thank you for your purchase.");
};
</script>

<template>
  <section class="space-y-6">
    <div
      class="glass-panel flex flex-col gap-6 rounded-4xl px-6 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between"
    >
      <div class="max-w-2xl">
        <p class="text-sm font-bold uppercase tracking-[0.28em] text-teal-700">
          Shopping cart
        </p>
        <h1 class="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
          Review your picks before checkout.
        </h1>
        <p class="mt-3 text-base leading-8 text-slate-600">
          Adjust quantities, confirm pricing, and place the order when you’re ready.
        </p>
      </div>

      <div
        v-if="cartStore.items.length !== 0"
        class="rounded-3xl bg-slate-900 px-6 py-5 text-white shadow-lg"
      >
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
          Subtotal
        </p>
        <p class="mt-2 text-4xl font-extrabold">
          ${{ cartStore.totalPrice.toFixed(2) }}
        </p>
        <button
          class="btn btn-brand mt-4 w-full rounded-full"
          @click="handleCheckout"
        >
          Checkout now
        </button>
      </div>
    </div>

    <div
      v-if="cartStore.items.length !== 0"
      class="glass-panel rounded-4xl px-6 py-4 sm:px-8"
    >
      <CartItem
        v-for="cartItem in cartStore.items"
        :key="cartItem.product.id"
        :cart-item="cartItem"
      />
    </div>

    <div
      v-else
      class="glass-panel rounded-4xl px-6 py-16 text-center"
    >
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-950">
        Your cart is empty.
      </h2>
      <p class="mx-auto mt-3 max-w-md text-base leading-7 text-slate-500">
        Start with the featured collection and add a pair that fits your style.
      </p>
      <RouterLink to="/" class="btn btn-brand mt-6 rounded-full px-6">
        Continue shopping
      </RouterLink>
    </div>
  </section>
</template>
