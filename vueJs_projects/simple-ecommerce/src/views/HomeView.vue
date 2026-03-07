<script setup>
import CarouselBanner from '@/components/CarouselBanner.vue';
import ProductCard from '@/components/ProductCard.vue';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
    products: {
        type: Array,
        default: () => []
    }
});
onMounted(() => {
    console.log("HomeView mounted —", props.products.length, "products loaded")
});
onUnmounted(() => {
    console.log("HomeView unmounted");
});

</script>
<template>
    <div class="hero bg-base-200 min-h-screen p-12">
        <CarouselBanner />
    </div>
    <h2 class="text-2xl md:text-4xl primary font-bold text-center my-10">
        Our Products
    </h2>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 justify-items-center">
        <ProductCard v-for="product in props.products" :product="product" />
    </div>

</template>
<style scoped></style>
