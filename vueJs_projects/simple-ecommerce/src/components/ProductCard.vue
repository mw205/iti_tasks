<script setup>
import { computed, ref, watch } from 'vue';
const props = defineProps({
    product: Object
});
const discountedPrice = computed(() => {
    return props.product.price - (props.product.price * props.product.discount / 100)
});

const productStock = ref(props.product.stock);

watch(() => props.product.stock, (newStock) => {
    productStock.value = newStock;
});

</script>
<template>
    <div class="card bg-base-100 w-screen max-w-sm shadow-lg border border-base-200 overflow-hidden group">
        <div class="absolute right-1 top-1 flex items-end gap-2 z-10 md:flex-row md:justify-end md:mb-4 md:gap-2">
            <div v-if="productStock === 0" class="badge badge-error badge-lg font-bold shadow-lg uppercase">
                Out of Stock
            </div>
            <template v-else>
                <div v-if="product.discount > 0" class="badge badge-secondary badge-lg font-bold shadow-lg">
                    -{{ product.discount }}%
                </div>
                <div v-if="product.badge" class="badge badge-info badge-lg font-bold shadow-lg">
                    {{ product.badge }}
                </div>
            </template>
        </div>
        <figure class="overflow-hidden">
            <img :src="product.image" :alt="product.name" class="h-48 w-full object-contain" />
        </figure>
        <div class="card-body gap-3 p-6">
            <h2 class="card-title text-xl font-bold">{{ product.name }}</h2>

            <div class="flex justify-between items-center text-sm">
                <span :class="productStock === 0 ? 'text-error' : 'text-primary'" class="font-semibold">
                    {{ productStock > 0 ? `Stock: ${productStock}` : 'Out of Stock' }}
                </span>
            </div>

            <div class="card-actions justify-between items-center mt-4">
                <div>
                    <p class="block text-sm font-black base-300 opacity-50 line-through" v-if="product.discount > 0">$
                        {{ product.price }}</p>
                    <span class="text-2xl font-black text-primary">${{ discountedPrice }}</span>
                </div>
                <RouterLink :to="`/product/${product.id}`">
                    <button class="btn btn-primary btn-sm rounded-full px-6">View</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped></style>