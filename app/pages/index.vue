<script setup lang="ts">
import type { VariantType } from "motion-v";
import { motion, useReducedMotion } from "motion-v";
import "@videojs/html/media/mux-video";

type Variants = Record<string, VariantType>;

definePageMeta({
  layout: "website",
});

useSeoMeta({
  title: "Downtown Jazz Jam | London Swing Dance Festival, 1st - 4th May 2026",
  description:
    "Downtown Jazz Jam is a London Swing Dance festival that celebrates the vibrant culture of swing dancing through live music, dance workshops, and social events. Join us for an inclusive celebration of jazz dance.",
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
          { "@type": "Person", "name": "Skye Humphries" },
          { "@type": "Person", "name": "Trisha" },
          { "@type": "Person", "name": "Junior Laniyan" },
          { "@type": "Person", "name": "Kanini" },
        ],
      }),
    },
  ],
});

const TITLE = "WELCOME";
// const LIVEMUSIC = "MUSIC";
// const CLASSES = "CLASSES";
// const AFTERPARTIES = "AFTERPARTIES";
// const JAZZJAM = "JAZZ JAM";

const reduce = useReducedMotion();

// Parent staggers each letter span; child defines the per-letter pop.
const letters = computed<Variants>(() => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: reduce.value ? 0 : 0.07, delayChildren: reduce.value ? 0 : 0.5 },
  },
}));

const letter = computed<Variants>(() =>
  reduce.value
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 40, rotate: 6 },
        visible: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { type: "spring", bounce: 0.5, duration: 0.6 },
        },
      },
);

// const cardVariants: Variants = {
//   offscreen: { opacity: 0, y: 60 },
//   onscreen: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", bounce: 0.3, duration: 0.8 },
//   },
// };

// // John Bubbles slides in from the right when his section scrolls into view.
// const slideIn = computed<Variants>(() =>
//   reduce.value
//     ? { hidden: { x: 0 }, visible: { x: 0 } }
//     : {
//         hidden: { x: 600 },
//         visible: { x: 0, transition: { duration: 0.8, ease: "easeOut" } },
//       },
// );
</script>

<template>
  <div>
    <section class="hero z-5 w-full relative">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        class="video-splat-top"
      >
        <path
          d="M0,0 H1440 V58 C1396.7,52.7 1265,21.7 1180,26 C1095,30.3 1010,82.7 930,84 C850,85.3 776.7,36 700,34 C623.3,32 551.7,74.7 470,72 C388.3,69.3 288.3,22.3 210,18 C131.7,13.7 35,41.3 0,46 Z"
        />
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        class="video-splat-bottom"
      >
        <path
          d="M0,0 H1440 V58 C1396.7,52.7 1265,21.7 1180,26 C1095,30.3 1010,82.7 930,84 C850,85.3 776.7,36 700,34 C623.3,32 551.7,74.7 470,72 C388.3,69.3 288.3,22.3 210,18 C131.7,13.7 35,41.3 0,46 Z"
        />
      </svg>
      <div class="hero__media-wrap" aria-hidden="true">
        <mux-video
          src="https://stream.mux.com/dODcKqr7S6C700uLo5fOBZ7MlIgMz01TEmWH02E1mnyVHE.m3u8"
          autoplay
          muted
          loop
          playsinline
          crossorigin="anonymous"
        />
      </div>

      <div class="marquee__scrim" />

      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          :initial="reduce ? false : { opacity: 0, y: -28, scale: 0.85 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }"
        >
          <motion.div
            :style="{ transformOrigin: 'top' }"
            :animate="reduce ? undefined : { rotate: [-2, 2] }"
            :transition="reduce ? undefined : { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.9 }"
          >
            <NuxtImg
              src="/dtjj-logo.webp"
              alt="Downtown Jazz Jam"
              width="300"
              height="300"
              preload
              fetchpriority="high"
              class="drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <motion.h1
          :aria-label="TITLE"
          :variants="letters"
          initial="hidden"
          animate="visible"
          class="mt-2 max-w-4xl text-7xl font-bold tracking-tight text-white uppercase drop-shadow-lg sm:text-8xl lg:text-9xl"
        >
          <motion.span
            v-for="(char, i) in TITLE"
            :key="i"
            aria-hidden="true"
            :variants="letter"
            class="inline-block"
          >
            {{ char }}
          </motion.span>
        </motion.h1>

        <motion.p
          class="font-lazy mt-1 text-3xl text-white/90 sm:text-4xl"
          :initial="reduce ? false : { opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: reduce ? 0 : 1.25, ease: 'easeOut' }"
        >
          to the jam
        </motion.p>
      </div>

      <motion.div
        class="absolute inset-x-0 bottom-8 z-10 flex justify-center"
        :initial="reduce ? false : { opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: reduce ? 0 : 1.8 }"
      >
        <div class="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/70 p-1.5">
          <motion.span
            class="h-2 w-1 rounded-full bg-white/80"
            :animate="reduce ? undefined : { y: [0, 6, 0] }"
            :transition="reduce ? undefined : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"
          />
        </div>
      </motion.div>
    </section>

    <section>
      <h2>Information coming soon...</h2>
    </section>

    <!-- <section class="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
      <h2 class="font-lazy text-2xl font-bold text-black">
        Welcome to Downtown Jazz Jam!
      </h2>
      <p class="font-lazy mt-4 text-2xl text-black/80">
        Downtown Jazz Jam is a celebration of jazz music and dance, bringing together musicians, dancers,
        and enthusiasts from all over the world. Join us for an unforgettable experience filled with live
        performances, classes, and afterparties.
      </p>
    </section>

    <section class="relative z-5 h-[90vh] w-full overflow-hidden">
      <motion.div
        :initial="reduce ? false : { opacity: 0, scale: 1 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        <NuxtImg
          src="/images/band-1.jpg"
          alt="Downtown Jazz Jam"
          class="absolute inset-0 z-1 h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div class="absolute inset-0 z-2 bg-linear-to-b from-black/30 via-black/10 to-black/60" />

      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-white"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.8, once: true }"
          :variants="cardVariants"
        >
          live every night
        </motion.p>
        <motion.h1
          :aria-label="LIVEMUSIC"
          :variants="letters"
          initial="hidden"
          while-in-view="visible"
          :in-view-options="{ once: true, amount: 0.3 }"
          class="mt-2 max-w-4xl text-7xl font-bold tracking-tight text-white uppercase drop-shadow-lg sm:text-8xl lg:text-9xl"
        >
          <motion.span
            v-for="(char, i) in LIVEMUSIC"
            :key="i"
            aria-hidden="true"
            :variants="letter"
            class="inline-block"
          >
            {{ char }}
          </motion.span>
        </motion.h1>
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-white/90"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.3, once: true }"
          :variants="cardVariants"
        >
          Saturday and Sunday evening parties with Duncan Hemstock and his band featuring Sara Oschlag,
          plus sets that keep the floor moving long after midnight.
        </motion.p>
      </div>
    </section>

    <motion.section
      class="relative z-5 h-[90vh] w-full overflow-hidden"
      initial="hidden"
      while-in-view="visible"
      :in-view-options="{ amount: 0.5, once: true }"
    >
      <motion.div
        class="h-full"
        :variants="slideIn"
      >
        <NuxtImg
          src="/images/john-w-bubbles.png"
          alt="Downtown Jazz Jam"
          width="600"
          height="734"
          loading="eager"
          class="absolute right-[-10%] bottom-[-25%] z-1 h-auto w-150 max-w-none"
        />
      </motion.div>

      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-black"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.8, once: true }"
          :variants="cardVariants"
        >
          inspired by the icons
        </motion.p>
        <motion.h1
          :aria-label="CLASSES"
          :variants="letters"
          initial="hidden"
          while-in-view="visible"
          :in-view-options="{ once: true, amount: 0.3 }"
          class="mt-2 max-w-4xl text-7xl font-bold tracking-tight text-black uppercase drop-shadow-lg sm:text-8xl lg:text-9xl"
        >
          <motion.span
            v-for="(char, i) in CLASSES"
            :key="i"
            aria-hidden="true"
            :variants="letter"
            class="inline-block"
          >
            {{ char }}
          </motion.span>
        </motion.h1>
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-black"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.3, once: true }"
          :variants="cardVariants"
        >
          Streams shaped by the jazz dance icons — Dawn Hampton, Mabel Lee, John Bubbles and more. Not
          levelled by ability, but by movement, impact and influence.
        </motion.p>
      </div>
    </motion.section>

    <section class="relative z-5 h-[90vh] w-full overflow-hidden">
      <motion.div
        :initial="reduce ? false : { opacity: 0, scale: 1 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        <NuxtImg
          src="/images/afterparty.jpg"
          alt="Downtown Jazz Jam"
          class="absolute inset-0 z-1 h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div class="absolute inset-0 z-2 bg-linear-to-b from-black/30 via-black/10 to-black/60" />

      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-white"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.8, once: true }"
          :variants="cardVariants"
        >
          late-night celebrations
        </motion.p>
        <motion.h1
          :aria-label="AFTERPARTIES"
          :variants="letters"
          initial="hidden"
          while-in-view="visible"
          :in-view-options="{ once: true, amount: 0.3 }"
          class="mt-2 max-w-4xl text-7xl font-bold tracking-tight text-white uppercase drop-shadow-lg sm:text-8xl lg:text-9xl"
        >
          <motion.span
            v-for="(char, i) in AFTERPARTIES"
            :key="i"
            aria-hidden="true"
            :variants="letter"
            class="inline-block"
          >
            {{ char }}
          </motion.span>
        </motion.h1>
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-white/90"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.3, once: true }"
          :variants="cardVariants"
        >
          The weekend ends with a night of dancing and drinking in the evening, with the occasional
          late-night jam.
        </motion.p>
      </div>

      <div class="fixed right-10 bottom-10 z-50">
        <NuxtLink
          to="/admin"
          class="rounded-lg bg-[#c8951a] px-6 py-3 text-white shadow-lg transition-colors hover:bg-[#b07f17]"
        >
          Admin
        </NuxtLink>
      </div>
    </section>

    <motion.section
      class="relative z-5 h-[90vh] w-full overflow-hidden"
      initial="hidden"
      while-in-view="visible"
      :in-view-options="{ amount: 0.5, once: true }"
    >
      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-black"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.8, once: true }"
          :variants="cardVariants"
        >
          a focus on the music
        </motion.p>
        <motion.h1
          :aria-label="JAZZJAM"
          :variants="letters"
          initial="hidden"
          while-in-view="visible"
          :in-view-options="{ once: true, amount: 0.3 }"
          class="mt-2 max-w-4xl text-7xl font-bold tracking-tight text-black uppercase drop-shadow-lg sm:text-8xl lg:text-9xl"
        >
          <motion.span
            v-for="(char, i) in JAZZJAM"
            :key="i"
            aria-hidden="true"
            :variants="letter"
            class="inline-block"
          >
            {{ char }}
          </motion.span>
        </motion.h1>
        <motion.p
          class="font-lazy mt-1 max-w-2xl text-3xl text-black"
          initial="offscreen"
          while-in-view="onscreen"
          :in-view-options="{ amount: 0.3, once: true }"
          :variants="cardVariants"
        >
          A jam where any musician can get up and play.
        </motion.p>
      </div>
    </motion.section> -->
  </div>
</template>

<style scoped>
.video-splat-top,
.video-splat-bottom {
  /* Content above (paper) rolls into the footer (jam) as a wave. */
  --wave-height: clamp(68px, 3vw, 110px);
  --negative-wave-height: calc(-1 * var(--wave-height));

  --footer-ink: var(--color-accent-ink);
  background: var(--footer-bg);
  color: var(--footer-ink);
  height: var(--wave-height);
  position: absolute;
  width: 100%;
}

.video-splat-top,
.video-splat-bottom {
  position: absolute;
  /* inset: 0 0 auto; */
  display: block;
  width: 100%;
  height: var(--wave-height);
  fill: var(--color-paper);
  pointer-events: none;
  width: 100%;
  left: 0;
  bottom: calc(var(--negative-wave-height) + 10px);
  z-index: 90;
}

.video-splat-top {
  top: 0;
}
.video-splat-bottom {
  bottom: 0;
  transform: rotate(180deg);
}
</style>
