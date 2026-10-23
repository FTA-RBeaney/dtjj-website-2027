<script setup lang="ts">
const props = defineProps<{
  label: string;
  plannedInPence: number;
  raisedInPence: number;
}>();

const formatMoney = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format;

const ratio = computed(() => Math.min(props.raisedInPence / props.plannedInPence, 1));
const percent = computed(() => Math.round(ratio.value * 100));
</script>

<template>
  <div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm">
      <span class="font-medium text-highlighted">{{ label }}</span>
      <span class="text-muted whitespace-nowrap">{{ formatMoney(raisedInPence / 100) }} of {{ formatMoney(plannedInPence / 100) }} · {{ percent }}%</span>
    </div>
    <div class="mt-2 h-2 rounded-full bg-muted overflow-hidden">
      <div class="h-full rounded-full" :style="{ width: `${ratio * 100}%`, background: 'var(--ui-primary)' }" />
    </div>
  </div>
</template>
