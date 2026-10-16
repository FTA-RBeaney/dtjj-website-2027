<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

const { data: ticketTypes, refresh } = await useFetch("/api/ticket-types");

type TicketType = {
  id: string;
  name: string;
  description: string | null;
  priceInPence: number;
  maxQuantity: number;
  createdAt: string;
};

const formatPrice = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format;

const columns: TableColumn<TicketType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "priceInPence",
    header: "Price",
    cell: ({ row }) => formatPrice(row.getValue<number>("priceInPence") / 100),
  },
  {
    accessorKey: "maxQuantity",
    header: "Max quantity",
    cell: ({ row }) => row.getValue("maxQuantity"),
  },
];
</script>

<template>
  <div class="flex flex-col w-full lg:max-w-2xl mx-auto">
    <UPageCard
      title="Ticket types"
      description="Create the ticket types customers will be able to purchase for this event."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <SettingsAddTicketTypeModal @created="refresh" />
    </UPageCard>
    <UTable
      :data="ticketTypes"
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
