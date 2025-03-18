<template>
  <div ref="itemViewer" class="item-viewer">
    <div class="sub-nav">
      <BackButton />
      <h1>{{ tagName }}</h1>
    </div>
    <p v-if="description">{{ description }}</p>
    <ItemsView :items="tagItems"></ItemsView>
  </div>
</template>

<script lang="ts">
import ItemsView from "@/components/ItemsView.vue";
import { type SanityImageItem } from "~/composables/useItemsLayout";

let handleResizeRef: (() => void) | null = null;

export default {
  components: {
    ItemsView,
  },
  data() {
    return {
      tagName: null as string | null,
      tagId: null as string | null,
      description: null as string | null,
      tagItems: [] as SanityImageItem[],
      tags: [] as {
        thumbnailImgId: string;
        description?: string;
        tagId: string;
        tagName: string;
      }[],
    };
  },
  head() {
    return {
      // title: "Olaf Yang - " + this.tagName,
    };
  },
  created() {
    const { sanityClient, builder: urlBuilder } = useSanity();
    sanityClient
      ?.fetch(
        `*[_type == "tag" && tagID == "${this.$route.params.id}"][0]
    {
    tagID,
    name,
    description,
    "photos": *[_type == "photo" && references(^._id)]{objectID, "url": photo.asset->url, "dimensions": photo.asset->metadata.dimensions, "photo": photo.asset}
    }`
      )
      .then((res) => {
        this.tagName = res.name;
        this.tagId = res.tagId;
        this.description = res.description;
        let items = res.photos.map((item: any) => {
          return {
            aspectRatio: item.dimensions.aspectRatio,
            id: item.objectID,
            imgId: item.photo._ref,
            url: urlBuilder?.image(item.url).height(500).url(),
          };
        });
        this.tagItems = useItemsLayout(items, {
          targetRowHeight: 200,
          containerWidth: (
            this.$refs.itemViewer as HTMLElement
          )?.getBoundingClientRect().width,
          containerPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        });
        const handleResize = () => {
          this.tagItems = useItemsLayout(this.tagItems, {
            targetRowHeight: 200,
            containerWidth: (
              this.$refs.itemViewer as HTMLElement
            )?.getBoundingClientRect().width,
            containerPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          });
        };

        handleResizeRef = handleResize;
        window?.addEventListener("resize", handleResize);
      });
  },
  mounted() {
    this.tagItems = useItemsLayout(this.tagItems, {
      targetRowHeight: 200,
      containerWidth: (
        this.$refs.itemViewer as HTMLElement
      )?.getBoundingClientRect().width,
      containerPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    });
    const handleResize = () => {
      this.tagItems = useItemsLayout(this.tagItems, {
        targetRowHeight: 200,
        containerWidth: (
          this.$refs.itemViewer as HTMLElement
        ).getBoundingClientRect().width,
        containerPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      });
    };
    handleResizeRef = handleResize;
    window.addEventListener("resize", handleResize);
  },
  beforeRouteLeave() {
    if (handleResizeRef) {
      window.removeEventListener("resize", handleResizeRef);
    }
  },
};
</script>

<style></style>
