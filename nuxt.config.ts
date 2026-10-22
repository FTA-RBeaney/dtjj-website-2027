// https://nuxt.com/docs/api/configuration/nuxt-config

import "./app/lib/env";

const videoJsElements = new Set(["video-player", "video-skin", "mux-video", "mux-data"]);

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/a11y",
    "@nuxt/hints",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/google-fonts",
    "@nuxtjs/supabase",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2026-06-30",

  eslint: {
    config: {
      standalone: false,
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => videoJsElements.has(tag),
    },
  },
});
