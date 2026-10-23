<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <header class="page-head">
    <div class="container">
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="lead">
        {{ subtitle }}
      </p>
    </div>
  </header>
</template>
