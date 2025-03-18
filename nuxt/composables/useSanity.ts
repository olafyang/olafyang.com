import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export default function useSanity() {
  const appConf = useAppConfig();

  const sanityClient = createClient({
    projectId: appConf.VUE_APP_SANITY_PROJECT_ID,
    dataset: appConf.VUE_APP_SANITY_DATASET,
    apiVersion: appConf.VUE_APP_SANITY_API_VERSION,
    useCdn: appConf.VUE_APP_SANITY_USE_CDN,
  });
  const builder = imageUrlBuilder(sanityClient);

  return {
    sanityClient,
    builder,
  };
}
