<script setup>
import { computed } from 'vue';
const props = defineProps(
    { product: Object }
);
const discountedPrice = computed(
    () => {
        return props.product.price - (props.product.price * props.product.discount / 100);
    }
)
</script>
<template>
    <div class="hero bg-base-200 rounded-2xl overflow-hidden shadow-sm p-4 sm:p-8 lg:p-12 relative">
        <div class="hero-content flex-col md:flex-row items-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto">
            <div class="w-full md:w-1/2">
                <img :src="product.image"
                    class="w-full object-scale-up max-w-md sm:max-w-md rounded-2xl shadow-2xl aspect-square md:aspect-auto" />
            </div>
            <div class="w-full md:w-1/2 text-center md:text-left space-y-4">
                <div
                    class="absolute top-4 right-4 flex items-end gap-2 z-10 md:static md:flex-row md:justify-end md:mb-4 md:gap-2">
                    <div v-if="product.discount > 0" class="badge badge-secondary badge-lg font-bold shadow-lg">
                        -{{ product.discount }}%
                    </div>
                    <div v-if="product.badge" class="badge badge-info badge-lg font-bold shadow-lg">
                        {{ product.badge }}
                    </div>
                </div>
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-base-content">{{ product.name }}</h1>
                <p class="text-lg text-base-content/80">
                    {{ product.description }}
                </p>
                <div class="flex flex-wrap justify-center md:justify-start">
                    <div class="badge" v-for="tag in product.tags">
                        {{ tag }}
                    </div>
                </div>

                <p class="text-lg sm:text-center md:text-left"> Original Price:
                    <span class=" text-lg font-black base-300 opacity-50 line-through text-md text-base-content/80">
                        ${{ product.price }}
                    </span>
                </p>
                <div class="pt-4">
                    <button class="btn btn-primary btn-lg shadow-lg">
                        Buy For ${{ discountedPrice }}
                    </button>

                </div>
            </div>

        </div>
    </div>
</template>
<style scoped></style>