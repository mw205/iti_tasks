<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
    products: Array
});
</script>

<template>
    <div class="carousel carousel-center w-full rounded-box gap-4 mx-1 p-4 m-auto justify-center">
        <div v-for="product in products" class="carousel-item">
            <ProductCard :product="product" />
        </div>

    </div>
</template>

<style scoped></style>
