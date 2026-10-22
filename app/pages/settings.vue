<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const links = [[{
  label: "General",
  icon: "i-ph-gear",
  to: "/settings",
  exact: true,
}, {
  label: "Team",
  icon: "i-ph-users",
  to: "/settings/team",
}, {
  label: "Tickets",
  icon: "i-ph-ticket",
  to: "/settings/tickets",
}, {
  label: "Discounts",
  icon: "i-ph-shield",
  to: "/settings/discounts",
}]] satisfies NavigationMenuItem[][];
</script>

<template>
  <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Settings">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        <UNavigationMenu
          :items="links"
          highlight
          class="-mx-1 flex-1"
        />
      </UDashboardToolbar>
    </template>

    <template #body>
      <NuxtPage />
    </template>
  </UDashboardPanel>
</template>
