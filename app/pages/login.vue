<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Login",
  description: "Login to your account to continue",
});

const supabase = useSupabaseClient();
const toast = useToast();
const loading = ref(false);

const fields = [{
  name: "email",
  type: "text" as const,
  label: "Email",
  placeholder: "Enter your email",
  required: true,
}];

const schema = z.object({
  email: z.email("Invalid email"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true;

  const { error } = await supabase.auth.signInWithOtp({
    email: payload.data.email,
    options: {
      emailRedirectTo: `${window.location.origin}/confirm`,
    },
  });

  loading.value = false;

  if (error) {
    toast.add({ title: "Could not send magic link", description: error.message, color: "error" });
    return;
  }

  toast.add({ title: "Check your inbox", description: `We've sent a login link to ${payload.data.email}`, color: "success" });
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :loading="loading"
    title="Welcome back"
    description="We'll email you a magic link to sign in."
    icon="i-lucide-lock"
    :submit="{ label: 'Send magic link' }"
    @submit="onSubmit"
  />
</template>
