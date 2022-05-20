<template>
  <div class="item-viewer">
    <div class="sub-nav">
      <img
        class="back-icon"
        src="/static/arrow_back.svg"
        @click="this.$root.previousPage"
        alt="Back"
      />
      <h1>Explore</h1>
    </div>
    <ItemsView :items="items"></ItemsView>
  </div>
</template>

<script>
import { getItemsWithLayout } from "@/layout";
import ItemsView from "../components/ItemsView.vue";

let handleResizeRef = null;

export default {
  data() {
    return {
      tagName: null,
      tagID: null,
      description: null,
      items: null,
    };
  },
  created() {
    this.$root.sanityClient
      .fetch(
        `*[_type == "photo"][0...200]
    {
    objectID,
    "url": photo.asset->url,
    "aspectRatio": photo.asset->metadata.dimensions.aspectRatio
    }`
      )
      .then((res) => {
        if (res === null) {
          this.$router.replace("/error/404");
          return;
        }
        let items = res.map((item) => {
          return {
            id: item.objectID,
            url: this.$root.sanityImgUrlBuilder.image(item.url).size(500).url(),
            aspectRatio: item.aspectRatio,
          };
        });
        this.items = getItemsWithLayout(items, {
          targetRowHeight: 200,
          containerWidth:
            document.querySelector("div.item-viewer").getBoundingClientRect()
              .width - 11,
          containerPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        });
      });

    const handleResize = () => {
      this.items = getItemsWithLayout(this.items, {
        targetRowHeight: 200,
        containerWidth: document
          .querySelector("div.item-viewer")
          .getBoundingClientRect().width,
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
    window.removeEventListener("resize", handleResizeRef);
  },
  components: {
    ItemsView,
  },
};
</script>

<style></style>
