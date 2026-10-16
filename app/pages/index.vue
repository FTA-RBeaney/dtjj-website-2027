<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import moment from "moment";

const { isNotificationsSlideoverOpen } = useDashboard();

const items = [[{
  label: "New mail",
  icon: "i-lucide-send",
  to: "/inbox",
}, {
  label: "New customer",
  icon: "i-lucide-user-plus",
  to: "/customers",
}]] satisfies DropdownMenuItem[][];

const { data: events } = await useFetch("/api/events");

const startDate = moment(events?.value?.[0]?.startDate).format("MMMM Do YYYY");
const endDate = moment(events?.value?.[0]?.endDate).format("MMMM Do YYYY");
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar :title="`${events?.[0]?.name ?? 'Event'} (${startDate} - ${endDate})`" :ui="{ right: 'gap-3' }">
        <!-- <template #leading>
          <UDashboardSidebarCollapse />
        </template> -->

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton
              icon="i-lucide-plus"
              size="md"
              class="rounded-full"
            />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- stat cards -->
      <HomeStats />
    </template>
  </UDashboardPanel>
</template>
