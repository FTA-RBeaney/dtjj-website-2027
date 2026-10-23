import antfu from "@antfu/eslint-config";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import { getDefaultAttributes } from "eslint-plugin-better-tailwindcss/api/defaults";
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  antfu({
    type: "app",
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: [".pnpm-store/**", "**/migrations/*", "drizzle/**", "supabase/**"],
  }, {
    rules: {
      "vue/max-attributes-per-line": ["error", {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      }],
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "unicorn/filename-case": ["error", {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        ignore: ["README.md"],
      }],
    },
  }),
  betterTailwindcss.configs["correctness-error"],
  {
    rules: {
      // the public site's own BEM-style component classes (nav, ticket, split, etc. — see
      // app/assets/css/website.css), not Tailwind utilities, so this rule never sees them as known.
      "better-tailwindcss/no-unknown-classes": ["error", {
        ignore: ["^(site|btn|split|recap|band|statement|rows|page-head|lead|form|field|prose|section|hero|signup|card|marquee|welcome-section)([-_].*)?$"],
      }],
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/assets/css/main.css",
        attributes: [
          ...getDefaultAttributes(),
          ["^v-bind:ui$", [{ match: "objectValues" }]],
        ],
      },
    },
  },
);
