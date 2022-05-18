<template>
  <div class="item-viewer">
    <div class="sub-nav">
      <img
        class="back-icon"
        src="/static/arrow_back.svg"
        @click="this.$root.previousPage"
        alt="Back"
      />
      <h1>{{ tagName }}</h1>
    </div>
    <p v-if="description">{{ description }}</p>
    <ItemsView :items="items"></ItemsView>
  </div>
</template>

<script>
import ItemsView from "@/components/ItemsView.vue";
import { getItemsWithLayout } from "@/layout";

export default {
  components: {
    ItemsView,
  },
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
        `*[_type == "tag" && tagID == "${this.$route.params.id}"][0]
    {
    tagID,
    name,
    description,
    "photos": *[_type == "photo" && references(^._id)]{objectID, "url": photo.asset->url, "dimensions": photo.asset->metadata.dimensions}
    }`
      )
      .then((res) => {
        if (res === null) {
          this.$router.replace("/error/404");
          return;
        }
        this.tagName = res.name;
        this.tagID = res.tagID;
        this.description = res.description;
        let items = res.photos.map((item) => {
          return {
            aspectRatio: item.dimensions.aspectRatio,
            id: item.objectID,
            url: this.$root.sanityImgUrlBuilder.image(item.url).size(500).url(),
          };
        });
        this.items = getItemsWithLayout(items);
      });
  },

  beforeUpdate() {
    const itemViewRect = document
      .querySelector("div.item-viewer")
      .getBoundingClientRect();
    const options = {
      targetRowHeight: 200,
      containerWidth: itemViewRect.width,
      containerPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    };
    this.items = getItemsWithLayout(this.items, options);
  },
};
</script>

<style></style>
