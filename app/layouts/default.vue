<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const user = useSupabaseUser();
const route = useRoute();
const toast = useToast();

const { data: events } = await useFetch("/api/events"); ;

const open = ref(false);

const links = [[{
  label: "Overview",
  icon: "i-ph-house",
  to: "/admin",
  onSelect: () => {
    open.value = false;
  },
}, {
  label: "Attendees",
  icon: "i-ph-users",
  to: "/admin/attendees",
  onSelect: () => {
    open.value = false;
  },
}, {
  label: "Settings",
  to: "/settings",
  icon: "i-ph-gear",
  defaultOpen: true,
  type: "trigger",
  children: [{
    label: "General",
    to: "/settings",
    exact: true,
    onSelect: () => {
      open.value = false;
    },
  }, {
    label: "Team",
    to: "/settings/team",
    onSelect: () => {
      open.value = false;
    },
  }, {
    label: "Tickets",
    to: "/settings/tickets",
    onSelect: () => {
      open.value = false;
    },
  }],
}]] satisfies NavigationMenuItem[][];

const groups = computed(() => [{
  id: "links",
  label: "Go to",
  items: links.flat(),
}, {
  id: "code",
  label: "Code",
  items: [{
    id: "source",
    label: "View page source",
    icon: "i-simple-icons-github",
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === "/" ? "/index" : route.path}.vue`,
    target: "_blank",
  }],
}]);

const teams = computed(() => events.value?.map((event: any) => ({
  id: event.id,
  label: event.name,
  avatar: {
    src: event?.imageUrl,
    alt: event?.name,
  },
})));

onMounted(async () => {
  const cookie = useCookie("cookie-consent");
  if (cookie.value === "accepted") {
    return;
  }

  toast.add({
    title: "We use first-party cookies to enhance your experience on our website.",
    duration: 0,
    close: false,
    actions: [{
      label: "Accept",
      color: "neutral",
      variant: "outline",
      onClick: () => {
        cookie.value = "accepted";
      },
    }, {
      label: "Opt out",
      color: "neutral",
      variant: "ghost",
    }],
  });
});
</script>

<template>
  <UDashboardGroup unit="rem" class="overflow-visible bg-(--admin-frame)">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-transparent border-none"
      :ui="{ footer: 'lg:border-t lg:border-default/60' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu
          v-if="teams?.length"
          :collapsed="collapsed"
          :teams="teams"
        />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
          class="text-xs"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" :user="user" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <div class="flex flex-1 min-w-0 min-h-0 py-4">
      <slot />
    </div>

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
