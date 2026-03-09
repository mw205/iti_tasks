<script setup>
import CartItem from "@/components/CartItem.vue";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { onMounted, onUnmounted } from "vue";
const productStore = useProductStore();
const cartStore = useCartStore();
onMounted(async () => {
  console.log("Cart View mounted");
});
onUnmounted(() => {
  console.log("Cart View unmounted");
});
const handleCheckout = async () => {
  for (const item of cartStore.items) {
    // We need to call decreaseStock for each item, potentially multiple times if quantity > 1
    // or update the store to handle quantities.
    for (let i = 0; i < item.quantity; i++) {
      await productStore.decreaseStock(item.product.id);
    }
  }
  cartStore.clearCart();
  alert("Checkout successful! Thank you for your purchase.");
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-if="cartStore.items.length !== 0"
      class="flex flex-col md:flex-row md:justify-between md:items-center"
    >
      <h1 class="text-2xl font-bold my-4">Shopping Cart</h1>
      <button
        class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        @click="handleCheckout"
      >
        Checkout
      </button>
    </div>
    <div class="mt-8">
      <CartItem
        v-if="cartStore.items.length !== 0"
        v-for="cartItem in cartStore.items"
        :cart-item="cartItem"
        :key="cartItem.product.id"
      />
      <div v-else class="flex justify-center items-center mt-8">
        <p class="text-xl">Your cart is empty.</p>
      </div>
    </div>
    <div
      v-if="cartStore.items.length !== 0"
      class="flex justify-end items-center mt-8"
    >
      <span class="text-gray-600 mr-4">Subtotal:</span>
      <span class="text-xl font-bold">${{ cartStore.totalPrice.toFixed(2) }}</span>
    </div>
  </div>
</template>

<style scoped></style>
