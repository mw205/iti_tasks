<script setup>
defineProps(
    { product: Object }
);
</script>
<template>
    <div class="hero bg-base-200 min-h-full">
        <div class="hero-content flex-col lg:flex-row">
            <img :src=product.image class="max-w-screen rounded-lg shadow-2xl" />
            <div>
                <h1 class="text-5xl font-bold text-center lg:text-left">{{ product.name }}</h1>
                <p class="py-6 text-center lg:text-left">
                    {{ product.description }}
                </p>
                <div class="flex justify-center items-center lg:inline">
                    <button class="btn btn-primary">Buy For ${{ product.price }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>