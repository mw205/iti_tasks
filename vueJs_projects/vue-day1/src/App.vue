<script setup>
import ProductView from './components/ProductView.vue';
import Footer from './layout/Footer.vue';
import NavBar from './layout/NavBar.vue';
const mainProduct = {
  "id": 1,
  "name": "Cozy Sneakers",
  "description": "High-quality sneakers that go with everything you wear.",
  "image": "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  "badge": "NEW",
  "price": 120,
  "discount": 20,
  "tags": ["Fashion", "Casual", "Sport"]
}
const products = [
  {
    "id": 2,
    "name": "Running Shoes",
    "price": 90,
    "discount": 10,
    "image": "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
  {
    "id": 3,
    "name": "Casual Boots",
    "price": 150,
    "discount": 0,
    "image": "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
  {
    "id": 4,
    "name": "Flip Flops",
    "price": 30,
    "discount": 50,
    "image": "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
  {
    "id": 4,
    "name": "Flip Flops",
    "price": 30,
    "discount": 50,
    "image": "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  }
];
</script>

<template>
  <NavBar />
  <ProductView :hero-product="mainProduct" :main-products="products" />
  <Footer />
</template>

<style scoped></style>
