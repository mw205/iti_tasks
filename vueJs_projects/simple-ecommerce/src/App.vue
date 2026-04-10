<script setup>
import Footer from "./layout/Footer.vue";
import NavBar from "./components/NavBar.vue";

const shopName = "Stride";
const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/about",
    text: "About",
  },
  {
    href: "/product/1",
    text: "Featured",
  },
];
</script>

<template>
  <div class="app-shell">
    <div class="app-shell__glow app-shell__glow--left"></div>
    <div class="app-shell__glow app-shell__glow--right"></div>

    <NavBar :shop-name="shopName" :links="links" />

    <main class="app-main">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.app-main {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

.app-shell__glow {
  position: fixed;
  z-index: 0;
  width: 30rem;
  height: 30rem;
  border-radius: 9999px;
  pointer-events: none;
  filter: blur(90px);
  opacity: 0.28;
}

.app-shell__glow--left {
  top: -8rem;
  left: -10rem;
  background: rgba(14, 165, 233, 0.38);
}

.app-shell__glow--right {
  top: 14rem;
  right: -10rem;
  background: rgba(245, 158, 11, 0.26);
}

@media (max-width: 768px) {
  .app-main {
    width: min(100% - 1.25rem, 1180px);
    padding-top: 1.25rem;
  }
}
</style>
