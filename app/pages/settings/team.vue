<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/table-core";

const { data: team } = await useFetch("/api/team");

type TeamMember = {
  id: number;
  email: string;
  role: string;
};

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
        paid: "success" as const,
        failed: "error" as const,
        refunded: "neutral" as const,
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
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
            }),
        ),
      );
    },
  },
];

function getRowItems(row: Row<TeamMember>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Copy user ID",
      onSelect() {
        copy(row.original.id);

        toast.add({
          title: "User ID copied to clipboard!",
          color: "success",
          icon: "i-lucide-circle-check",
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
    <UPageCard
      title="Team"
      description="Manage your team members and their roles."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    />
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
  </div>
</template>
