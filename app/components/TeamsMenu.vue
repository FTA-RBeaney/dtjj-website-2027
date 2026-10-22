<script setup lang="ts">
const props = defineProps<{
  collapsed?: boolean;
  teams: any[];
}>();

const selectedTeam = ref(props.teams?.[0]);

const items = computed(() => {
  return [props.teams.map(team => ({
    ...team,
    onSelect() {
      selectedTeam.value = team;
    },
  })), [{
    label: "Create team",
    icon: "i-ph-plus-circle",
  }, {
    label: "Manage teams",
    icon: "i-ph-gear-six",
  }]];
});
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
        trailingIcon: collapsed ? undefined : 'i-ph-caret-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />
  </UDropdownMenu>
</template>
