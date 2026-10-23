<script setup lang="ts">
import type { FaqItem } from "~/types/content";

const { item } = defineProps<{
  item: FaqItem;
}>();
</script>

<template>
  <h3>{{ item.question }}</h3>
  <p>{{ item.answer }}</p>
</template>
