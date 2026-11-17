<script setup lang="ts">
definePageMeta({
  layout: "website",
});

const { data: page } = await useAsyncData("vision", () =>
  queryCollection("pages").path("/vision").first());

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

useSeoMeta({
  title: `${page.value.title} | Downtown Jazz Jam`,
  description: page.value.description,
});
</script>

<template>
  <div v-if="page">
    <WebsiteHeader
      :title="page.title"
      :subtitle="page.description"
    />

    <section class="section">
      <div class="container">
        <div class="prose" style="max-width: 65ch; margin-inline: 0;">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </section>
  </div>
</template>
