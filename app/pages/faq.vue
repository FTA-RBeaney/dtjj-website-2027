<script setup lang="ts">
definePageMeta({
  layout: "website",
});

useSeoMeta({
  title: "FAQ | Downtown Jazz Jam",
  description: "Answers to common questions about Downtown Jazz Jam.",
});

const { data: faqs } = await useFetch("/api/faq");
</script>

<template>
  <div>
    <WebsiteHeader title="Frequently asked questions" />
    <section class="section">
      <div class="container">
        <div class="rows">
          <div
            v-for="item in faqs"
            :key="item.question"
            class="rows__row"
          >
            <FaqItem :item="item" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
