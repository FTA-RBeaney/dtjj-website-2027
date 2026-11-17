<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const emit = defineEmits<{
  created: [];
}>();

const schema = z.object({
  name: z.string().min(2, "Too short"),
  description: z.string().optional(),
  price: z.number().min(0, "Must be 0 or more"),
  maxQuantity: z.number().int().min(1, "Must be at least 1"),
});

type Schema = z.output<typeof schema>;

const open = ref(false);
const state = reactive<Partial<Schema>>({
  name: "",
  description: "",
  price: undefined,
  maxQuantity: undefined,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/ticket-types", {
    method: "POST",
    body: {
      name: event.data.name,
      description: event.data.description,
      priceInPence: Math.round(event.data.price * 100),
      maxQuantity: event.data.maxQuantity,
    },
  });

  toast.add({ title: "Success", description: `Ticket type "${event.data.name}" added`, color: "success" });
  open.value = false;
  state.name = "";
  state.description = "";
  state.price = undefined;
  state.maxQuantity = undefined;
  emit("created");
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="New ticket type"
    description="Add a new ticket type for this event"
  >
    <UButton label="New ticket type" icon="i-ph-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Name"
          placeholder="Weekend Camping"
          name="name"
        >
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField
          label="Description"
          name="description"
        >
          <UTextarea v-model="state.description" class="w-full" />
        </UFormField>
        <UFormField
          label="Price (£)"
          name="price"
        >
          <UInputNumber
            v-model="state.price"
            :min="0"
            :step="1"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Max quantity"
          name="maxQuantity"
        >
          <UInputNumber
            v-model="state.maxQuantity"
            :min="1"
            class="w-full"
          />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Create"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
