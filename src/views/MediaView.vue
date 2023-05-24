<template>
  <div class="viewer">
    <ul v-if="!isMobile" class="tags">
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
    <ul v-if="isMobile" class="tags">
      <li v-for="tag in tags" :key="tag">
        <router-link :to="`/tags/${tag.id}`">
          {{ tag.name }}
        </router-link>
      </li>
    </ul>
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
  computed: {
    isMobile() {
      return window.innerWidth < 1360;
    },
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
            "tags": *[_type == "tag" && _id in ^.tags[]._ref]{name, tagID}
        }`
      )
      .then((res) => {
        if (res === null) {
          this.$router.replace("/error/404");
          return;
        }
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
            name: tag.name,
            id: tag.tagID,
          };
        });
      });
  },
  metaInfo() {
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap");

.viewer {
  text-align: center;
}
.viewer h4 {
  font-family: "Roboto Mono", monospace;
  margin-bottom: 0.1em;
  color: #08204a;
}
.viewer h1 {
  color: #08204a;
}

.tags {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
  padding: 0.5em 1em;
  border-radius: 30px;
  margin-right: 0.5em;
  font-size: 1.3em;
}

@media only screen and (max-width: 1360px) {
  .tags {
    padding: 0.5em 1.5em;
  }

  .viewer {
    margin: 0;
  }
  .viewer img {
    max-height: 50rem;
  }
}

@media only screen and (min-width: 1360px) {
  .viewer {
    max-width: 80%;
  }
  .viewer img {
    max-height: 50rem;
    border-radius: 50px;
  }
}
.tags {
  display: flex;
  margin-bottom: 1em;
  align-items: center;
}
</style>
