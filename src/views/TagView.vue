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
    <p>{{ description }}</p>
    <ItemsView :items="items"></ItemsView>
  </div>
</template>

<script>
import ItemsView from "@/components/ItemsView.vue";

function getItemsWithLayout(items, options) {
  let layout = require("justified-layout")(
    items.map((item) => item.aspectRatio),
    options
  );
  let itemsWithLayout = [];
  for (let i = 0; i < items.length; i++) {
    itemsWithLayout.push({
      ...items[i],
      layout: layout.boxes[i],
    });
  }
  return itemsWithLayout;
}

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
        `*[_type == "tag" && name == "tag_${this.$route.params.id}"][0]
    {
    tagName,
    name,
    description,
    "photos": *[_type == "photo" && references(^.name)]{objectID, "url": photo.asset->url, "dimensions": photo.asset->metadata.dimensions}
    }`
      )
      .then((res) => {
        if (res === null) {
          this.$router.replace("/error/404");
          return;
        }
        this.tagName = res.tagName;
        this.tagID = res.name.replace("tag_", "");
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
