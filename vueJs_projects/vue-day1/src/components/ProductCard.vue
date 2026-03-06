<script setup>
defineProps({
    product: Object
});
</script>
<template>
    <div class="card bg-base-100 w-72 hadow-sm border border-base-200">
        <figure>
            <img :src="product.image" :alt="product.name" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <p>Price: ${{ product.price }}</p>
            <div v-if="product.discount > 0" class="badge badge-secondary">
                {{ product.discount }}% OFF
            </div>
        </div>
    </div>
</template>
<style scoped></style>