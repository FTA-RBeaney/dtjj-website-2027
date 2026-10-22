<script setup lang="ts">
const props = defineProps<{
  rows: { label: string; value: number }[];
}>();

const max = computed(() => Math.max(...props.rows.map(r => r.value), 1));
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <div
      v-for="row in rows"
      :key="row.label"
      class="flex items-center gap-3"
    >
      <span class="w-8 shrink-0 text-sm text-muted">{{ row.label }}</span>
      <div class="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
        <div class="h-full rounded-full bg-default" :style="{ width: `${(row.value / max) * 100}%`, background: 'var(--ui-text-dimmed)' }" />
      </div>
      <span class="w-6 shrink-0 text-sm text-right tabular-nums">{{ row.value }}</span>
    </div>
  </div>
</template>
