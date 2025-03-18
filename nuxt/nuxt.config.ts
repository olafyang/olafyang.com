import { createClient } from "@sanity/client";

import { toURLSafe } from "./utils/objectId";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = "production";
const apiVersion = "v2021-10-21";
const useCdn = true;

async function getRotes() {
  const client = createClient({
    projectId: projectId,
    dataset: dataset,
    apiVersion: apiVersion,
    useCdn: useCdn,
  });
  const allRoutes: string[] = [];

  await client
    .fetch(`*[_type == "photo"]{objectID}`)
    .then((res) =>
      res.forEach((photo: any) =>
        allRoutes.push(`/view/${toURLSafe(photo.objectID)}`)
      )
    );

  await client
    .fetch(`*[_type == "tag"]{tagID}`)
    .then((res) =>
      res.forEach((tag: any) => allRoutes.push(`/tags/${tag.tagID}`))
    );
  return allRoutes;
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default async () =>
  defineNuxtConfig({
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

    nitro: {
      prerender: {
        crawlLinks: true,
        routes: await getRotes(),
      },
    },

    appConfig: {
      VUE_APP_SANITY_PROJECT_ID: projectId,
      VUE_APP_SANITY_DATASET: dataset,
      VUE_APP_SANITY_API_VERSION: apiVersion,
      VUE_APP_SANITY_USE_CDN: useCdn,
    },
    image: {
      domains: ["cdn.sanity.io"],
      sanity: {
        projectId: projectId,
        dataset: dataset,
        apiVersion: apiVersion,
        useCdn: useCdn,
      },
    },
  });
