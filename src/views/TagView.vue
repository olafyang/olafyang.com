<template>
  <div class="item-viewer">
    <h1>{{ tagName }}</h1>
    <ItemsView :items="items"></ItemsView>
  </div>
</template>

<script>
import ItemsView from "@/components/ItemsView.vue";

export default {
  components: {
    ItemsView,
  },
  data() {
    return {
      tagName: null,
      tagID: null,
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
    "photos": *[_type == "photo" && references(^.name)]{objectID, "url": photo.asset->url}
    }`
      )
      .then((res) => {
        this.tagName = res.tagName;
        this.tagID = res.name.replace("tag_", "");
        this.items = res.photos.map((item) => {
          return {
            id: item.objectID,
            url: this.$root.sanityImgUrlBuilder.image(item.url).size(500).url(),
          };
        });
      });
  },
};
</script>

<style>
.item-viewer {
  max-width: 80%;
}
.items {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-auto-flow: dense;
  grid-gap: 0.3rem;

  /* flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  flex: 25%;
  margin: 0 1%; */
}
.items img {
  max-width: 200px;
  margin-bottom: 1%;
  border-radius: 30px;
}
</style>
