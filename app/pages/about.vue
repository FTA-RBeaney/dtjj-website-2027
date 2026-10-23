<script setup lang="ts">
definePageMeta({
  layout: "website",
});

useSeoMeta({
  title: "About | Downtown Jazz Jam",
  description: "What Downtown Jazz Jam is, who it’s for, and what to expect at the next edition in London.",
});
</script>

<template>
  <div>
    <WebsiteHeader
      title="About Downtown Jazz Jam"
      subtitle="A London swing dance festival with live music, dance workshops and social events."
    />

    <section class="section">
      <div class="container">
        <div class="prose" style="max-width: 65ch; margin-inline: 0;">
          <p class="lead">
            Downtown Jazz Jam is run for the community, by people who love to dance: an inclusive celebration of jazz dance, on the dancefloor and off it.
          </p>
          <p>
            The festival brings together live music, workshops with visiting teachers and social dancing across a long weekend each spring. In 2026, Skye Humphries, Trisha, Junior Laniyan and Kanini played the weekend, and the whole thing closed out with a dancefloor full of people who came to celebrate swing.
          </p>
          <p>
            We’re currently planning the 2027 edition, back in London from 30 April to 3 May. Join the mailing list on the <NuxtLink to="/">
              home page
            </NuxtLink> to hear when tickets and the lineup are ready.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
