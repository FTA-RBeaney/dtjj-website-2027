<script setup lang="ts">
import type { FaqItem } from "~/types/content";

const { item } = defineProps<{
  item: FaqItem;
}>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-semibold">
      {{ item.question }}
    </h2>
    <p class="text-muted">
      {{ item.answer }}
    </p>
  </div>
</template>
