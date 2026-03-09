<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed, onMounted, onUnmounted } from "vue";

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
onMounted(() => {
  console.log("Product details - mounted");
});
onUnmounted(() => {
  console.log("Product details - unmounted");
});
</script>
<template>
  <div
    class="hero bg-base-200 rounded-2xl overflow-hidden shadow-sm p-4 sm:p-8 lg:p-12 relative"
  >
    <div
      class="hero-content flex-col md:flex-row items-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto"
    >
      <div class="w-full md:w-1/2">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full object-scale-up max-w-md sm:max-w-md rounded-2xl shadow-2xl aspect-square md:aspect-auto"
        />
      </div>
      <div class="w-full md:w-1/2 text-center md:text-left space-y-4">
        <div
          class="absolute top-4 right-4 flex items-end gap-2 z-10 md:static md:flex-row md:justify-end md:mb-4 md:gap-2"
        >
          <div
            v-if="product.stock === 0"
            class="badge badge-error badge-lg font-bold shadow-lg uppercase"
          >
            Out of Stock
          </div>
          <template v-else>
            <div
              v-if="product.discount > 0"
              class="badge badge-secondary badge-lg font-bold shadow-lg"
            >
              -{{ product.discount }}%
            </div>
            <div
              v-if="product.badge"
              class="badge badge-info badge-lg font-bold shadow-lg"
            >
              {{ product.badge }}
            </div>
          </template>
        </div>
        <h1
          class="text-4xl md:text-5xl font-extrabold tracking-tight text-base-content"
        >
          {{ product.name }}
        </h1>
        <p class="text-lg text-base-content/80">
          {{ product.description }}
        </p>
        <div class="flex flex-wrap justify-center md:justify-start gap-2">
          <div class="badge" v-for="tag in product.tags" :key="tag">
            {{ tag }}
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-lg">
            Stock:
            <span
              class="font-bold"
              :class="product.stock === 0 ? 'text-error' : 'text-primary'"
            >
              {{ product.stock }}
            </span>
          </p>
          <p class="text-lg">
            Original Price:
            <span class="font-black opacity-50 line-through">
              ${{ product.price }}
            </span>
          </p>
        </div>

        <div class="pt-4">
          <button
            class="btn btn-primary btn-lg shadow-lg"
            @click="handleBuy"
            :disabled="product.stock === 0"
          >
            {{
              product.stock > 0 ? `Buy For $${discountedPrice}` : "Out of Stock"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
