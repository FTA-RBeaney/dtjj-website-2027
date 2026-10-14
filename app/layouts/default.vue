<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const user = useSupabaseUser();
const route = useRoute();
const toast = useToast();

const { data: events } = await useFetch("/api/events"); ;

const open = ref(false);

const links = [[{
  label: "Home",
  icon: "i-lucide-house",
  to: "/",
  onSelect: () => {
    open.value = false;
  },
}, {
  label: "Inbox",
  icon: "i-lucide-inbox",
  to: "/inbox",
  badge: "4",
  onSelect: () => {
    open.value = false;
  },
}, {
  label: "Customers",
  icon: "i-lucide-users",
  to: "/customers",
  onSelect: () => {
    open.value = false;
  },
}, {
  label: "Settings",
  to: "/settings",
  icon: "i-lucide-settings",
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
    label: "Members",
    to: "/settings/members",
    onSelect: () => {
      open.value = false;
    },
  }, {
    label: "Notifications",
    to: "/settings/notifications",
    onSelect: () => {
      open.value = false;
    },
  }, {
    label: "Security",
    to: "/settings/security",
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
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
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

    <div class="w-100 flex-grow">
      <slot />
    </div>

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
