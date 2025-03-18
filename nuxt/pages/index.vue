<template>
  <div class="home">
    <div class="image-grid">
      <div class="image-grid-element" v-for="image in data" :key="image">
        <NuxtImg
          provider="sanity"
          :src="image"
          height="150"
          width="150"
          fit="cover"
        />
      </div>
    </div>
    <div class="ui-bg"></div>
    <div class="ui">
      <div class="ui-elements">
        <h1>Olaf Yang</h1>
        <h2>Photography</h2>
        <hr />
        <div class="home-nav">
          <NuxtLink to="/explore">Explore</NuxtLink>
          <NuxtLink to="/tags">Tags</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

definePageMeta({
  layout: "no-nav",
});

const { sanityClient } = useSanity();

const { data } = useAsyncData("home", () =>
  sanityClient
    ?.fetch(
      '*[_type == "photo"][0...50]{"url": photo.asset->url, "photo": photo.asset}'
    )
    .then(
      (res) =>
        res
          .filter((item: SanityAsset) => item.photo._ref)
          .map((item: SanityAsset) => item.photo._ref) as string[]
    )
);
</script>

<style scoped>
.home {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: #0f0f0f;
  position: relative;
}

@media only screen and (min-width: 1500px) {
  .image-grid {
    position: absolute;
    height: 100%;
    width: 120%;
    display: flex;
    flex-wrap: wrap;
    transform-origin: center;
    transform: rotate(25deg) translate(-6rem, -16rem);
  }
}

@media only screen and (min-width: 960px) and (max-width: 1500px) {
  .image-grid {
    position: absolute;
    height: 100%;
    width: 140%;
    display: flex;
    flex-wrap: wrap;
    transform-origin: center;
    transform: rotate(25deg) translate(-6rem, -16rem);
  }
}

@media only screen and (min-width: 960px) {
  .image-grid-element {
    height: 250px;
    width: 250px;
    margin: 0.4em;
  }
  .image-grid-element img {
    height: 250px;
    width: 250px;
    border-radius: 30px;
  }
}

@media only screen and (max-width: 960px) and (min-width: 500px) {
  .image-grid {
    position: absolute;
    height: 100%;
    width: 200%;
    display: flex;
    flex-wrap: wrap;
    transform-origin: center;
    transform: rotate(25deg) translate(-8rem, -5rem);
  }
  .image-grid-element {
    height: 210px;
    width: 210px;
    margin: 0.2em;
  }
  .image-grid-element img {
    height: 210px;
    width: 210px;
    border-radius: 15px;
  }
}

@media only screen and (max-width: 500px) {
  .image-grid {
    position: absolute;
    height: 100%;
    width: 250%;
    display: flex;
    flex-wrap: wrap;
    transform-origin: center;
    transform: rotate(25deg) translate(-9rem, 0rem);
  }
  .image-grid-element {
    height: 150px;
    width: 150px;
    margin: 0.2em;
  }
  .image-grid-element img {
    height: 150px;
    width: 150px;
    border-radius: 15px;
  }
}

.ui-bg {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.75;
}

.ui {
  height: 100%;
  width: 100%;
  text-align: center;
  position: fixed;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.ui h1 {
  font-size: 4em;
}
.ui h2 {
  font-size: 1.6em;
  font-weight: 300;
}
.ui hr {
  border-radius: 5px;
  border: 2px white solid;
  margin: 0.5em 0;
  padding: 0, 1em;
  margin: 1.2em 0;
}
.home-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 9em;
}
.home-nav a {
  color: white;
  font-family: "Silka", sans-serif;
  font-weight: 300;
  font-size: 1.25em;
}
</style>
