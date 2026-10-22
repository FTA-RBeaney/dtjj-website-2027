<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import moment from "moment";
import {
  eventCosts,
  failedPayments,
  lastYear,
  payItForward,
  payments,
  salesSeries,
  ticketRevenueInPence,
  ticketTypeSummaries,
  totalCapacity,
  totalRevenueInPence,
  totalSold,
  tShirtOrders,
} from "~/data/admin-overview-sample";

const { isNotificationsSlideoverOpen } = useDashboard();

const { data: events } = await useFetch("/api/events");
const eventName = computed(() => events.value?.[0]?.name ?? "This year's event");

const formatMoney = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format;
const formatInt = new Intl.NumberFormat("en-GB").format;
const formatPence = (pence: number) => formatMoney(pence / 100);

const items = [[{
  label: "Add ticket type",
  icon: "i-ph-ticket",
  to: "/settings/tickets",
}, {
  label: "Invite team member",
  icon: "i-ph-user-plus",
  to: "/settings/team",
}]] satisfies DropdownMenuItem[][];

const soldPercent = Math.round((totalSold / totalCapacity) * 100);
const registrationsDelta = totalSold - lastYear.registrations;
const revenueDeltaInPence = ticketRevenueInPence - lastYear.revenueInPence;
const revenueDeltaPercent = Math.round((revenueDeltaInPence / lastYear.revenueInPence) * 100);

const fullPass = ticketTypeSummaries.find(t => t.name === "Full Weekend Pass")!;

// KPIs double as the chart's series tabs (references/app-screens.md §2.5, §5 "overview").
const metrics = [
  { key: "registrations", label: "Registrations", values: salesSeries.registrations, format: (v: number) => formatInt(v) },
  { key: "revenue", label: "Ticket revenue", values: salesSeries.revenueInPence.map(v => v / 100), format: (v: number) => formatMoney(v) },
  { key: "payItForward", label: "Pay-it-forward raised", values: salesSeries.payItForwardInPence.map(v => v / 100), format: (v: number) => formatMoney(v) },
] as const;
const selectedMetric = ref<(typeof metrics)[number]["key"]>("registrations");
const activeMetric = computed(() => metrics.find(m => m.key === selectedMetric.value)!);

const daysToGo = computed(() => {
  if (!events.value?.[0]?.startDate) {
    return "No start date";
  }

  return events?.value[0]?.startDate ? moment(events?.value[0]?.startDate).diff(moment(), "days") : 0;
});
</script>

<template>
  <UDashboardPanel id="admin-overview" class="min-h-[90vh]!">
    <template #header>
      <UDashboardNavbar :title="eventName" :ui="{ right: 'gap-3' }">
        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-ph-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton
              icon="i-ph-plus"
              size="md"
              color="neutral"
              class="rounded-full"
            />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-6">
        <p class="text-sm text-muted -mt-2">
          {{ formatInt(totalSold) }} of {{ formatInt(totalCapacity) }} spots sold ({{ soldPercent }}%) —
          {{ registrationsDelta }} more than this time last year, and {{ payments.failed }} payments need a resend.
        </p>

        <!-- balances that don't change today: one container split by dividers -->
        <div class="grid grid-cols-1 sm:grid-cols-4 rounded-lg ring ring-default divide-y sm:divide-y-0 sm:divide-x divide-default bg-default">
          <div class="p-5">
            <div class="text-xs text-muted">
              Spots sold
            </div>
            <div class="mt-1.5 text-2xl font-bold tabular-nums">
              {{ formatInt(totalSold) }} <span class="text-base text-muted">/ {{ formatInt(totalCapacity) }}</span>
            </div>
          </div>
          <div class="p-5">
            <div class="text-xs text-muted">
              Total attendees
            </div>
            <div class="mt-1.5 text-2xl font-bold tabular-nums">
              {{ formatInt(totalSold) }}
            </div>
          </div>
          <div class="p-5">
            <div class="text-xs text-muted">
              Days to go
            </div>
            <div class="mt-1.5 text-2xl font-bold tabular-nums">
              {{ daysToGo }}
            </div>
          </div>
          <div class="p-5">
            <div class="text-xs text-muted">
              Full Weekend Passes left
            </div>
            <div class="mt-1.5 text-2xl font-bold tabular-nums">
              {{ formatInt(fullPass.max - fullPass.sold) }}
            </div>
          </div>
        </div>

        <!-- main chart card: KPIs act as the chart's series tabs -->
        <UCard :ui="{ body: 'p-5 sm:p-5' }">
          <div role="tablist" class="flex gap-8 border-b border-default pb-0 -mt-1 overflow-x-auto">
            <button
              v-for="metric in metrics"
              :key="metric.key"
              type="button"
              role="tab"
              :aria-selected="selectedMetric === metric.key"
              class="pb-3 text-left border-b-2 -mb-px transition-colors shrink-0 whitespace-nowrap"
              :class="selectedMetric === metric.key ? 'border-inverted' : 'border-transparent'"
              @click="selectedMetric = metric.key"
            >
              <div class="text-xs text-muted" :class="{ 'text-highlighted': selectedMetric === metric.key }">
                {{ metric.label }}
              </div>
              <div
                class="mt-1 text-2xl tabular-nums"
                :class="selectedMetric === metric.key ? 'text-highlighted font-medium' : 'text-highlighted font-normal'"
              >
                {{ metric.format(metric.values[metric.values.length - 1]) }}
              </div>
            </button>
          </div>

          <div class="mt-5">
            <AdminLineChart
              :labels="[...salesSeries.labels]"
              :values="[...activeMetric.values]"
              :format="activeMetric.format"
            />
          </div>

          <div class="mt-2 overflow-x-auto">
            <table class="w-full min-w-[420px] text-sm border-t border-default">
              <thead>
                <tr class="text-muted">
                  <th class="text-left font-normal py-2 whitespace-nowrap">
                    vs {{ lastYear.label }}
                  </th>
                  <th class="text-right font-normal py-2 whitespace-nowrap">
                    Last year
                  </th>
                  <th class="text-right font-normal py-2 whitespace-nowrap">
                    This year
                  </th>
                  <th class="text-right font-normal py-2 whitespace-nowrap">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t border-default">
                  <td class="py-2">
                    Registrations
                  </td>
                  <td class="py-2 text-right tabular-nums">
                    {{ formatInt(lastYear.registrations) }}
                  </td>
                  <td class="py-2 text-right tabular-nums">
                    {{ formatInt(totalSold) }}
                  </td>
                  <td class="py-2 text-right tabular-nums text-success">
                    +{{ formatInt(registrationsDelta) }}
                  </td>
                </tr>
                <tr class="border-t border-default">
                  <td class="py-2">
                    Ticket revenue
                  </td>
                  <td class="py-2 text-right tabular-nums">
                    {{ formatPence(lastYear.revenueInPence) }}
                  </td>
                  <td class="py-2 text-right tabular-nums">
                    {{ formatPence(ticketRevenueInPence) }}
                  </td>
                  <td class="py-2 text-right tabular-nums text-success">
                    +{{ formatPence(revenueDeltaInPence) }} (+{{ revenueDeltaPercent }}%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>

        <AdminCostCoverage
          :costs="eventCosts"
          :raised-in-pence="totalRevenueInPence"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <UCard :ui="{ body: 'p-5 sm:p-5' }">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-medium">
                Needs attention
              </h2>
              <NuxtLink to="/admin/attendees?status=failed" class="text-sm font-medium hover:underline">
                View all
              </NuxtLink>
            </div>
            <div class="flex flex-col">
              <div
                v-for="payment in failedPayments"
                :key="payment.name"
                class="flex items-center gap-3 py-2.5 border-t border-default first:border-t-0"
              >
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium truncate">
                    {{ payment.name }}
                  </div>
                  <div class="text-sm text-muted">
                    {{ payment.reason }}
                  </div>
                </div>
                <div class="text-sm tabular-nums">
                  {{ formatPence(payment.amount) }}
                </div>
                <UButton
                  size="sm"
                  color="neutral"
                  variant="outline"
                >
                  Resend link
                </UButton>
              </div>
            </div>
            <p class="mt-3 text-sm text-muted">
              {{ payments.failed }} failed, {{ payments.pending }} pending of {{ totalSold }} orders.
            </p>
          </UCard>

          <UCard :ui="{ body: 'p-5 sm:p-5' }">
            <h2 class="text-base font-medium mb-4">
              T-shirts to order
            </h2>
            <AdminBarList :rows="tShirtOrders.map(t => ({ label: t.size, value: t.count }))" />
          </UCard>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <UCard :ui="{ body: 'p-5 sm:p-5' }">
            <h2 class="text-base font-medium mb-4">
              Pay-it-forward
            </h2>
            <AdminPlanBar
              label="Scholarship Passes subsidised"
              :planned-in-pence="payItForward.targetInPence"
              :raised-in-pence="payItForward.raisedInPence"
            />
            <p class="mt-4 text-sm text-muted">
              18 of 25 Scholarship Passes are filled, each subsidised by attendees paying it forward at checkout.
            </p>
          </UCard>

          <UCard :ui="{ body: 'p-5 sm:p-5' }">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-base font-medium">
                Ticket types
              </h2>
              <NuxtLink to="/settings/tickets" class="text-sm font-medium hover:underline">
                Manage
              </NuxtLink>
            </div>
            <div class="flex flex-col">
              <div
                v-for="ticket in ticketTypeSummaries"
                :key="ticket.name"
                class="flex items-center gap-3 py-2.5 border-t border-default first:border-t-0"
              >
                <div class="flex-1 text-sm font-medium">
                  {{ ticket.name }}
                </div>
                <div class="text-sm text-muted tabular-nums">
                  {{ formatInt(ticket.sold) }} / {{ formatInt(ticket.max) }}
                </div>
                <UBadge
                  v-if="ticket.max - ticket.sold <= 10"
                  color="warning"
                  variant="subtle"
                  size="sm"
                >
                  {{ ticket.max - ticket.sold }} left
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
