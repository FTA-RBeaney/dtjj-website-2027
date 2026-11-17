<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const emit = defineEmits<{
  (e: "created"): void;
}>();

const open = ref(false);
const state = ref({
  question: "",
  answer: "",
});

const toast = useToast();
type Schema = z.output<typeof schema>;

const schema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/faq", {
    method: "POST",
    body: {
      question: event.data.question,
      answer: event.data.answer,
    },
  });

  toast.add({ title: "Success", description: `FAQ "${event.data.question}" added`, color: "success" });
  open.value = false;
  state.value.question = "";
  state.value.answer = "";
  emit("created");
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="New FAQ"
    description="Add a new FAQ for this event"
  >
    <UButton label="New FAQ" icon="i-ph-plus" />

    <template #body>
      <UForm
        class="space-y-4"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField
          label="Question"
          for="question"
        >
          <UInput
            id="question"
            v-model="state.question"
            label="Question"
            required
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Answer"
          for="answer"
        >
          <UTextarea
            id="answer"
            v-model="state.answer"
            label="Answer"
            required
            class="w-full"
          />
        </UFormField>

        <div class="mt-4">
          <UButton type="submit">
            Add FAQ
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
