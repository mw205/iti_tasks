<script setup>
import CarouselBanner from "@/components/CarouselBanner.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/productStore.js";
import { onMounted, onUnmounted } from "vue";

const productStore = useProductStore();
onMounted(async () => {
  await productStore.fetchProducts();
  console.log(
    "HomeView mounted —",
    productStore.products.length,
    "products loaded",
  );
});
onUnmounted(() => {
  console.log("HomeView unmounted");
});
</script>
<template>
  <div class="hero-overlay bg-base-200 min-h-48 py-48 px-24">
    <CarouselBanner />
  </div>
  <div
    v-if="productStore.loading"
    class="flex justify-center items-center my-20"
  >
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </div>
  <div v-else-if="productStore.error">
    <span> Error happened </span>
  </div>
  <h2 v-else class="text-2xl md:text-4xl primary font-bold text-center my-10">
    Our Products
  </h2>
  <div class="grid md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-y-2">
    <ProductCard v-for="product in productStore.products" :product="product" />
  </div>
</template>
<style scoped></style>
