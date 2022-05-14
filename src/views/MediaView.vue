<template>
  <div class="viewer-container">
    <div class="viewer">
      <ul class="tags">
        <li v-for="tag in tags" :key="tag">
          {{ tag.name }}
        </li>
      </ul>
      <img :src="imageUrl" :alt="title" />
      <h4>{{ objectID }}</h4>
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
      return {
          title: `Olaf Yang | ${this.handle}`
      }
  },
  data() {
    return {
      imageUrl: null,
      title: null,
      objectID: null,
      tags: null,
      handle: null,
    };
  },
  created() {
    this.$root.sanityClient
      .fetch(
        `*[_type == "photo" && objectID == "${this.$route.params.id}"][0]
        {
            objectID,
            hdlPrefix,
            "imageUrl": photo.asset->url,
            "tags": *[_type == "tag" && name in ^.tags[]._ref]{name, tagName}
        }`
      )
      .then((res) => {
        this.imageUrl = res.imageUrl;
        this.title = res.title;
        this.objectID = res.objectID;
        this.handle = `${res.hdlPrefix}/${res.objectID}`;
        this.tags = res.tags.map((tag) => {
          return {
            name: tag.tagName,
            id: tag.name.replace("tag_", ""),
          };
        });
      });
  },
  name: "MediaView",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap");

.viewer-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.viewer {
  max-width: 80%;
  text-align: center;
}
.viewer img {
  max-width: 100%;
  border-radius: 50px;
}
.viewer h4 {
  font-family: "Roboto Mono", monospace;
}
.viewer h1 {
  margin-top: 0.2em;
}
.tags {
  display: flex;
  margin: 1em auto;
}
.tags li {
  font-family: "silkaregular", Tahoma, sans-serif;
  background-color: #505e77;
  color: white;
  padding: 0.5em 1em;
  border-radius: 30px;
  margin-right: 0.5em;
  font-size: 1.3em;
}
</style>
