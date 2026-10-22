<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Newsletter } from "../../shared/schemas/newsletter";
import { newsletterSchema } from "../../shared/schemas/newsletter";

const toast = useToast();

const formState = reactive<Partial<Newsletter>>({
  name: "",
  email: "",
});

async function onSubmit(event: FormSubmitEvent<Newsletter>) {
  await $fetch("/api/newsletter", { method: "POST", body: event.data });

  toast.add({
    title: "Newsletter Sign Up",
    description: "Thank you for signing up!",
    color: "success",
  });
}
</script>

<template>
  <UForm
    :schema="newsletterSchema"
    :state="formState"
    class="max-w-md mx-auto"
    @submit="onSubmit"
  >
    <UCard>
      <template #default>
        <div class="grid space-y-4">
          <UFormField label="Name" name="name">
            <UInput
              v-model="formState.name"
              autocomplete="off"
              class="min-w-xs"
            />
          </UFormField>
          <UFormField label="Email" name="email">
            <UInput
              v-model="formState.email"
              autocomplete="off"
              class="min-w-xs"
            />
          </UFormField>
        </div>
      </template>

      <template #footer>
        <UButton type="submit">
          Sign Up
        </UButton>
      </template>
    </UCard>
  </UForm>
</template>
