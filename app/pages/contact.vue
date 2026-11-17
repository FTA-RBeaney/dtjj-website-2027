<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Contact } from "../../shared/schemas/contact";
import { contactSchema } from "../../shared/schemas/contact";

definePageMeta({
  layout: "website",
});

useSeoMeta({
  title: "Contact | Downtown Jazz Jam",
  description: "Get in touch with Downtown Jazz Jam.",
});

const formState = reactive<Partial<Contact>>({
  name: "",
  email: "",
  message: "",
});

const sent = ref(false);

function handleSubmit(event: FormSubmitEvent<Contact>) {
  console.log("Submitted", event.data);
  sent.value = true;
}
</script>

<template>
  <div>
    <WebsiteHeader title="Contact" subtitle="Questions, feedback, or want to get involved? Send us a message." />

    <section class="section">
      <div class="container split">
        <div class="card">
          <NewsletterForm />
          <UForm
            :schema="contactSchema"
            :state="formState"
            @submit="handleSubmit"
          >
            <div class="form-grid">
              <div class="form-field">
                <UFormField name="name">
                  <label for="contact-name">Name</label>
                  <input
                    id="contact-name"
                    v-model="formState.name"
                    type="text"
                    autocomplete="name"
                  >
                </UFormField>
              </div>
              <div class="form-field">
                <UFormField name="email">
                  <label for="contact-email">Email</label>
                  <input
                    id="contact-email"
                    v-model="formState.email"
                    type="email"
                    autocomplete="email"
                  >
                </UFormField>
              </div>
              <div class="form-field">
                <UFormField name="message">
                  <label for="contact-message">Message</label>
                  <textarea id="contact-message" v-model="formState.message" />
                </UFormField>
              </div>
              <button type="submit" class="btn btn--primary">
                Send message
              </button>
              <p class="form-status" role="status">
                <template v-if="sent">
                  This form is not connected yet; your message was not sent. Email us directly instead.
                </template>
              </p>
            </div>
          </UForm>
        </div>
      </div>
    </section>
  </div>
</template>
