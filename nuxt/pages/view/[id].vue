<template>
  <div class="viewer">
    <ul class="tags">
      <BackButton />
      <li v-for="tag in tags" :key="tag.id">
        <NuxtLink :to="`/tags/${tag.id}`">
          {{ tag.name }}
        </NuxtLink>
      </li>
    </ul>
    <NuxtImg
      class="main-image"
      provider="sanity"
      :height="750"
      :src="imgId"
      :alt="title"
    />
    <h4>{{ objectID }}</h4>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      imgId: undefined as string | undefined,
      smallUrl: undefined as string | undefined,
      title: undefined as string | undefined,
      objectID: undefined as string | undefined,
      tags: undefined as { name: string; id: string }[] | undefined,
      handle: undefined as string | undefined,
    };
  },
  created() {
    const { sanityClient, builder: urlBuilder } = useSanity();
    sanityClient
      ?.fetch(
        `*[_type == "photo" && objectID == "${this.$route.params.id}"][0]
        {
            objectID,
            title,
            hdlPrefix,
            "imageUrl": photo.asset->url,
            "photo": photo.asset,
            "tags": *[_type == "tag" && _id in ^.tags[]._ref]{name, tagID}
        }`
      )
      .then((res) => {
        if (res === null) {
          this.$router.replace("/404");
          return;
        }
        this.imgId = res.photo._ref;
        this.smallUrl = urlBuilder?.image(res.imageUrl).width(500).url();
        this.title = res.title;
        this.objectID = res.objectID;
        this.handle = `${res.hdlPrefix}/${res.objectID}`;
        this.tags = res.tags
          .filter((tag: any) => tag.name && tag.tagID)
          .map((tag: any) => {
            return {
              name: tag.name,
              id: tag.tagID,
            };
          });
      });
  },
  head() {
    const title = `Olaf Yang | ${this.title ? this.title : this.objectID}`;
    return {
      title: title,
      "twitter:card": "summary",
      "twitter:domain": "https://olafyang.com",
      "twitter:url": `https://olafyang.com${this.$route.path}`,
      "twitter:title": title,
      "twitter:description": `View "${
        this.title ? this.title : this.objectID
      }" on olafyang.com`,
      "twitter:image": `${this.smallUrl}`,

      "og:url": `https://olafyang.com${this.$route.path}`,
      "og:type": "website",
      "og:title": title,
      "og:description": `View "${
        this.title ? this.title : this.objectID
      }" on olafyang.com`,
      "og:image": `${this.smallUrl}`,
    };
  },
  name: "MediaView",
};
</script>

<style scoped>
.viewer {
  text-align: center;
}
.viewer h4 {
  font-family: "Roboto Mono", monospace;
  margin: 0.5em 0;
  color: #08204a;
}
.viewer h1 {
  color: #08204a;
}

.tags {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 0.5rem;
  display: flex;
  margin-bottom: 1em;
  align-items: center;
}

.tags::-webkit-scrollbar {
  display: none;
}

.tags a {
  color: white;
  text-decoration: none;
  overflow-x: auto;
}
.tags li {
  font-family: "silkaregular", Tahoma, sans-serif;
  background-color: #505e77;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 1.3rem;
}

.viewer {
  max-width: 95%;
  margin: 2rem auto;
}
.viewer img.main-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
}
</style>
