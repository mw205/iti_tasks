<script setup>
import ProductDetails from "@/components/ProductDetails.vue";
import ProductGallery from "@/components/ProductGallery.vue";
import { useProductStore } from "@/stores/productStore.js";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useProductStore();

const productId = computed(() => route.params.id);
const heroProduct = computed(() => store.getProductById(productId.value));
const filteredProducts = computed(() => {
  return store.products.filter((product) => product.id !== productId.value);
});

onMounted(async () => {
  if (store.products.length === 0) {
    await store.fetchProducts();
  }
});
</script>

<template>
  <div>
    <div v-if="store.loading" class="flex min-h-[60vh] items-center justify-center">
      <span class="loading loading-spinner loading-lg text-teal-700"></span>
    </div>

    <div v-else-if="heroProduct" class="space-y-8">
      <ProductDetails :product="heroProduct" />
      <ProductGallery :products="filteredProducts" />
    </div>

    <div v-else class="glass-panel flex min-h-[50vh] items-center justify-center rounded-4xl px-6 text-center">
      <p class="text-xl font-semibold text-slate-600">Product not found.</p>
    </div>
  </div>
</template>
