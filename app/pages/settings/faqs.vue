<script setup lang="ts">
const { data: faqs, refresh } = await useFetch("/api/faq");
</script>

<template>
  <div class="flex flex-col  w-full lg:max-w-2xl mx-auto">
    <UCard
      title="FAQs"
      description="Manage your frequently asked questions."
      orientation="horizontal"
      class="mb-4"
    >
      <template #default>
        <div v-if="faqs && faqs.length">
          <ul class="space-y-4">
            <li v-for="faq in faqs" :key="faq.id">
              <strong>{{ faq.question }}</strong>
              <p>{{ faq.answer }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
          No FAQs available.
        </div>
      </template>

      <template #footer>
        <SettingsAddFaqModal @created="refresh" />
      </template>
    </UCard>
  </div>
</template>
