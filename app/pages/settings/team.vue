<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { h, resolveComponent } from "vue";

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const { data: team } = await useFetch("/api/team");
const toast = useToast();

type TeamMember = NonNullable<typeof team.value>[number];

const columns: TableColumn<TeamMember>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const color = {
        admin: "success" as const,
        member: "error" as const,
        guest: "neutral" as const,
      }[row.getValue("role") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("role"));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: "i-ph-dots-three-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
            }),
        ),
      );
    },
  },
];

function getRowItems(row: TableRow<TeamMember>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Copy user ID",
      onSelect() {
        toast.add({
          title: `User ID for ${row.getValue("email")} copied to clipboard!`,
          color: "success",
          icon: "i-ph-check-circle",
        });
      },
    },
    {
      type: "separator",
    },
    {
      label: "View customer",
    },
    {
      label: "View payment details",
    },
  ];
}
</script>

<template>
  <div class="flex flex-col  w-full lg:max-w-2xl mx-auto">
    <UCard
      title="Team"
      description="Manage your team members and their roles."
      orientation="horizontal"
      class="mb-4"
    >
      <template #default>
        <UTable
          :data="team"
          :columns="columns"
          class="shrink-0"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
            td: 'border-b border-default',
            separator: 'h-0',
          }"
        />
      </template>
    </UCard>
  </div>
</template>
