<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "website",
});

const formState = reactive<Partial<ContactSchema>>({
  name: "",
  email: "",
  message: "",
});

function handleSubmit(event: FormSubmitEvent<ContactSchema>) {
  console.log("Submitted", event.data);
}
</script>

<template>
  <div>
    <WebsiteHeader title="Contact" />
    <UForm
      :schema="contactSchema"
      :state="formState"
      class="max-w-md mx-auto "
      @submit="handleSubmit"
    >
      <UCard>
        <template #header>
          <h2>Contact Us</h2>
        </template>

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
            <UFormField label="Message" name="message">
              <UInput
                v-model="formState.message"
                autocomplete="off"
                class="min-w-xs"
              />
            </UFormField>
          </div>
        </template>

        <template #footer>
          <UButton type="submit">
            Send message
          </UButton>
        </template>
      </UCard>
    </UForm>
  </div>
</template>
