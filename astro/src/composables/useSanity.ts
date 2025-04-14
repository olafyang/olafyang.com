import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  SANITY_TOKEN,
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_USE_CDN,
} from "astro:env/server";

export function useSanity() {
  const sanityClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: SANITY_USE_CDN,
    token: SANITY_TOKEN,
  });
  const builder = imageUrlBuilder(sanityClient);

  return {
    sanityClient,
    builder,
  };
}

export default useSanity;
