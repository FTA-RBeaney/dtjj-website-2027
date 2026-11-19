<script setup>
// const footerLinks = [
//   { name: "Tickets", href: "/tickets" },
//   { name: "Schedule", href: "/schedule" },
//   { name: "FAQ", href: "/faq" },
//   { name: "Meet the team", href: "/meet-the-team" },
//   { name: "Values", href: "/values" },
// ];

// const footerLinks2 = [
//   { name: "Code of conduct", href: "/code-of-conduct" },
//   { name: "Refund policy", href: "/refund-policy" },
//   { name: "Privacy", href: "/privacy" },
//   { name: "Terms", href: "/terms" },
// ];
</script>

<template>
  <footer
    class="relative w-full items-center justify-around pb-16 mt-10"
  >
    <!-- Page colour rolling into the footer as an uneven wave. Stretches to full width; waves stay readable when scaled. -->
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 H1440 V58 C1396.7,52.7 1265,21.7 1180,26 C1095,30.3 1010,82.7 930,84 C850,85.3 776.7,36 700,34 C623.3,32 551.7,74.7 470,72 C388.3,69.3 288.3,22.3 210,18 C131.7,13.7 35,41.3 0,46 Z"
      />
    </svg>

    <UContainer>
      <div class=" max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-8 w-8/12 justify-center mx-auto">
          <!-- <NuxtLink
            v-for="link in footerLinks"
            :key="link.name"
            :href="link.href"
          >
            {{ link.name }}
          </NuxtLink> -->
        </div>
        <div class="flex flex-col md:flex-row items-center gap-8 w-8/12 justify-center mx-auto mt-4">
          <!-- <NuxtLink
            v-for="link in footerLinks2"
            :key="link.name"
            :href="link.href"
            class="text-sm"
          >
            {{ link.name }}
          </NuxtLink> -->
        </div>
      </div>
      <div>
        <div class="max-w-2xl mx-auto flex gap-10 items-center justify-center mt-8">
          <div class="flex items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61586140684577"
              target="_blank"
              class="transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/downtownjazzjam/"
              target="_blank"
              class="transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
        <p class="mt-8 text-center">
          © 2026 Downtown Jazz Jam · Site by Robert Beaney
        </p>
      </div>
      <div class="mt-10">
        <h3 class="text-7xl font-bold font-lazy">
          Downtown Jazz Jam
        </h3>
        <div class="text-lg font-bold font-lazy text-center">
          A swing dance festival in London, England
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<style scoped>
footer {
  /* Content above (paper) rolls into the footer (jam) as a wave. */
  --wave-height: clamp(48px, 7vw, 110px);
  --footer-bg: var(--color-paper-2);
  --footer-ink: var(--color-accent-ink);
  background: var(--footer-bg);
  color: var(--footer-ink);
  padding-top: calc(var(--wave-height) + 3rem);
}

footer > svg {
  position: absolute;
  inset: 0 0 auto;
  display: block;
  width: 100%;
  height: var(--wave-height);
  fill: var(--color-paper);
  pointer-events: none;
}

footer a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

footer h3 {
  font-size: clamp(2.5rem, 4vw + 5rem, 50rem);
  text-align: center;
}
</style>
