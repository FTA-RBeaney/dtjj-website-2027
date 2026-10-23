<script setup lang="ts">
const route = useRoute();

const links = [
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];
</script>

<template>
  <nav class="site-nav">
    <NuxtLink
      to="/"
      class="site-nav__mark"
      aria-label="Downtown Jazz Jam, home"
    >
      <img
        src="/dtjj-logo.webp"
        alt=""
        width="32"
        height="32"
      >
      <!-- <span class="site-nav__mark-text">Downtown Jazz Jam</span> -->
    </NuxtLink>
    <div class="site-nav__links site-nav__links--text">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="site-nav__link"
        :aria-current="route.path === link.to ? 'page' : undefined"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
    <details class="site-nav__menu">
      <summary class="site-nav__menu-toggle" aria-label="Menu">
        Menu
      </summary>
      <div class="site-nav__menu-panel">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="site-nav__link"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </details>
    <a href="#join" class="btn btn--secondary">Join the list</a>
  </nav>
</template>
