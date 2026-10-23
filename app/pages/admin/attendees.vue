<script setup lang="ts">
import { attendeeRows, payments, totalSold } from "~/data/admin-overview-sample";

const route = useRoute();

type StatusFilter = "all" | "Paid" | "Pending" | "Failed";
const statusFromQuery = (route.query.status as string | undefined)?.toLowerCase();
const initial: StatusFilter = statusFromQuery === "paid" ? "Paid" : statusFromQuery === "pending" ? "Pending" : statusFromQuery === "failed" ? "Failed" : "all";
const selectedStatus = ref<StatusFilter>(initial);

const counts = [
  { key: "all" as const, label: "All", value: totalSold },
  { key: "Paid" as const, label: "Paid", value: payments.paid },
  { key: "Pending" as const, label: "Pending", value: payments.pending },
  { key: "Failed" as const, label: "Failed", value: payments.failed },
];

const filteredRows = computed(() => selectedStatus.value === "all"
  ? attendeeRows
  : attendeeRows.filter(r => r.paymentStatus === selectedStatus.value));

const statusPillColor = { Paid: "success", Pending: "warning", Failed: "error" } as const;
const hostingPillColor = { "Offering to host": "success", "Needs housing": "warning", "Sorted": "neutral" } as const;

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
</script>

<template>
  <UDashboardPanel id="admin-attendees">
    <template #header>
      <UDashboardNavbar title="Attendees">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-5">
        <p class="text-sm text-muted -mt-2">
          {{ totalSold }} registered for this year's event.
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            v-for="count in counts"
            :key="count.key"
            type="button"
            class="rounded-lg p-3 text-left transition-colors"
            :class="selectedStatus === count.key ? '' : 'ring ring-default bg-default hover:bg-elevated/50'"
            :style="selectedStatus === count.key
              ? { boxShadow: 'inset 0 0 0 1.5px var(--ui-primary)', background: 'color-mix(in srgb, var(--ui-primary) 10%, transparent)' }
              : undefined"
            @click="selectedStatus = count.key"
          >
            <div class="text-xs text-muted">
              {{ count.label }}
            </div>
            <div class="mt-1 text-lg font-medium tabular-nums">
              {{ count.value }}
            </div>
          </button>
        </div>

        <div class="overflow-x-auto rounded-lg ring ring-default bg-default">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-muted">
                <th class="text-left font-normal py-2.5 px-4">
                  Name
                </th>
                <th class="text-left font-normal py-2.5 px-4">
                  Ticket
                </th>
                <th class="text-left font-normal py-2.5 px-4">
                  Hosting
                </th>
                <th class="text-left font-normal py-2.5 px-4">
                  T-shirt
                </th>
                <th class="text-left font-normal py-2.5 px-4">
                  Payment
                </th>
                <th class="text-right font-normal py-2.5 px-4">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in filteredRows"
                :key="row.email"
                class="border-t border-default"
              >
                <td class="py-2.5 px-4">
                  <div class="font-medium">
                    {{ row.preferredName }}
                  </div>
                  <div class="text-muted">
                    {{ row.pronouns }}
                  </div>
                </td>
                <td class="py-2.5 px-4 text-muted">
                  {{ row.ticketType }}
                </td>
                <td class="py-2.5 px-4">
                  <UBadge
                    :color="hostingPillColor[row.hosting]"
                    variant="subtle"
                    size="sm"
                  >
                    {{ row.hosting }}
                  </UBadge>
                </td>
                <td class="py-2.5 px-4 text-muted">
                  {{ row.tShirt ?? "—" }}
                </td>
                <td class="py-2.5 px-4">
                  <UBadge
                    :color="statusPillColor[row.paymentStatus]"
                    variant="subtle"
                    size="sm"
                  >
                    {{ row.paymentStatus }}
                  </UBadge>
                </td>
                <td class="py-2.5 px-4 text-right text-muted">
                  {{ formatDate(row.registeredOn) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-sm text-muted">
          Showing {{ filteredRows.length }} of {{ totalSold }}.
        </p>
      </div>
    </template>
  </UDashboardPanel>
</template>
