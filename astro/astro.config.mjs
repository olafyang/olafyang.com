import { defineConfig, envField } from "astro/config";

export default defineConfig({
  site: "https://olafyang.com",
  cacheDir: "./.astroCache",
  build: {
    outDir: "dist",
  },

  server: {
    port: 3000,
  },

  image: {
    domains: ["cdn.sanity.io"],
  },

  env: {
    schema: {
      SANITY_PROJECT_ID: envField.string({
        context: "server",
        access: "public",
      }),
      SANITY_DATASET: envField.string({
        context: "server",
        access: "public",
        optional: true,
        default: "production",
      }),
      SANITY_API_VERSION: envField.string({
        context: "server",
        access: "public",
        optional: true,
        default: "v2021-10-21",
      }),
      SANITY_USE_CDN: envField.boolean({
        context: "server",
        access: "public",
        optional: true,
        default: true,
      }),
      SANITY_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
});
