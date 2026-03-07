<script setup>
import ProductGallery from '@/components/ProductGallery.vue';
import ProductHero from '@/components/ProductHero.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    products: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(["buy"])
const route = useRoute();
const heroProduct = ref(null);
const filteredProducts = ref([]);

watch(
    () => [Number(route.params.id), props.products],
    () => {
        const id = Number(route.params.id);
        heroProduct.value = props.products.find(product => product.id === id);
        filteredProducts.value = props.products.filter(product => product.id !== id);
    },
    { immediate: true, deep: true }
);
const handleBuy = (boughtProduct) => {
    emit("buy", boughtProduct.id)
}
</script>
<template>
    <div class="min-h-screen bg-base-100">
        <div v-if="heroProduct" class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <ProductHero :product="heroProduct" @buy="handleBuy" />
            <ProductGallery :products="filteredProducts" />
        </div>
        <div v-else class="flex items-center justify-center min-h-screen">
            <p class="text-xl">Product not found.</p>
        </div>
    </div>
</template>
<style scoped></style>