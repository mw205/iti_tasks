<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";
const props = defineProps({
  cartItem: Object,
});
const product = computed(() => props.cartItem.product);
const quantity = computed(() => props.cartItem.quantity);
const discountedPrice = computed(() => {
  return (
    (product.value.price -
      (product.value.price * product.value.discount) / 100) *
    quantity.value
  );
});
const cartStore = useCartStore();
const removeFromCart = () => {
  cartStore.removeFromCart(product.value.id);
};
const addToCart = () => {
  cartStore.addToCart(product.value);
};
</script>
<template>
  <div class="flex flex-col md:flex-row border-b border-gray-400 py-4">
    <div class="shrink-0">
      <img
        :src="product.image"
        alt="Product image"
        class="w-32 h-32 object-cover rounded-2xl"
      />
    </div>
    <div class="mt-4 md:mt-0 md:ml-6">
      <h2 class="text-lg font-bold">{{ product.name }}</h2>
      <p class="mt-2 text-gray-600">
        {{ product.description }}
      </p>
      <div class="mt-4 flex items-center">
        <span class="mr-2">Quantity:</span>
        <div class="flex items-center">
          <button
            class="bg-primary rounded-l-lg px-2 py-1"
            @click="removeFromCart"
          >
            -
          </button>
          <span class="mx-2">{{ quantity }}</span>
          <button class="bg-primary rounded-r-lg px-2 py-1" @click="addToCart">
            +
          </button>
        </div>
        <span class="ml-auto font-bold">${{ discountedPrice }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
