<script setup>
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';
import Footer from './layout/Footer.vue';

const shopName = "My Shop";
const links = [
  {
    href: "/",
    text: "Home"
  },
  {
    href: "/about",
    text: "About"
  },
  {
    href: "/product/1",
    text: "Product"
  }
];

</script>

<template>
  <NavBar :shop-name="shopName" :links="links" />
  <main class="p-8">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped></style>
