<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Newsletter } from "#shared/schemas/newsletter";
import { NewsletterSchema } from "#shared/schemas/newsletter";

const toast = useToast();

const formState = reactive<Partial<Newsletter>>({
  name: "",
  email: "",
});

async function onSubmit(event: FormSubmitEvent<Newsletter>) {
  const result = NewsletterSchema.safeParse(event.data);

  if (!result.success) {
    toast.add({
      title: "Newsletter Sign Up",
      description: "Please check your input.",
      color: "error",
    });
    return;
  }

  await $fetch("/api/newsletter", { method: "POST", body: event.data });

  toast.add({
    title: "Newsletter Sign Up",
    description: "Thank you for signing up!",
    color: "success",
  });
}
</script>

<template>
  <div class="signup">
    <p class="signup__title">
      Join the list for 2027
    </p>
    <p>
      One email when tickets and the lineup for the next edition are ready. No spam, no selling your details on.
    </p>
    <UForm
      :schema="NewsletterSchema"
      :state="formState"
      @submit="onSubmit"
    >
      <div class="field-row">
        <UFormField name="name">
          <label for="newsletter-name">Name</label>
          <input
            id="newsletter-name"
            v-model="formState.name"
            type="text"
            autocomplete="name"
          >
        </UFormField>
        <UFormField name="email">
          <label for="newsletter-email">Email</label>
          <input
            id="newsletter-email"
            v-model="formState.email"
            type="email"
            autocomplete="email"
          >
        </UFormField>
      </div>
      <UButton
        type="submit"
        class="btn btn--primary"
        block
      >
        Sign up
      </UButton>
    </UForm>
  </div>
</template>
