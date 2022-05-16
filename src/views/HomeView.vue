<template>
  <div class="home">
    <div class="image-grid">
      <div class="image-grid-element" v-for="image in images" :key="image">
        <img :src="image" />
      </div>
    </div>
    <div class="ui-bg"></div>
    <div class="ui">
      <div class="ui-elements">
        <h1>Olaf Yang</h1>
        <h2>Photography</h2>
        <hr />
        <div class="home-nav">
          <router-link to="/tags">Explore</router-link>
          <router-link to="/tags">Collections</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
export default {
  name: "HomeView",
  data() {
    return {
      images: null,
    };
  },
  created() {
    this.$root.sanityClient
      .fetch('*[_type == "photo"][0...50]{"url": photo.asset->url}')
      .then((res) => {
        this.images = shuffle(
          res.map((item) =>
            this.$root.sanityImgUrlBuilder
              .image(item.url)
              .height(250)
              .width(250)
              .url()
          )
        );
      });
  },
};
</script>

<style scoped>
.home {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: #0f0f0f;
  position: relative;
}
.image-grid {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  transform-origin: center;
  transform: rotate(25deg) translate(0em, -20em) scale(1.08, 1.08);
}
.image-grid-element {
  margin-bottom: 1em;
}
.image-grid-element img {
  border-radius: 30px;
}

.ui-bg {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.6;
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
  font-family: "silkalight", sans-serif;
  font-weight: 300;
  font-size: 1.25em;
}
</style>
