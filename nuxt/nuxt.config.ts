// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/fonts"],

  css: ["/assets/reset.css", "/assets/default.css"],

  fonts: {
    families: [
      {
        name: "Silka",
        provider: "local",
        weights: ["bold", "semibold", "light", "regular"],
        styles: ["normal", "italic"],
      },
    ],
  },

  appConfig: {
    VUE_APP_SANITY_PROJECT_ID: "c747b643",
    VUE_APP_SANITY_DATASET: "production",
    VUE_APP_SANITY_API_VERSION: "v2021-10-21",
    VUE_APP_SANITY_USE_CDN: true,
  },
  image: {
    domains: ["cdn.sanity.io"],
    sanity: {
      projectId: "c747b643",
      useCdn: true,
    },
  },
});
