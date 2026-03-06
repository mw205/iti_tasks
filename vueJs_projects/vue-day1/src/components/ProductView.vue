<script setup>
import ProductGallery from './ProductGallery.vue';
import ProductHero from './ProductHero.vue';

defineProps({
    heroProduct: Object,
    mainProducts: Array
});
</script>
<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <ProductHero :product="heroProduct" />
            <ProductGallery :products="mainProducts" />
        </div>
    </div>
</template>
<style scoped></style>