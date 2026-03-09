<script setup>
import ProductDetails from "@/components/ProductDetails.vue";
import ProductGallery from "@/components/ProductGallery.vue";
import { useProductStore } from "@/stores/productStore.js";
import { computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useProductStore();

const productId = computed(() => route.params.id);

const heroProduct = computed(() => store.getProductById(productId.value));

const filteredProducts = computed(() => {
  return store.products.filter((product) => product.id !== productId.value);
});

onMounted(async () => {
  console.log("Product View mounted for ID - ", productId.value);
  if (store.products.length === 0) {
    await store.fetchProducts();
  }
});

onUnmounted(() => {
  console.log("Product View unmounted");
});
</script>
<template>
  <div class="min-h-screen bg-base-100">
    <div
      v-if="store.loading"
      class="flex justify-center items-center min-h-screen"
    >
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div
      v-else-if="heroProduct"
      class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      <ProductDetails :product="heroProduct" />

      <ProductGallery :products="filteredProducts" />
    </div>
    <div v-else class="flex items-center justify-center min-h-screen">
      <p class="text-xl">Product not found.</p>
    </div>
  </div>
</template>
<style scoped></style>
