<template>
  <metainfo>
    <!-- <template v-slot:title="{ content }">{{ content }} - Yay!</template> -->
  </metainfo>
  <NavBar :navbarStyle="getNavbarStyle"></NavBar>
  <div v-if="getNavbarStyle === 'simple'" class="view-container">
    <router-view />
  </div>
  <div class="fullpage-view" v-else>
    <router-view />
  </div>
</template>

<script>
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import NavBar from "./components/navbar.vue";

export default {
  methods: {
    previousPage() {
      if (window.history.state.back != null) {
        this.$router.go(-1);
      } else {
        this.$router.push("/");
      }
    },
  },
  beforeCreate() {
    this.sanityClient = sanityClient({
      projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
      dataset: process.env.VUE_APP_SANITY_DATASET,
      apiVersion: process.env.VUE_APP_SANITY_API_VERSION,
      useCdn: Boolean(process.env.VUE_APP_SANITY_USE_CDN),
    });
    this.sanityImgUrlBuilder = imageUrlBuilder(this.sanityClient);
  },
  components: { NavBar },
  computed: {
    getNavbarStyle() {
      const route = this.$route.name;
      switch (route) {
        case "home":
          return "none";
        case "about":
          return "none";
        default:
          return "simple";
      }
    },
  },
};
</script>

<style>
@import url("@/reset.css");

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  display: flex;
  height: 100%;
  width: 100%;
}

h1 {
  font-size: 2.5em;
  font-family: "silkabold", sans-serif;
}
h2 {
  font-size: 1.5em;
  font-family: "silkasemibold", sans-serif;
}
h3 {
  font-size: 1em;
  font-family: "silkamedium", sans-serif;
}
li {
  font-family: "silkathin", sans-serif;
}
p {
  font-family: "silkaregular", sans-serif;
}

.view-container {
  margin-top: 1em;
  margin-left: 17%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.item-viewer {
  width: 90%;
}
.item-viewer h1 {
  color: #08204a;
}
.item-viewer p {
  margin: 1.5em 0;
}

.sub-nav {
  display: flex;
  align-items: center;
  color: #08204a;
}

img.back-icon {
  height: 2.5em;
  width: 2.5em;
  margin-right: 1em;
  cursor: pointer;
}

.fullpage-view {
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
}
</style>
