<script setup>
import { computed } from 'vue';
const props = defineProps({
    product: Object
});
const discountedPrice = computed(() => {
    return props.product.price - (props.product.price * props.product.discount / 100)
});
</script>
<template>
    <div class="card bg-base-100 w-80 shadow-lg border border-base-200 overflow-hidden group">
        <figure class="overflow-hidden">
            <img :src="product.image" :alt="product.name" class="h-48 w-full object-cover" />
        </figure>
        <div class="card-body gap-3 p-6">
            <div class="flex justify-between items-start">
                <h2 class="card-title text-xl font-bold">{{ product.name }}</h2>
                <div v-if="product.discount > 0" class="badge badge-secondary badge-lg font-bold">
                    -{{ product.discount }}%
                </div>
            </div>
            <div class="card-actions justify-between items-center mt-4">
                <div>
                    <p class="block text-sm font-black base-300 opacity-50 line-through" v-if="product.discount > 0">${{
                        product.price }}</p>
                    <span class="text-2xl font-black text-primary">${{ discountedPrice }}</span>
                </div>
                <button class="btn btn-primary btn-sm rounded-full px-6">View</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>