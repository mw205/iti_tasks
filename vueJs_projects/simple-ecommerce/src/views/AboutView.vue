<script setup>
import { onMounted, onUnmounted } from 'vue';
onMounted(() => {
  console.log("About view mounted");

});
onUnmounted(() => {
  console.log("About view unmounted");
});
</script>
<template>
  <div class="p-8 space-y-4">
    <h1 class="text-4xl font-bold">About Us</h1>
    <h2 class="text-2xl font-bold">Mohamed Waleed</h2>
    <h3 class="text-1xl font-bold">VueJs Course At ITI</h3>
    <p>We are a small ecommerce store dedicated to quality sneakers.</p>
  </div>
</template>
<style scoped></style>
