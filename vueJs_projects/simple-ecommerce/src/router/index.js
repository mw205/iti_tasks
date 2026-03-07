import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/views/HomeView.vue") },
  { path: "/about", component: () => import("@/views/AboutView.vue") },
  {
    path: "/product/:id",
    component: () => import("@/views/ProductView.vue"),
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
