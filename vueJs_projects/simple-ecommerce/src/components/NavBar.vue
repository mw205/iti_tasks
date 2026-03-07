<script setup>
import { onMounted, onUnmounted } from 'vue';
const props = defineProps({
    links: Array,
    shopName: String
});
onMounted(() => {
    console.log("NavBar - mounted");
});

onUnmounted(() => {
    console.log("NavBar - unmounted");
});
</script>

<template>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
            <RouterLink :to="`/`" class="btn btn-ghost text-xl">{{ shopName }}</RouterLink>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li v-for="link in links" :key="link.href">
                    <RouterLink :to="link.href">{{ link.text }}</RouterLink>
                </li>
            </ul>
        </div>
    </div>

</template>
<style scoped></style>