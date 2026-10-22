<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import moment from "moment";
import * as z from "zod";

const { data: events } = await useFetch("/api/events");

const profileSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Too short"),
  startDate: z.string(),
  endDate: z.string(),
});

type ProfileSchema = z.output<typeof profileSchema>;

const profile = reactive<Partial<ProfileSchema>>({
  id: events?.value?.[0]?.id,
  name: events?.value?.[0]?.name ?? "No Event",
  startDate: moment(events?.value?.[0]?.startDate).format("YYYY-MM-DD"),
  endDate: moment(events?.value?.[0]?.endDate).format("YYYY-MM-DD"),
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  const { data: updatedEvent } = await useFetch("/api/events", {
    method: "PATCH",
    body: JSON.stringify({
      id: event.data.id,
      name: event.data.name,
      startDate: event.data.startDate,
      endDate: event.data.endDate,
    }),
  });

  if (!updatedEvent?.value) {
    toast.add({
      title: "Error",
      description: "Failed to update the event.",
      icon: "i-ph-warning-circle",
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Success",
    description: `${updatedEvent?.value?.name} has been updated successfully.`,
    icon: "i-ph-check",
    color: "success",
  });
}
</script>

<template>
  <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
    <UForm
      id="settings"
      :schema="profileSchema"
      :state="profile"
      @submit="onSubmit"
    >
      <UCard
        title="Profile"
        description="This information will be displayed publicly."
        orientation="horizontal"
        class="mb-4"
      >
        <template #default>
          <UPageCard variant="naked">
            <UFormField
              name="name"
              label="Name"
              description="The name of the event."
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput
                v-model="profile.name"
                autocomplete="off"
                class="min-w-xs"
              />
            </UFormField>
            <USeparator />
            <UFormField
              name="startDate"
              label="Start Date"
              description="The start date of the event."
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput
                v-model="profile.startDate"
                type="date"
                autocomplete="off"
              />
            </UFormField>
            <USeparator />
            <UFormField
              name="endDate"
              label="End Date"
              description="The end date of the event."
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput
                v-model="profile.endDate"
                type="date"
                autocomplete="off"
              />
            </UFormField>
          </UPageCard>
        </template>

        <template #footer>
          <UButton
            form="settings"
            label="Save changes"
            color="neutral"
            type="submit"
            class="w-fit lg:ms-auto"
          />
        </template>
      </UCard>
    </UForm>
  </div>
</template>
