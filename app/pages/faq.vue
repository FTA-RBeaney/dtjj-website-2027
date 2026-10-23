<script setup lang="ts">
import { faqs } from "~/data/faqs";

definePageMeta({
  layout: "website",
});

useSeoMeta({
  title: "FAQ | Downtown Jazz Jam",
  description: "Answers to common questions about Downtown Jazz Jam.",
});
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
