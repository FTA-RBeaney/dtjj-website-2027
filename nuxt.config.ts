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

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/about", "/faq", "/contact", "/signup"],
    },
  },

  googleFonts: {
    families: {
      "Archivo": [400, 600, 700, 800],
      "Instrument+Serif": [400],
    },
    display: "swap",
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
