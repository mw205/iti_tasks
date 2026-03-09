<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { computed, onMounted, onUnmounted } from "vue";
const props = defineProps({
  links: Array,
  shopName: String,
});
const productStore = useProductStore();
const cartStore = useCartStore();

const totalStock = computed(() => {
  return productStore.products.reduce((acc, product) => acc + product.stock, 0);
});

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
  console.log("NavBar - mounted");
});

onUnmounted(() => {
  console.log("NavBar - unmounted");
});
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <RouterLink :to="`/`" class="btn btn-ghost text-xl">{{
        shopName
      }}</RouterLink>
    </div>
    <div class="flex-none">
      <div class="badge badge-warning badge-lg font-bold shadow-lg">
        Stock:{{ totalStock }}
      </div>
      <ul class="menu menu-horizontal px-1">
        <li v-for="link in links" :key="link.href">
          <RouterLink :to="link.href">{{ link.text }}</RouterLink>
        </li>
      </ul>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">
              {{ cartStore.totalItems }}
            </span>
          </div>
        </div>
        <div
          tabindex="0"
          class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
        >
          <div class="card-body">
            <span class="text-lg font-bold"
              >{{ cartStore.totalItems }} Items</span
            >
            <span class="text-info">Subtotal: ${{ cartStore.totalPrice }}</span>
            <div class="card-actions">
              <RouterLink to="/cart">
                <button class="btn btn-primary btn-block">View cart</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
