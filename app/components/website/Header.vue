<script setup lang="ts">
type HeaderVariant = "primary" | "secondary";

const { title, subtitle, variant = "secondary" } = defineProps<{
  title: string;
  subtitle?: string;
  variant?: HeaderVariant;
}>();
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <p v-if="subtitle" :class="variant === 'secondary' ? 'text-muted' : 'text-green-500'">
      {{ subtitle }}
    </p>
  </header>
</template>
