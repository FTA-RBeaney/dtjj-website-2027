<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import moment from "moment";
import * as z from "zod";

const { data: events } = await useFetch("/api/events");

const profileSchema = z.object({
  name: z.string().min(2, "Too short"),
  startDate: z.string(),
  endDate: z.string(),
});

type ProfileSchema = z.output<typeof profileSchema>;

const profile = reactive<Partial<ProfileSchema>>({
  name: events?.value?.[0]?.name ?? "No Event",
  startDate: moment(events?.value?.[0]?.startDate).format("YYYY-MM-DD"),
  endDate: moment(events?.value?.[0]?.endDate).format("YYYY-MM-DD"),
});
const toast = useToast();
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  toast.add({
    title: "Success",
    description: "Your settings have been updated.",
    icon: "i-lucide-check",
    color: "success",
  });
  console.log(event.data);
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
      <UPageCard
        title="Profile"
        description="These informations will be displayed publicly."
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <UButton
          form="settings"
          label="Save changes"
          color="neutral"
          type="submit"
          class="w-fit lg:ms-auto"
        />
      </UPageCard>

      <UPageCard variant="subtle">
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
    </UForm>
  </div>
</template>
