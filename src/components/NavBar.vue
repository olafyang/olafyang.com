<template>
  <div v-if="navbarStyle === 'simple'" class="spacer"></div>

  <div class="nav">
    <nav v-if="navbarStyle === 'simple'" class="simple">
      <div class="branding">
        <h1>Olaf Yang</h1>
        <h3>Photography</h3>
        <hr />
      </div>
      <ul>
        <li>New</li>
        <li>Collections</li>
        <li>Tags</li>
        <li>All</li>
      </ul>
    </nav>
    <div class="view-spacer"></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    navbarStyle: String,
  },
};
</script>

<style>
.nav {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
}
.spacer {
  justify-content: center;
  width: 17%;
  margin: 0 1em;
}
.view-spacer {
  width: 100%;
}
nav.simple {
  width: 17%;
  text-align: center;
  background-color: #08204a;
  color: white;
  padding: 0 1em;
  height: 100%;
}
nav.simple .branding {
  padding-top: 1em;
}
nav.simple .branding h3 {
  margin: 0.3em;
}
nav.simple hr {
  border-radius: 5px;
  border: 2px white solid;
  margin: 0.5em 0.1em;
  padding: 0, 1em;
}
nav.simple ul {
  margin-top: 2em;
}
nav.simple li {
  font-size: 1.5em;
  margin: 0.5em 0;
}
</style>
