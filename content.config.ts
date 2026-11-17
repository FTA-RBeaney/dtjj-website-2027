import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // Markdown pages in /content (e.g. content/vision.md -> path "/vision")
    pages: defineCollection({
      type: "page",
      source: "*.md",
    }),
  },
});
