import { type InjectionKey } from "vue";
import { type SanityClient } from "@sanity/client";
import builder from "@sanity/image-url";

export const sanityClientKey: InjectionKey<SanityClient> =
  Symbol("sanityClient");
export const urlBuilderKey: InjectionKey<ReturnType<typeof builder>> =
  Symbol("imageUrl");
