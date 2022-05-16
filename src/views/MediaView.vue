<template>
  <div class="viewer">
    <ul class="tags">
      <img
        class="back-icon"
        src="/static/arrow_back.svg"
        @click="this.$root.previousPage"
        alt="Back"
      />
      <li v-for="tag in tags" :key="tag">
        <router-link :to="`/tags/${tag.id}`">
          {{ tag.name }}
        </router-link>
      </li>
    </ul>
    <img :src="imageUrl" :alt="title" />
    <h4>{{ objectID }}</h4>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      smallUrl: null,
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
            title,
            hdlPrefix,
            "imageUrl": photo.asset->url,
            "tags": *[_type == "tag" && name in ^.tags[]._ref]{name, tagName}
        }`
      )
      .then((res) => {
        this.imageUrl = this.$root.sanityImgUrlBuilder
          .image(res.imageUrl)
          .width(2000)
          .url();
        this.smallUrl = this.$root.sanityImgUrlBuilder
          .image(res.imageUrl)
          .width(500)
          .url();
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
  metaInfo() {
    const title = `Olaf Yang | ${this.title ? this.title : this.objectID}`;
    return {
      title: title,
      "twitter:card": "summary",
      "twitter:title": title,
      "twitter:description": `View "${
        this.title ? this.title : this.objectID
      }" on olafyang.com`,
      "twitter:image": `${this.smallUrl}`,
      "og:title": title,
      "og:image": `${this.smallUrl}`,
      "og:url": `https://hdl.handle.net/${this.handle}`,
    };
  },
  name: "MediaView",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap");

.viewer {
  max-width: 80%;
  text-align: center;
}
.viewer img {
  max-width: 100%;
  max-height: 80%;
  border-radius: 50px;
}
.viewer h4 {
  font-family: "Roboto Mono", monospace;
  color: #08204a;
}
.tags {
  display: flex;
  margin-bottom: 1em;
  align-items: center;
}
.tags a {
  color: white;
  text-decoration: none;
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
