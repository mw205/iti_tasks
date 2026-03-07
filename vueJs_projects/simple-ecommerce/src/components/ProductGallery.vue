<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
    products: Array
});
</script>

<template>
    <div
        class="carousel carousel-center w-full rounded-3xl gap-6 py-8 px-4 bg-base-200/50 items-center justify-items-center">
        <div v-for="product in products" class="carousel-item">
            <ProductCard :product="product" />
        </div>
    </div>
</template>

<style scoped></style>
