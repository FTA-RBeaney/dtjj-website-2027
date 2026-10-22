<script setup lang="ts">
definePageMeta({
  layout: "website",
});

// SEO Meta Tags
useSeoMeta({
  title: "Downtown Jazz Jam | London Swing Dance Festival, 1st - 4th May 2026",
  description:
    "Downtown Jazz Jam is a London Swing Dance festival that celebrates the vibrant culture of swing dancing through live music, dance workshops, and social events. Join us for an inclusive celebration of jazz dance.",
  keywords:
    "swing dance, London, jazz dance, Lindy Hop, dance festival, dance workshops, live music, social dancing, UK swing dance",
  author: "Downtown Jazz Jam",
  robots: "index, follow",

  // Open Graph
  ogType: "website",
  ogTitle:
    "Downtown Jazz Jam | London Swing Dance Festival, 1st - 4th May 2026",
  ogDescription:
    "A London Swing Dance festival celebrating the vibrant culture of swing dancing through live music, dance workshops, and social events.",
  ogUrl: "https://downtownjazzjam.uk",
  ogSiteName: "Downtown Jazz Jam",
  ogLocale: "en_GB",
  ogImage: "https://downtownjazzjam.uk/og-image.webp",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  ogImageAlt: "Downtown Jazz Jam - London Swing Dance Festival",

  // Twitter Card
  twitterCard: "summary_large_image",
  twitterTitle: "Downtown Jazz Jam | London Swing Dance Festival",
  twitterDescription:
    "A London Swing Dance festival celebrating the vibrant culture of swing dancing through live music, dance workshops, and social events.",
  twitterImage: "https://downtownjazzjam.uk/og-image.webp",
  twitterImageAlt: "Downtown Jazz Jam - London Swing Dance Festival",
});

// Additional head elements
useHead({
  link: [{ rel: "canonical", href: "https://downtownjazzjam.uk" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Downtown Jazz Jam",
        "description":
          "Downtown Jazz Jam is a London Swing Dance festival that celebrates the vibrant culture of swing dancing through live music, dance workshops, and social events.",
        "url": "https://downtownjazzjam.uk",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": "London",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "GB",
          },
        },
        "organizer": {
          "@type": "Organization",
          "name": "Downtown Jazz Jam",
          "url": "https://downtownjazzjam.uk",
        },
        "performer": [
          {
            "@type": "Person",
            "name": "Skye Humphries",
          },
          {
            "@type": "Person",
            "name": "Trisha",
          },
          {
            "@type": "Person",
            "name": "Junior Laniyan",
          },
          {
            "@type": "Person",
            "name": "Kanini",
          },
        ],
      }),
    },
  ],
});

// Preload main images on this page
// const { imagesLoaded } = useImagePreload([
//   Logo,
// ]);

const imagesLoaded = true;
</script>

<template>
  <div class="py-10">
    <!-- Show content only after images are loaded -->
    <div
      v-if="!imagesLoaded"
      class="flex min-h-screen items-center justify-center"
    >
      <div class="text-center">
        <div
          class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"
        />
      </div>
    </div>

    <div v-show="imagesLoaded">
      <NewsletterForm />
      <UiContainer class="gap-8 py-7 md:py-14">
        <div class="mx-auto max-w-4xl space-y-4 text-center">
          <h1 class="mt-0 mb-4 text-7xl font-bold tracking-wider">
            Downtown Jazz Jam 2026 is officially over!
          </h1>
          <h2 class="text-3xl">
            Thank you to everyone who came and made it so special!
          </h2>
          <p class="text-lg">
            We are currently planning the 2027 edition, but in the meantime
            check out the video from 2026:
          </p>
        </div>
      </UiContainer>

      <div class="mx-auto max-w-[90%] overflow-hidden rounded-lg bg-black my-10">
        <Player poster="https://downtownjazzjam.uk/img/finances.jpg" content-title="">
          <mux-video
            src="https://stream.mux.com/dODcKqr7S6C700uLo5fOBZ7MlIgMz01TEmWH02E1mnyVHE.m3u8"
            playsinline
            crossorigin="anonymous"
          />
          <!--
        Mux Data monitors playback quality and is selected by default
        for Mux video and audio sources.
      -->
          <mux-data />
        </Player>
      </div>
    </div>
  </div>
</template>

<style>
media-poster::part(image),
media-poster img {
  object-fit: cover;
}
</style>
