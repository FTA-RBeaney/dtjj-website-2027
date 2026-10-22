<script setup lang="ts">
const props = defineProps<{
  costs: { category: string; amountInPence: number }[];
  raisedInPence: number;
}>();

const formatMoney = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format;

const totalCostsInPence = computed(() => props.costs.reduce((sum, c) => sum + c.amountInPence, 0));
const shortfallInPence = computed(() => Math.max(totalCostsInPence.value - props.raisedInPence, 0));
const overrunInPence = computed(() => Math.max(props.raisedInPence - totalCostsInPence.value, 0));
</script>

<template>
  <UCard :ui="{ body: 'p-5 sm:p-5' }">
    <h2 class="text-base font-medium mb-4">
      Cost coverage
    </h2>

    <AdminPlanBar
      label="Venue, teachers, band and the rest"
      :planned-in-pence="totalCostsInPence"
      :raised-in-pence="raisedInPence"
    />

    <p class="mt-3 text-sm text-muted">
      <template v-if="overrunInPence > 0">
        {{ formatMoney(overrunInPence / 100) }} more than costs are already in, from ticket sales and pay-it-forward.
      </template>
      <template v-else-if="shortfallInPence > 0">
        {{ formatMoney(shortfallInPence / 100) }} short of covering costs so far, from ticket sales and pay-it-forward.
      </template>
      <template v-else>
        Costs are fully covered by ticket sales and pay-it-forward.
      </template>
    </p>

    <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 pt-4 border-t border-default">
      <div
        v-for="cost in costs"
        :key="cost.category"
        class="flex items-baseline justify-between gap-2 text-sm"
      >
        <span class="text-muted">{{ cost.category }}</span>
        <span class="tabular-nums">{{ formatMoney(cost.amountInPence / 100) }}</span>
      </div>
    </div>
  </UCard>
</template>
