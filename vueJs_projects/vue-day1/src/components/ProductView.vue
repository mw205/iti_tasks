<script setup>
import ProductGallery from './ProductGallery.vue';
import ProductHero from './ProductHero.vue';

defineProps({
    heroProduct: Object,
    mainProducts: Array
});
</script>
<template>
    <div class="max-w-full overflow-x-hidden">
        <ProductHero :product="heroProduct" />
        <ProductGallery :products="mainProducts" />
    </div>
</template>
<style scoped></style>